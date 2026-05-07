# Anime Home

Anime-themed home page with API backend, ready for Vercel deployment.

## 🚀 Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📦 Deploy to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration
6. Click "Deploy"

## 🏗️ Project Structure

```
.
├── src/              # Frontend source code
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── assets/       # Static assets
├── api/              # Serverless API functions
│   └── healthz.ts    # Health check endpoint
├── public/           # Public static files
├── dist/             # Build output (generated)
└── vercel.json       # Vercel configuration

```

## 🔌 API Endpoints

- `GET /api/healthz` - Health check endpoint

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod
- **Backend**: Vercel Serverless Functions

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking

## 🌐 Environment Variables

No environment variables required for basic setup.

## 📄 License

MIT
