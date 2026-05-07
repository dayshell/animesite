# 🚀 Инструкция по деплою на Vercel

## Подготовка проекта

Проект уже готов к деплою! Все файлы находятся в корне:
- ✅ Frontend (React + Vite) в папке `src/`
- ✅ API endpoints в папке `api/`
- ✅ Конфигурация Vercel в `vercel.json`

## Способ 1: Через GitHub (Рекомендуется)

### Шаг 1: Загрузите код на GitHub

```bash
# Инициализируйте git репозиторий (если еще не сделано)
git init

# Добавьте все файлы
git add .

# Создайте коммит
git commit -m "Initial commit - ready for Vercel"

# Добавьте удаленный репозиторий (замените на ваш URL)
git remote add origin https://github.com/ваш-username/ваш-репозиторий.git

# Отправьте код
git push -u origin main
```

### Шаг 2: Подключите к Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите **"Add New Project"**
3. Выберите **"Import Git Repository"**
4. Выберите ваш репозиторий из списка
5. Vercel автоматически определит настройки:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Нажмите **"Deploy"**

## Способ 2: Через Vercel CLI

### Шаг 1: Установите Vercel CLI

```bash
npm install -g vercel
```

### Шаг 2: Войдите в аккаунт

```bash
vercel login
```

### Шаг 3: Деплой

```bash
# Для первого деплоя (production)
vercel --prod

# Или для тестового деплоя
vercel
```

CLI задаст несколько вопросов:
- **Set up and deploy?** → Yes
- **Which scope?** → Выберите ваш аккаунт
- **Link to existing project?** → No
- **Project name?** → anime-home (или любое другое)
- **Directory?** → ./ (текущая директория)

## После деплоя

После успешного деплоя вы получите:
- 🌐 **Production URL**: `https://ваш-проект.vercel.app`
- 📊 **Dashboard**: Управление проектом на vercel.com
- 🔄 **Auto-deploy**: Каждый push в main будет автоматически деплоиться

## Проверка работы

После деплоя проверьте:
- ✅ Главная страница: `https://ваш-проект.vercel.app`
- ✅ API endpoint: `https://ваш-проект.vercel.app/api/healthz`

## Настройка домена (опционально)

1. В Vercel Dashboard откройте ваш проект
2. Перейдите в **Settings** → **Domains**
3. Добавьте ваш домен
4. Следуйте инструкциям для настройки DNS

## Переменные окружения (если нужны)

Если в будущем понадобятся переменные окружения:

1. В Vercel Dashboard откройте проект
2. **Settings** → **Environment Variables**
3. Добавьте переменные для Production/Preview/Development
4. Redeploy проект

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview
```

## Структура проекта

```
.
├── src/              # React приложение
├── api/              # Serverless функции
├── public/           # Статические файлы
├── dist/             # Сборка (генерируется)
├── vercel.json       # Конфигурация Vercel
└── package.json      # Зависимости
```

## Troubleshooting

### Ошибка при сборке
- Проверьте что все зависимости установлены: `npm install`
- Проверьте TypeScript ошибки: `npm run typecheck`

### API не работает
- Убедитесь что файлы в папке `api/` имеют расширение `.ts` или `.js`
- Проверьте что функции экспортируют default handler

### 404 на роутах
- Vercel автоматически настроит SPA routing для Vite
- Если проблемы, проверьте `vercel.json`

## Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
