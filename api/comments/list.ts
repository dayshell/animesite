import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { animeId } = req.query;

    if (!animeId) {
      return res.status(400).json({ error: 'Anime ID is required' });
    }

    const comments = await prisma.comment.findMany({
      where: { animeId: animeId as string },
      orderBy: { createdAt: 'desc' },
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

    return res.status(200).json(comments);
  } catch (error) {
    console.error('List comments error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
