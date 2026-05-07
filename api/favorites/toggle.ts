import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { verifyToken, extractToken } from '../_lib/auth';

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

    const { animeId } = req.body;

    if (!animeId) {
      return res.status(400).json({ error: 'Anime ID is required' });
    }

    // Проверяем существование
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_animeId: {
          userId: payload.userId,
          animeId,
        }
      }
    });

    if (existing) {
      // Удаляем из избранного
      await prisma.favorite.delete({
        where: { id: existing.id }
      });
      return res.status(200).json({ isFavorite: false });
    } else {
      // Добавляем в избранное
      await prisma.favorite.create({
        data: {
          userId: payload.userId,
          animeId,
        }
      });
      return res.status(200).json({ isFavorite: true });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
