import { Link } from "wouter";
import { Crown, Coins } from "lucide-react";
import { useState, useEffect } from "react";
import poster1 from "@/assets/images/poster-1.png";
import poster2 from "@/assets/images/poster-2.png";
import poster3 from "@/assets/images/poster-3.png";
import poster4 from "@/assets/images/poster-4.png";
import poster5 from "@/assets/images/poster-5.png";
import poster6 from "@/assets/images/poster-6.png";
import poster7 from "@/assets/images/poster-7.png";
import poster8 from "@/assets/images/poster-8.png";
import bannerBg from "@/assets/images/banner-bg.png";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import avatar1 from "@/assets/avatars/avatar-1.png";
import avatar2 from "@/assets/avatars/avatar-2.png";
import avatar3 from "@/assets/avatars/avatar-3.png";
import avatar4 from "@/assets/avatars/avatar-4.png";
import avatar5 from "@/assets/avatars/avatar-5.png";
import avatar6 from "@/assets/avatars/avatar-6.png";

const defaultAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const animeList = [
  { id: 1, title: "Агрессивная Рэцуко", rating: "+8.75", image: poster1 },
  { id: 2, title: "Мастера на все руки выгнали из отряда…", rating: "+7.92", image: poster2 },
  { id: 3, title: "Убийца Акамэ! Театр", rating: "+8.15", image: poster3 },
  { id: 4, title: "Владыка духовного меча 4", rating: "+8.30", image: poster4 },
  { id: 5, title: "Владыка множества миров 3", rating: "+7.88", image: poster5 },
  { id: 6, title: "Ван-Пис", rating: "+9.10", image: poster6 },
  { id: 7, title: "Вечера с кошкой 2", rating: "+8.45", image: poster7 },
  { id: 8, title: "Монолог фармацевта 2", rating: "+8.95", image: poster8 },
];

const animeByPeriod = {
  day: [
    { id: 1, title: "Агрессивная Рэцуко", rating: "+8.75", image: poster1 },
    { id: 2, title: "Мастера на все руки выгнали из отряда…", rating: "+7.92", image: poster2 },
    { id: 3, title: "Убийца Акамэ! Театр", rating: "+8.15", image: poster3 },
    { id: 4, title: "Владыка духовного меча 4", rating: "+8.30", image: poster4 },
    { id: 5, title: "Владыка множества миров 3", rating: "+7.88", image: poster5 },
    { id: 6, title: "Ван-Пис", rating: "+9.10", image: poster6 },
    { id: 7, title: "Вечера с кошкой 2", rating: "+8.45", image: poster7 },
    { id: 8, title: "Монолог фармацевта 2", rating: "+8.95", image: poster8 },
  ],
  week: [
    { id: 6, title: "Ван-Пис", rating: "+9.10", image: poster6 },
    { id: 8, title: "Монолог фармацевта 2", rating: "+8.95", image: poster8 },
    { id: 1, title: "Агрессивная Рэцуко", rating: "+8.75", image: poster1 },
    { id: 7, title: "Вечера с кошкой 2", rating: "+8.45", image: poster7 },
    { id: 4, title: "Владыка духовного меча 4", rating: "+8.30", image: poster4 },
    { id: 3, title: "Убийца Акамэ! Театр", rating: "+8.15", image: poster3 },
    { id: 2, title: "Мастера на все руки выгнали из отряда…", rating: "+7.92", image: poster2 },
    { id: 5, title: "Владыка множества миров 3", rating: "+7.88", image: poster5 },
  ],
  month: [
    { id: 6, title: "Ван-Пис", rating: "+9.10", image: poster6 },
    { id: 8, title: "Монолог фармацевта 2", rating: "+8.95", image: poster8 },
    { id: 7, title: "Вечера с кошкой 2", rating: "+8.45", image: poster7 },
    { id: 1, title: "Агрессивная Рэцуко", rating: "+8.75", image: poster1 },
    { id: 4, title: "Владыка духовного меча 4", rating: "+8.30", image: poster4 },
    { id: 3, title: "Убийца Акамэ! Театр", rating: "+8.15", image: poster3 },
    { id: 5, title: "Владыка множества миров 3", rating: "+7.88", image: poster5 },
    { id: 2, title: "Мастера на все руки выгнали из отряда…", rating: "+7.92", image: poster2 },
  ],
};


