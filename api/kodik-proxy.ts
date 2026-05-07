import type { VercelRequest, VercelResponse } from '@vercel/node';

const KODIK_API_TOKEN = '3ddf7d450fb2574572333296960c6368';
const KODIK_API_URL = 'https://kodik-api.com/list';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { limit = '50' } = req.query;

    const params = new URLSearchParams({
      token: KODIK_API_TOKEN,
      types: 'anime-serial',
      limit: limit as string,
      with_material_data: 'true',
      with_episodes: 'true',
      sort: 'updated_at',
      order: 'desc'
    });

    const response = await fetch(`${KODIK_API_URL}?${params}`);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Kodik API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from Kodik API' });
  }
}
