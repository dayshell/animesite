export default function HomeTest() {
  return (
    <div className="min-h-screen bg-[#0d0d12] text-white">
      <header className="p-4 bg-purple-900/20">
        <h1 className="text-2xl font-bold">Shiruho Anime</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Anime Site</h1>
        <p className="text-xl">База данных подключена: PostgreSQL (Neon)</p>
        <p className="text-xl">Backend API готов к работе</p>
        <div className="mt-8 p-4 bg-purple-900/20 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Доступные API endpoints:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>/api/auth/register - Регистрация</li>
            <li>/api/auth/login - Вход</li>
            <li>/api/anime/list - Список аниме</li>
            <li>/api/anime/create - Создать аниме (admin)</li>
            <li>/api/comments/list - Комментарии</li>
            <li>/api/comments/create - Добавить комментарий</li>
            <li>/api/ratings/create - Поставить оценку</li>
            <li>/api/favorites/toggle - Избранное</li>
          </ul>
        </div>
      </main>
      <footer className="p-4 bg-purple-900/20 mt-8">
        <p className="text-center">© 2024 Shiruho Anime</p>
      </footer>
    </div>
  );
}
