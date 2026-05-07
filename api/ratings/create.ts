import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma';
import { verifyToken, extractToken } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = extractToken(req.headers.authorization as string);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { animeId, score } = req.body;

    if (!animeId || score === undefined) {
      return res.status(400).json({ error: 'Anime ID and score are required' });
    }

    if (score < 1 || score > 10) {
      return res.status(400).json({ error: 'Score must be between 1 and 10' });
    }

    const rating = await prisma.rating.upsert({
      where: {
        userId_animeId: {
          userId: payload.userId,
          animeId,
        }
      },
      update: {
        score: Number(score),
      },
      create: {
        score: Number(score),
        userId: payload.userId,
        animeId,
      }
    });

    // Обновляем средний рейтинг аниме
    const avgRating = await prisma.rating.aggregate({
      where: { animeId },
      _avg: { score: true }
    });

    await prisma.anime.update({
      where: { id: animeId },
      data: { rating: avgRating._avg.score || 0 }
    });

    return res.status(200).json(rating);
  } catch (error) {
    console.error('Create rating error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
