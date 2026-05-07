import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useRoute } from "wouter";
import { Clock, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";

function XpRewardIcon() {
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0"
      style={{ background: "linear-gradient(145deg, #1a3a2a 0%, #0d2218 100%)", border: "1px solid #1e4a30" }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="9" y="2" width="4" height="18" rx="1" fill="#2ecc71" opacity="0.9" />
        <rect x="2" y="9" width="18" height="4" rx="1" fill="#2ecc71" opacity="0.9" />
        <polygon points="11,1 13,4 9,4" fill="#27ae60" />
        <polygon points="11,21 13,18 9,18" fill="#27ae60" />
        <polygon points="1,11 4,9 4,13" fill="#27ae60" />
        <polygon points="21,11 18,9 18,13" fill="#27ae60" />
      </svg>
    </div>
  );
}

function CoinRewardIcon() {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: "radial-gradient(circle at 35% 35%, #f5c842 0%, #e6a817 50%, #c8880a 100%)", border: "2px solid #d4960f", boxShadow: "0 2px 6px rgba(230,168,23,0.4)" }}
    >
      <span style={{ fontSize: 14, color: "#7a4800", fontWeight: 900, lineHeight: 1 }}>¥</span>
    </div>
  );
}

function CountdownTimer({ initial }: { initial: string }) {
  const [time] = useState(initial);
  return (
    <span className="flex items-center gap-0.5 text-[11px] font-semibold" style={{ color: "#f97316" }}>
      <Clock size={10} strokeWidth={2.5} />
      {time}
    </span>
  );
}

const TASKS = [
  { id: 1, title: "Посетить сайт", timer: "14:01:05", xp: 22, coin: 11, progress: 0, total: 1, unit: "за день" },
  { id: 2, title: "Получить 100 опыта", timer: "14:01:05", xp: 21, coin: 9, progress: 0, total: 100, unit: "за день" },
  { id: 3, title: "Посмотреть 3 аниме эпизода", timer: "14:01:05", xp: 28, coin: 16, progress: 0, total: 3, unit: "за день" },
  { id: 4, title: "Доб...", timer: "14:01:05", xp: 17, coin: null, progress: 0, total: null, unit: null },
];

