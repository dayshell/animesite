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
    if (!payload || payload.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const {
      kodikId,
      title,
      titleEn,
      description,
      poster,
      year,
      type,
      status,
      episodes,
      rating,
      genres,
      studios,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const anime = await prisma.anime.create({
      data: {
        kodikId,
        title,
        titleEn,
        description,
        poster,
        year: year ? Number(year) : null,
        type,
        status,
        episodes: episodes ? Number(episodes) : null,
        rating: rating ? Number(rating) : null,
        genres: genres || [],
        studios: studios || [],
      }
    });

    return res.status(201).json(anime);
  } catch (error) {
    console.error('Create anime error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
