import { Crown } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import avatar1 from "@/assets/avatars/avatar-1.png";
import avatar2 from "@/assets/avatars/avatar-2.png";
import avatar3 from "@/assets/avatars/avatar-3.png";
import avatar4 from "@/assets/avatars/avatar-4.png";
import avatar5 from "@/assets/avatars/avatar-5.png";
import avatar6 from "@/assets/avatars/avatar-6.png";

const topUsers = [
  { 
    rank: 1, 
    name: "Gydra", 
    percentage: "100.0%", 
    level: "22 Ур.", 
    avatar: avatar1,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "244 105 гл." },
      { icon: "👁", label: "Посмотрел(а)", value: "4 914 серий" }
    ]
  },
  { 
    rank: 2, 
    name: "Лу Чаоэ", 
    percentage: "94.9%", 
    level: "19 Ур.", 
    avatar: avatar2,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "216 685 гл." },
      { icon: "🚫", label: "Аниме не смотрел(а)", value: "" }
    ]
  },
  { 
    rank: 3, 
    name: "exmate", 
    percentage: "91.9%", 
    level: "19 Ур.", 
    avatar: avatar3,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "190 499 гл." },
      { icon: "🚫", label: "Аниме не смотрел(а)", value: "" }
    ]
  },
  { 
    rank: 4, 
    name: "N", 
    percentage: "89.8%", 
    level: "22 Ур.", 
    avatar: avatar4,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "168 387 гл." },
      { icon: "👁", label: "Посмотрел(а)", value: "3 530 серий" }
    ]
  },
  { 
    rank: 5, 
    name: "remixone109", 
    percentage: "88.1%", 
    level: "20 Ур.", 
    avatar: avatar5,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "165 702 гл." },
      { icon: "🚫", label: "Аниме не смотрел(а)", value: "" }
    ]
  },
  { 
    rank: 6, 
    name: "AnGel", 
    percentage: "86.8%", 
    level: "20 Ур.", 
    avatar: avatar6,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "161 861 гл." },
      { icon: "👁", label: "Посмотрел(а)", value: "94 серий" }
    ]
  },
  { 
    rank: 7, 
    name: "Антон Тимирдаев", 
    percentage: "85.7%", 
    level: "20 Ур.", 
    avatar: avatar1,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "157 458 гл." },
      { icon: "👁", label: "Посмотрел(а)", value: "11 серий" }
    ]
  },
  { 
    rank: 8, 
    name: "Читатель 🎭", 
    percentage: "84.7%", 
    level: "18 Ур.", 
    avatar: avatar2,
    stats: [
      { icon: "📖", label: "Прочитал(а)", value: "152 341 гл." },
      { icon: "🚫", label: "Аниме не смотрел(а)", value: "" }
    ]
  },
];

export default function UsersRating() {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Топ пользователей
            </h1>
          </div>
          <p className="text-gray-600 dark:text-white/60">
            Лучшие пользователи по активности
          </p>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {topUsers.map((user) => (
            <div
              key={user.rank}
              className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#16161e] transition-all cursor-pointer group"
            >
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-white/10 group-hover:border-[#3b82f6] transition-colors">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {user.rank}
                </div>
                {user.rank === 1 && (
                  <Crown className="absolute -top-3 -right-3 w-6 h-6 text-yellow-500 fill-yellow-500 drop-shadow-lg" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                    {user.name}
                  </h3>
                  <span className="text-sm text-[#22c55e] font-bold whitespace-nowrap">
                    Лучше {user.percentage} пользователей
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold px-3 py-1 rounded-full">
                    {user.level}
                  </span>
                  {user.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-sm">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-gray-600 dark:text-white/60 font-medium">
                        {stat.label}
                      </span>
                      {stat.value && (
                        <span className="text-gray-900 dark:text-white font-bold">
                          {stat.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
