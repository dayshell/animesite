import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma.js';

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
    // Validate DATABASE_URL
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      return res.status(500).json({ error: 'Database configuration error' });
    }

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
  } catch (error: any) {
    console.error('User activity error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to load user activity',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
