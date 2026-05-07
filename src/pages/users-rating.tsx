import { Crown } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useEffect, useState } from "react";
import avatar1 from "@/assets/avatars/avatar-1.png";
import avatar2 from "@/assets/avatars/avatar-2.png";
import avatar3 from "@/assets/avatars/avatar-3.png";
import avatar4 from "@/assets/avatars/avatar-4.png";
import avatar5 from "@/assets/avatars/avatar-5.png";
import avatar6 from "@/assets/avatars/avatar-6.png";

const defaultAvatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

interface TopUser {
  id: string;
  username: string;
  avatar: string | null;
  rank: number;
  level: number;
  activityPercent: number;
  stats: {
    watched: number;
    rated: number;
    comments: number;
    favorites: number;
  };
}

export default function UsersRating() {
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users/top?limit=50')
      .then(res => res.json())
      .then(data => {
        setTopUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load top users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-white/60">Загрузка топа пользователей...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

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
        {topUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-white/60">
              Пока нет зарегистрированных пользователей. Станьте первым!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {topUsers.map((user) => {
              const userAvatar = user.avatar || defaultAvatars[user.rank % defaultAvatars.length];
              const totalActivity = user.stats.watched + user.stats.rated + user.stats.comments;
              
              return (
                <div
                  key={user.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#16161e] transition-all cursor-pointer group"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-white/10 group-hover:border-[#3b82f6] transition-colors">
                      <img src={userAvatar} alt={user.username} className="w-full h-full object-cover" />
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
                        {user.username}
                      </h3>
                      <span className="text-sm text-[#22c55e] font-bold whitespace-nowrap">
                        Лучше {user.activityPercent}% пользователей
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold px-3 py-1 rounded-full">
                        {user.level} Ур.
                      </span>
                      
                      {user.stats.watched > 0 && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <span className="text-lg">👁</span>
                          <span className="text-gray-600 dark:text-white/60 font-medium">
                            Просмотрел(а)
                          </span>
                          <span className="text-gray-900 dark:text-white font-bold">
                            {user.stats.watched} серий
                          </span>
                        </div>
                      )}
                      
                      {user.stats.rated > 0 && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <span className="text-lg">⭐</span>
                          <span className="text-gray-600 dark:text-white/60 font-medium">
                            Оценил(а)
                          </span>
                          <span className="text-gray-900 dark:text-white font-bold">
                            {user.stats.rated} аниме
                          </span>
                        </div>
                      )}
                      
                      {user.stats.comments > 0 && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <span className="text-lg">💬</span>
                          <span className="text-gray-600 dark:text-white/60 font-medium">
                            Комментариев
                          </span>
                          <span className="text-gray-900 dark:text-white font-bold">
                            {user.stats.comments}
                          </span>
                        </div>
                      )}
                      
                      {totalActivity === 0 && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <span className="text-lg">🆕</span>
                          <span className="text-gray-600 dark:text-white/60 font-medium">
                            Новый пользователь
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
