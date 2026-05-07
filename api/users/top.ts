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
    const { limit = '50' } = req.query;

    // Получаем пользователей с подсчетом их активности
    const users = await prisma.user.findMany({
      take: Number(limit),
      include: {
        _count: {
          select: {
            comments: true,
            ratings: true,
            favorites: true,
            watchHistory: true,
          }
        },
        ratings: {
          select: {
            score: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Вычисляем статистику для каждого пользователя
    const topUsers = users.map((user, index) => {
      const totalWatched = user._count.watchHistory;
      const totalRatings = user._count.ratings;
      const totalComments = user._count.comments;
      const totalFavorites = user._count.favorites;
      
      // Вычисляем активность (чем больше действий, тем выше)
      const activityScore = totalWatched + totalRatings * 2 + totalComments * 3 + totalFavorites;
      
      // Вычисляем процент активности относительно самого активного
      const maxActivity = users.reduce((max, u) => {
        const score = u._count.watchHistory + u._count.ratings * 2 + u._count.comments * 3 + u._count.favorites;
        return Math.max(max, score);
      }, 1);
      
      const activityPercent = ((activityScore / maxActivity) * 100).toFixed(1);

      return {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        rank: index + 1,
        level: Math.floor(activityScore / 10) + 1, // Уровень на основе активности
        activityPercent: parseFloat(activityPercent),
        stats: {
          watched: totalWatched,
          rated: totalRatings,
          comments: totalComments,
          favorites: totalFavorites,
        }
      };
    });

    // Сортируем по активности
    topUsers.sort((a, b) => b.activityPercent - a.activityPercent);
    
    // Обновляем ранги после сортировки
    topUsers.forEach((user, index) => {
      user.rank = index + 1;
    });

    return res.status(200).json(topUsers);
  } catch (error) {
    console.error('Top users error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
