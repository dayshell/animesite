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
    const { page = '1', limit = '20', search, genre, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { titleEn: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (genre) {
      where.genres = { has: genre as string };
    }

    if (status) {
      where.status = status as string;
    }

    const [anime, total] = await Promise.all([
      prisma.anime.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              comments: true,
              ratings: true,
              favorites: true,
            }
          }
        }
      }),
      prisma.anime.count({ where })
    ]);

    return res.status(200).json({
      anime,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      }
    });
  } catch (error) {
    console.error('Anime list error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