interface ActivityUser {
  id: string;
  username: string;
  avatar: string | null;
  level: string;
  activityPercent: string;
  stats: {
    comments: number;
    ratings: number;
  };
}

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [users, setUsers] = useState<ActivityUser[]>([]);
  const currentAnimeList = animeByPeriod[selectedPeriod];

  useEffect(() => {
    fetch('/api/users/activity?limit=6')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to load user activity:', err));
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1 w-full">
        {/* Most Viewed Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Самое просматриваемое</h2>
            <div className="bg-[#3b82f6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3 fill-current" />
              TOP
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedPeriod('day')}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedPeriod === 'day'
                  ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              За день
            </button>
            <button 
              onClick={() => setSelectedPeriod('week')}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedPeriod === 'week'
                  ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              За неделю
            </button>
            <button 
              onClick={() => setSelectedPeriod('month')}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedPeriod === 'month'
                  ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              За месяц
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 pt-2">
            {currentAnimeList.map((anime, index) => (
              <Link
                key={anime.id}
                href={anime.id === 1 ? "/anime/1" : "#"}
                className="group flex flex-col gap-2 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                  <img 
                    src={anime.image} 
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                      Аниме
                    </span>
                  </div>
                  
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-[#22c55e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      {anime.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-white/90 leading-tight line-clamp-2 group-hover:text-[#3b82f6] transition-colors">
                  {anime.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center pt-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-white/30">Реклама</span>
        </div>

        {/* Promo Banner */}
        <section className="relative w-full rounded-2xl overflow-hidden aspect-[4/1] min-h-[200px] md:min-h-[260px] border border-gray-200 dark:border-white/10 group cursor-pointer">
          <img 
            src={bannerBg} 
            alt="Spring Banner" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] group-hover:bg-black/20 transition-colors duration-500" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2 shadow-xl">
              <div className="w-6 h-6 bg-[#3b82f6] rounded-md flex items-center justify-center font-bold text-white text-xs">F</div>
              <span className="font-bold text-white tracking-wide">FUNPAY</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight drop-shadow-lg">
              Пришла весна, а значит пора<br/>крутить любимок!
            </h2>
            
            <p className="text-sm md:text-base font-medium text-white/90 drop-shadow-md max-w-2xl bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              ЗАКУПАЙСЯ НА FUNPAY — ВЫГОДНО И НАДЕЖНО!
            </p>
          </div>
        </section>

        {/* User Activity */}
        <section className="space-y-6 pb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Активность пользователей</h2>
          <div className="flex flex-wrap items-center gap-3">
            {users.length === 0 ? (
              <p className="text-gray-600 dark:text-white/60">Нет активных пользователей</p>
            ) : (
              users.map((user, index) => {
                const userAvatar = user.avatar || defaultAvatars[index % defaultAvatars.length];
                const colors = [
                  "bg-purple-500/20 text-purple-400",
                  "bg-red-500/20 text-red-400",
                  "bg-green-500/20 text-green-400",
                  "bg-orange-500/20 text-orange-400",
                  "bg-blue-500/20 text-blue-400",
                  "bg-pink-500/20 text-pink-400",
                ];
                const color = colors[index % colors.length];
                
                return (
                  <div 
                    key={user.id}
                    className="flex items-center gap-3 bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5 rounded-xl p-2.5 pr-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-300/50 dark:hover:shadow-black/50 transition-all cursor-pointer"
                  >
                    <img src={userAvatar} alt={user.username} className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white/90">{user.username}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${color}`}>
                          {user.level}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-white/50 text-xs font-medium">
                          <span title="Активность">{user.activityPercent}</span>
                          <Coins className="w-3 h-3 text-[#f59e0b]" />
                          {user.stats.comments + user.stats.ratings}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

      </main>
      
      <SiteFooter />
    </div>
  );
}
