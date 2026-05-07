# API Documentation

## База данных подключена! ✅

Проект теперь использует PostgreSQL (Neon) для хранения всех данных.

## Переменные окружения для Vercel

Добавьте эти переменные в настройках Vercel:

```
DATABASE_URL=postgresql://neondb_owner:npg_3Jhc7VoRtrQK@ep-aged-fog-apqlzdui-pooler.c-7.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require
KODIK_API_TOKEN=3ddf7d450fb2574572333296960c6368
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## API Endpoints

### Аутентификация

#### POST /api/auth/register
Регистрация нового пользователя

**Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "username": "username",
    "avatar": null,
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/login
Вход пользователя

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { ... },
  "token": "jwt_token_here"
}
```

### Аниме

#### GET /api/anime/list
Получить список аниме

**Query Parameters:**
- `page` - номер страницы (default: 1)
- `limit` - количество на странице (default: 20)
- `search` - поиск по названию
- `genre` - фильтр по жанру
- `status` - фильтр по статусу

**Response:**
```json
{
  "anime": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

#### POST /api/anime/create
Создать аниме (только для ADMIN)

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Название аниме",
  "titleEn": "Anime Title",
  "description": "Описание",
  "poster": "https://...",
  "year": 2024,
  "type": "anime-serial",
  "status": "ongoing",
  "episodes": 12,
  "rating": 8.5,
  "genres": ["Action", "Adventure"],
  "studios": ["Studio Name"]
}
```

### Комментарии

#### GET /api/comments/list
Получить комментарии к аниме

**Query Parameters:**
- `animeId` - ID аниме (обязательно)

**Response:**
```json
[
  {
    "id": "...",
    "text": "Отличное аниме!",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "...",
      "username": "username",
      "avatar": null
    }
  }
]
```

#### POST /api/comments/create
Создать комментарий (требуется авторизация)

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "animeId": "anime_id_here",
  "text": "Отличное аниме!"
}
```

### Рейтинги

#### POST /api/ratings/create
Поставить оценку аниме (требуется авторизация)

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "animeId": "anime_id_here",
  "score": 9
}
```

### Избранное

#### POST /api/favorites/toggle
Добавить/удалить из избранного (требуется авторизация)

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "animeId": "anime_id_here"
}
```

**Response:**
```json
{
  "isFavorite": true
}
```

## Модели данных

### User
- id, email, username, password (хешированный)
- avatar, role (USER/ADMIN)
- связи: comments, ratings, favorites, watchHistory

### Anime
- id, kodikId, title, titleEn, description
- poster, year, type, status, episodes, rating
- genres[], studios[]
- связи: comments, ratings, favorites, watchHistory

### Comment
- id, text, userId, animeId
- timestamps

### Rating
- id, score (1-10), userId, animeId
- уникальная пара userId+animeId

### Favorite
- id, userId, animeId
- уникальная пара userId+animeId

### WatchHistory
- id, userId, animeId, episode, timestamp
- уникальная тройка userId+animeId+episode

## Безопасность

- Пароли хешируются с помощью bcrypt
- JWT токены для аутентификации (срок действия 7 дней)
- CORS настроен для всех origins (измените в продакшене)
- Защита от SQL-инъекций через Prisma ORM

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Генерация Prisma Client
npm run prisma:generate

# Применение схемы к БД
npm run prisma:push

# Запуск dev сервера
npm run dev

# Открыть Prisma Studio (GUI для БД)
npm run prisma:studio
```
