import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3001;
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const KODIK_API_TOKEN = '3ddf7d450fb2574572333296960c6368';

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth - Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email ? 'Email already exists' : 'Username already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
      select: { id: true, email: true, username: true, avatar: true, role: true, createdAt: true }
    });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Auth - Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username, avatar: user.avatar, role: user.role, createdAt: user.createdAt },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Users - Top
app.get('/api/users/top', async (req, res) => {
  try {
    const { limit = '50' } = req.query;

    const users = await prisma.user.findMany({
      take: Number(limit),
      include: {
        _count: { select: { comments: true, ratings: true, favorites: true, watchHistory: true } },
        ratings: { select: { score: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const topUsers = users.map((user, index) => {
      const totalWatched = user._count.watchHistory;
      const totalRatings = user._count.ratings;
      const totalComments = user._count.comments;
      const totalFavorites = user._count.favorites;
      const activityScore = totalWatched + totalRatings * 2 + totalComments * 3 + totalFavorites;
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
        level: Math.floor(activityScore / 10) + 1,
        activityPercent: parseFloat(activityPercent),
        stats: { watched: totalWatched, rated: totalRatings, comments: totalComments, favorites: totalFavorites }
      };
    });

    topUsers.sort((a, b) => b.activityPercent - a.activityPercent);
    topUsers.forEach((user, index) => { user.rank = index + 1; });

    res.json(topUsers);
  } catch (error) {
    console.error('Top users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Users - Activity
app.get('/api/users/activity', async (req, res) => {
  try {
    const { limit = '6' } = req.query;

    const users = await prisma.user.findMany({
      take: Number(limit),
      orderBy: { updatedAt: 'desc' },
      include: { _count: { select: { comments: true, ratings: true } } }
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
        stats: { comments: user._count.comments, ratings: user._count.ratings }
      };
    });

    res.json(activityUsers);
  } catch (error) {
    console.error('User activity error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Anime - List
app.get('/api/anime/list', async (req, res) => {
  try {
    const { page = '1', limit = '20', search, genre, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleEn: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (genre) where.genres = { has: genre };
    if (status) where.status = status;

    const [anime, total] = await Promise.all([
      prisma.anime.findMany({
        where, skip, take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { comments: true, ratings: true, favorites: true } } }
      }),
      prisma.anime.count({ where })
    ]);

    res.json({
      anime,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) }
    });
  } catch (error) {
    console.error('Anime list error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Kodik Proxy
app.get('/api/kodik-proxy', async (req, res) => {
  try {
    const { limit = '50' } = req.query;
    const params = new URLSearchParams({
      token: KODIK_API_TOKEN,
      types: 'anime-serial',
      limit: limit,
      with_material_data: 'true',
      with_episodes: 'true',
      sort: 'updated_at',
      order: 'desc'
    });

    const response = await fetch(`https://kodikapi.com/list?${params}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Kodik API Error:', error);
    res.status(500).json({ error: 'Failed to fetch from Kodik API' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API dev server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
