// Простой dev-сервер для API endpoints
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

const KODIK_API_TOKEN = '3ddf7d450fb2574572333296960c6368';
const KODIK_API_URL = 'https://kodikapi.com/list';

app.use(cors());
app.use(express.json());

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

    const response = await fetch(`${KODIK_API_URL}?${params}`);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Kodik API Error:', error);
    res.status(500).json({ error: 'Failed to fetch from Kodik API' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API dev server running on http://localhost:${PORT}`);
});
