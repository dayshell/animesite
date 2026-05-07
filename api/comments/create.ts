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
    // Проверяем авторизацию
    const token = extractToken(req.headers.authorization as string);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { animeId, text } = req.body;

    if (!animeId || !text) {
      return res.status(400).json({ error: 'Anime ID and text are required' });
    }

    if (text.length < 1 || text.length > 1000) {
      return res.status(400).json({ error: 'Comment must be between 1 and 1000 characters' });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: payload.userId,
        animeId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          }
        }
      }
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
