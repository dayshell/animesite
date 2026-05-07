import { Users, Film, Tags, Building2, Trophy, BarChart3, Settings } from "lucide-react";
import { Link } from "wouter";

const stats = [
  { label: "Пользователи", value: "1,234", icon: Users, color: "from-blue-500 to-blue-600" },
  { label: "Аниме", value: "156", icon: Film, color: "from-purple-500 to-purple-600" },
  { label: "Студии", value: "45", icon: Building2, color: "from-green-500 to-green-600" },
  { label: "Теги", value: "89", icon: Tags, color: "from-orange-500 to-orange-600" },
];

const quickActions = [
  { label: "Добавить аниме", href: "/admin/anime/new", icon: Film, color: "text-purple-500" },
  { label: "Настройки контента", href: "/admin/settings", icon: Settings, color: "text-blue-500" },
  { label: "Настройки сайта", href: "/admin/site-settings", icon: Settings, color: "text-green-500" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d12]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Админ-панель
                </h1>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Управление контентом и пользователями
                </p>
              </div>
            </div>
            <Link href="/" className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 font-medium">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 dark:bg-[#0a0a0f] border-r border-gray-200 dark:border-white/10 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Дашборд</span>
            </Link>
            <Link 
              href="/admin/users" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Пользователи</span>
            </Link>
            <Link 
              href="/admin/anime" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Film className="w-5 h-5" />
              <span className="font-medium">Аниме</span>
            </Link>
            <Link 
              href="/admin/settings" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Настройки контента</span>
            </Link>
            <Link 
              href="/admin/site-settings" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Настройки сайта</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-2">
                Добро пожаловать в админ-панель! 👋
              </h2>
              <p className="text-white/90">
                Управляйте контентом, пользователями и настройками сайта
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-white/60 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Быстрые действия
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="group flex items-center gap-4 p-5 bg-white dark:bg-[#0d0d12] border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl hover:border-[#3b82f6] hover:bg-[#3b82f6]/5 dark:hover:bg-[#3b82f6]/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#3b82f6]/10 transition-colors">
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Последняя активность
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#0d0d12] rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-white/70">
                    Добавлено новое аниме "Агрессивная Рэцуко"
                  </span>
                  <span className="text-xs text-gray-500 dark:text-white/50 ml-auto">
                    2 часа назад
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#0d0d12] rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-white/70">
                    Зарегистрирован новый пользователь
                  </span>
                  <span className="text-xs text-gray-500 dark:text-white/50 ml-auto">
                    5 часов назад
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
