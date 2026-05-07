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
    const { limit = '6' } = req.query;

    // Получаем последних активных пользователей
    const users = await prisma.user.findMany({
      take: Number(limit),
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        _count: {
          select: {
            comments: true,
            ratings: true,
          }
        }
      }
    });

    const activityUsers = users.map(user => {
      const totalActivity = user._count.comments + user._count.ratings;
      const level = Math.floor(totalActivity / 5) + 1;
      
      return {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        level: `${level} Ур.`,
        activityPercent: `${Math.min(100, totalActivity * 2)}%`,
        stats: {
          comments: user._count.comments,
          ratings: user._count.ratings,
        }
      };
    });

    return res.status(200).json(activityUsers);
  } catch (error) {
    console.error('User activity error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
