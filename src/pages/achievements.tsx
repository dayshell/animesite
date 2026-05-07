import { useState } from "react";
import { Trophy, Search, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const achievements = [
  { 
    id: 1, 
    title: "Тайное предисловие", 
    description: "Прочитать свою первую главу",
    rarity: "Есть у 78.34%",
    status: "Не выполнено",
    icon: "📖"
  },
  { 
    id: 2, 
    title: "Новоиспечённый герой", 
    description: "Выполнить своё первое задание",
    rarity: "Есть у 62.62%",
    status: "Не выполнено",
    icon: "⚔️"
  },
  { 
    id: 3, 
    title: "Аккаунт F ранга", 
    description: "Быть зарегистрированным на сайте 7 дней",
    rarity: "Есть у 51.01%",
    status: "Не выполнено",
    icon: "📅"
  },
  { 
    id: 4, 
    title: "Закладочный первооткрыватель", 
    description: "Добавить свою первую закладку",
    rarity: "Есть у 41.97%",
    status: "Необычное",
    isRare: true,
    icon: "🔖"
  },
  { 
    id: 5, 
    title: "Ночная совушка", 
    description: "Будьте активна с 0 до 5 часов утра",
    rarity: "Есть у 41.96%",
    status: "Необычное",
    isRare: true,
    icon: "🦉"
  },
  { 
    id: 6, 
    title: "Аккаунт D ранга", 
    description: "Быть зарегистрированным на сайте 30 дней",
    rarity: "Есть у 38.12%",
    status: "Не выполнено",
    icon: "📅"
  },
  { 
    id: 7, 
    title: "Первый комментарий", 
    description: "Оставить свой первый комментарий",
    rarity: "Есть у 35.84%",
    status: "Не выполнено",
    icon: "💬"
  },
  { 
    id: 8, 
    title: "Марафонец", 
    description: "Прочитать 100 глав за один день",
    rarity: "Есть у 28.45%",
    status: "Редкое",
    isRare: true,
    icon: "🏃"
  },
  { 
    id: 9, 
    title: "Коллекционер", 
    description: "Добавить 50 тайтлов в закладки",
    rarity: "Есть у 22.67%",
    status: "Редкое",
    isRare: true,
    icon: "📚"
  },
  { 
    id: 10, 
    title: "Аккаунт C ранга", 
    description: "Быть зарегистрированным на сайте 90 дней",
    rarity: "Есть у 19.34%",
    status: "Не выполнено",
    icon: "📅"
  },
];

export default function Achievements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'rarity' | 'name'>('rarity');

  const filteredAchievements = achievements.filter(achievement =>
    achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Рейтинг достижений
            </h1>
          </div>
          <p className="text-gray-600 dark:text-white/60">
            Сравнивай достижения по редкости
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-2xl p-6 mb-6 shadow-xl">
          <h2 className="text-white font-bold text-2xl mb-2">
            0 из 303 достижений
          </h2>
          <p className="text-white/90 text-base">Ещё 303 впереди!</p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/30" />
            <input
              type="text"
              placeholder="Название или описание"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('rarity')}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                sortBy === 'rarity'
                  ? 'bg-[#3b82f6] text-white'
                  : 'bg-gray-100 dark:bg-[#121218] text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-[#16161e] border border-gray-200 dark:border-white/10'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1" />
              По редкости
            </button>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#16161e] transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 bg-gray-200 dark:bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl group-hover:scale-110 transition-transform">
                {achievement.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                    {achievement.title}
                  </h3>
                  <span className="text-xs bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-white/50 px-2 py-1 rounded font-bold whitespace-nowrap">
                    {achievement.id}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-white/60 mb-3 leading-relaxed">
                  {achievement.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    achievement.isRare
                      ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-white/50'
                  }`}>
                    {achievement.rarity}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-white/40 font-medium">
                    {achievement.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 dark:text-white/10 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-white/50">
              Достижения не найдены
            </p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
