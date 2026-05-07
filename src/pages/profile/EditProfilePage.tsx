import { ArrowLeft, User, Eye, Bookmark, CreditCard, Coins, LayoutGrid, Upload } from "lucide-react";
import { useState } from "react";

const MENU_ITEMS = [
  { id: "personal", label: "Личные данные", icon: <User size={15} /> },
  { id: "appearance", label: "Внешний вид", icon: <Eye size={15} /> },
  { id: "bookmarks", label: "Перенос закладок", icon: <Bookmark size={15} /> },
  { id: "payments", label: "Платежи", icon: <CreditCard size={15} /> },
  { id: "sencoins", label: "Сенкоины", icon: <Coins size={15} /> },
  { id: "cards", label: "Карточки", icon: <LayoutGrid size={15} /> },
];

const APPEARANCE_TABS = ["Аватары", "Рамки аватара", "Баннеры", "Обои"];

function AppearanceSection({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("Аватары");

  return (
    <div className="flex flex-col gap-8">
      {/* Banner */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Баннер</h2>
        <div className="w-full rounded-xl bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5" style={{ height: 130 }} />
        <p className="text-[12px] mt-2 leading-relaxed text-gray-600 dark:text-white/60">
          Баннер пользователя — платная функция. Можно купить в{" "}
          <span className="text-[#3b82f6] cursor-pointer underline">
            магазине украшений
          </span>
        </p>
      </div>

      {/* Avatar */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Аватарка</h2>
        <div className="w-[90px] h-[90px] rounded-full flex items-center justify-center text-4xl font-black mb-3 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/90 border-2 border-gray-300 dark:border-white/5">
          {username.charAt(0).toUpperCase()}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all hover:brightness-110 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/90 border border-gray-300 dark:border-white/5">
          <Upload size={13} />
          Загрузить
        </button>
        <p className="text-[12px] mt-2 leading-relaxed max-w-md text-gray-600 dark:text-white/60">
          Аватар пользователя — платная функция. Можно купить в{" "}
          <span className="text-[#3b82f6] cursor-pointer underline">
            магазине украшений
          </span>{" "}
          или поставить свою с{" "}
          <span className="text-[#3b82f6] cursor-pointer underline">
            премиумом
          </span>
        </p>
      </div>

      {/* My Decorations */}
      <div>
        <h2 className="text-lg font-bold mb-3" style={{ color: "#f0f6fc" }}>Мои украшения</h2>

        {/* Balance card */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4"
          style={{ background: "linear-gradient(135deg, #1c1a10 0%, #211d0d 100%)", border: "1px solid #3a3010" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "radial-gradient(circle at 35% 35%, #f5c842 0%, #e6a817 50%, #c8880a 100%)", boxShadow: "0 0 12px rgba(245,200,66,0.35)" }}
          >
            <span style={{ fontSize: 15, color: "#7a4800", fontWeight: 900 }}>¥</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: "#a16207" }}>Баланс</span>
            <span className="text-[22px] font-black leading-tight" style={{ color: "#fde68a" }}>0</span>
          </div>
          <button
            className="ml-auto px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:brightness-110 transition-all"
            style={{ background: "#3a2c00", color: "#fbbf24", border: "1px solid #5a4500" }}
          >
            Пополнить
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5">
          {APPEARANCE_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all"
              style={{
                background: activeTab === tab ? "#3b82f6" : "#1e1e1e",
                color: activeTab === tab ? "#fff" : "#9ca3af",
                border: activeTab === tab ? "1px solid #3b82f6" : "1px solid #2a2a2a",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          <p className="text-[14px] font-semibold mb-3" style={{ color: "#c9d1d9" }}>
            Мои загруженные аватары
          </p>
          <div
            className="rounded-xl p-4 flex items-center justify-center"
            style={{ background: "#141414", border: "1px solid #252525", minHeight: 80 }}
          >
            <span className="text-[13px]" style={{ color: "#4b5563" }}>Нет загруженных аватаров</span>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[14px] font-semibold mb-3" style={{ color: "#c9d1d9" }}>
            Приобретённые в магазине
          </p>
          <div
            className="rounded-xl p-4 flex items-center justify-center"
            style={{ background: "#141414", border: "1px solid #252525", minHeight: 80 }}
          >
            <span className="text-[13px]" style={{ color: "#4b5563" }}>Нет приобретённых аватаров</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalSection({ username, email }: { username: string; email: string }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-bold" style={{ color: "#f0f6fc" }}>Личные данные</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="text-[12px] font-medium mb-1.5 block" style={{ color: "#9ca3af" }}>
            Имя пользователя
          </label>
          <input
            className="w-full rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-1"
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              color: "#e2e8f0",
            }}
            defaultValue={username}
            readOnly
          />
        </div>
        <div>
          <label className="text-[12px] font-medium mb-1.5 block" style={{ color: "#9ca3af" }}>
            Email
          </label>
          <input
            className="w-full rounded-lg px-3 py-2 text-[14px] outline-none"
            style={{ background: "#141414", border: "1px solid #2a2a2a", color: "#6b7280" }}
            defaultValue={email || "Не указан"}
            readOnly
          />
        </div>
        <div>
          <label className="text-[12px] font-medium mb-1.5 block" style={{ color: "#9ca3af" }}>
            О себе
          </label>
          <textarea
            className="w-full rounded-lg px-3 py-2 text-[14px] outline-none resize-none"
            style={{ background: "#141414", border: "1px solid #2a2a2a", color: "#6b7280" }}
            rows={3}
            placeholder="Расскажите о себе..."
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4" style={{ color: "#f0f6fc" }}>{title}</h2>
      <div
        className="rounded-xl p-8 flex items-center justify-center"
        style={{ background: "#141414", border: "1px solid #252525" }}
      >
        <span className="text-[13px]" style={{ color: "#4b5563" }}>Раздел в разработке</span>
      </div>
    </div>
  );
}

interface Props {
  onBack: () => void;
  username?: string;
  email?: string;
}

export default function EditProfilePage({ onBack, username = "beezneezbusiness", email = "" }: Props) {
  const [activeSection, setActiveSection] = useState("appearance");

  const renderContent = () => {
    switch (activeSection) {
      case "personal": return <PersonalSection username={username} email={email} />;
      case "appearance": return <AppearanceSection username={username} />;
      case "bookmarks": return <PlaceholderSection title="Перенос закладок" />;
      case "payments": return <PlaceholderSection title="Платежи" />;
      case "sencoins": return <PlaceholderSection title="Сенкоины" />;
      case "cards": return <PlaceholderSection title="Карточки" />;
      default: return <AppearanceSection username={username} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white">
      <div className="max-w-[960px] mx-auto px-4 py-5">

        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <button
            onClick={onBack}
            className="mt-1 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 hover:brightness-110 transition-all bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/5 text-gray-600 dark:text-white/60"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-[20px] font-bold text-gray-900 dark:text-white">
              Редактирование профиля
            </h1>
            <p className="text-[12px] mt-0.5 text-gray-500 dark:text-white/50">
              Обновлён: 23 минуты назад
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Left sidebar */}
          <div className="flex-shrink-0" style={{ width: 190 }}>
            <nav className="flex flex-col gap-0.5">
              {MENU_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-left transition-all hover:brightness-110"
                  style={{
                    background: activeSection === item.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    color: activeSection === item.id ? '#3b82f6' : undefined,
                  }}
                >
                  <span style={{ color: activeSection === item.id ? '#3b82f6' : undefined }} className="text-gray-600 dark:text-white/60">
                    {item.icon}
                  </span>
                  <span className={activeSection === item.id ? 'text-[#3b82f6]' : 'text-gray-600 dark:text-white/60'}>
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