function TaskCard({ task }: { task: typeof TASKS[0] }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col gap-2 rounded-xl p-3 bg-white dark:bg-[#1a1a1e] border border-gray-200 dark:border-white/5"
      style={{ minWidth: 158, width: 162 }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
          style={{ background: "#3b82f6", color: "#fff", letterSpacing: "0.03em" }}
        >
          NEW
        </span>
        <CountdownTimer initial={task.timer} />
      </div>

      <div className="flex items-start gap-1">
        <Sparkles size={13} className="mt-0.5 flex-shrink-0 text-[#3b82f6]" />
        <span className="text-[13px] font-semibold leading-tight text-gray-800 dark:text-white/90">
          {task.title}
        </span>
      </div>

      <div>
        <span className="text-[11px] text-gray-500 dark:text-white/50">Награда</span>
        <div className="flex items-end gap-2 mt-1.5">
          <div className="flex flex-col items-center gap-1">
            <XpRewardIcon />
            <span className="text-xs font-bold text-gray-700 dark:text-white/80">{task.xp}</span>
          </div>
          {task.coin !== null && (
            <div className="flex flex-col items-center gap-1">
              <CoinRewardIcon />
              <span className="text-xs font-bold text-[#f59e0b]">{task.coin}</span>
            </div>
          )}
        </div>
      </div>

      {task.total !== null && (
        <div className="mt-auto">
          <div className="w-full h-[3px] rounded-full bg-gray-200 dark:bg-white/10">
            <div className="h-[3px] rounded-full bg-[#3b82f6]" style={{ width: "0%" }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-500 dark:text-white/50">{task.progress}</span>
            <span className="text-[10px] text-gray-500 dark:text-white/50">из {task.total} {task.unit}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicProfile() {
  const [, params] = useRoute("/user/:username");
  const username = params?.username || "user";

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans">
      <SiteHeader />
      
      <div className="min-h-screen bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white flex-1">
        <div className="max-w-[960px] mx-auto px-4 py-5 flex flex-col gap-3">

          {/* Profile Header - Public View (No Edit Button) */}
          <div className="rounded-2xl px-5 py-4 flex items-center gap-4 bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5">
            <div className="relative flex-shrink-0">
              <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center text-3xl font-black bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/90">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 bg-[#3b82f6] border-gray-100 dark:border-[#16161e]" />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-[22px] font-bold tracking-tight text-gray-900 dark:text-white">
                {username}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-gray-600 dark:text-white/60">0</span>
                <span className="text-sm text-gray-500 dark:text-white/50">Уровень</span>
              </div>
            </div>
          </div>

          {/* Main row */}
          <div className="flex gap-3 items-start">

            {/* Left column */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">

              {/* Tasks */}
              <div className="rounded-2xl p-4 bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[15px] font-bold text-gray-900 dark:text-white">Задания для тебя</span>
                  <button className="flex items-center gap-0.5 text-[13px] font-medium transition-colors hover:opacity-80 text-[#3b82f6]">
                    Все задания <ChevronRight size={14} />
                  </button>
                </div>
                <div
                  className="flex gap-2.5 overflow-x-auto"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {TASKS.map(task => <TaskCard key={task.id} task={task} />)}
                </div>
              </div>

              {/* Collectible Cards */}
              <div className="rounded-2xl px-4 py-4 bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-gray-900 dark:text-white">Коллекционные карточки</span>
                  <button className="flex items-center gap-0.5 text-[13px] font-medium hover:opacity-80 transition-colors text-[#3b82f6]">
                    Все карточки <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Achievements */}
              <div className="rounded-2xl px-4 py-4 bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-gray-900 dark:text-white">
                    Достижения{" "}
                    <span className="font-normal text-gray-500 dark:text-white/50">0</span>
                  </span>
                  <button className="flex items-center gap-0.5 text-[13px] font-medium hover:opacity-80 transition-colors text-[#3b82f6]">
                    Все достижения <ChevronRight size={14} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-3 flex-shrink-0" style={{ width: 226 }}>

              {/* Action History */}
              <div className="rounded-2xl p-4 bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[15px] font-bold text-gray-900 dark:text-white">История действий</span>
                  <button className="text-[#3b82f6]">
                    <ChevronRight size={15} />
                  </button>
                </div>
                <span className="text-[11px] text-gray-500 dark:text-white/50">1 минуту назад</span>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold flex-shrink-0 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/90 border border-gray-300 dark:border-white/5">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[13px] font-semibold truncate text-gray-800 dark:text-white/90">
                    {username}
                  </span>
                </div>
                <div className="mt-1.5">
                  <span className="text-[12px] text-gray-600 dark:text-white/60">Регистрация</span>
                </div>
              </div>

              {/* Year Results */}
              <div className="rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all overflow-hidden relative bg-gradient-to-br from-purple-900/40 to-purple-800/40 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-700/30 dark:border-purple-700/20">
                <span className="text-[13px] font-medium relative z-10 text-purple-200 dark:text-purple-300">
                  Посмотреть{" "}
                  <span className="text-purple-300 dark:text-purple-400 underline">итоги года</span>
                </span>
                <span className="text-[28px] font-black italic absolute right-3 select-none text-purple-900/70 dark:text-purple-900/50" style={{ letterSpacing: "-1px" }}>
                  ЛЕТ
                </span>
              </div>

              {/* Statistics */}
              <div className="rounded-2xl p-4 bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5">
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Статистика</span>
                <div className="flex flex-col gap-2 mt-3">

                  <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 bg-white dark:bg-[#1a1a1e] border-l-[3px] border-[#f59e0b]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#f59e0b" opacity="0.2" />
                      <path d="M7 8h10M7 12h6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-bold text-gray-900 dark:text-white">0</span>
                      <span className="text-[11px] text-gray-600 dark:text-white/60">Глав прочитал(а)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 bg-white dark:bg-[#1a1a1e] border-l-[3px] border-[#3b82f6]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" fill="#3b82f6" opacity="0.2" />
                      <polygon points="10,8 16,12 10,16" fill="#3b82f6" />
                    </svg>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-bold text-gray-900 dark:text-white">0</span>
                      <span className="text-[11px] text-gray-600 dark:text-white/60">Серий просмотрел(а)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 bg-white dark:bg-[#1a1a1e] border-l-[3px] border-[#ef4444]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#ef4444" opacity="0.25" stroke="#ef4444" strokeWidth="1.5" />
                    </svg>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-bold text-gray-900 dark:text-white">0</span>
                      <span className="text-[11px] text-gray-600 dark:text-white/60">Тайтлов оценил(а)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/5">
                  <p className="text-[11px] text-gray-500 dark:text-white/50">Лучше, чем 0.0% пользователей</p>
                  <p className="text-[11px] mt-0.5 text-gray-500 dark:text-white/50">
                    Ранг:{" "}
                    <span className="text-[#3b82f6] underline cursor-pointer">#0</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <SiteFooter />
    </div>
  );
}
