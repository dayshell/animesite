import { useState, useRef, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchDropdown({ isOpen, onClose, searchQuery, onSearchChange }: SearchDropdownProps) {
  const [activeCategory, setActiveCategory] = useState("Манга");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Манга",
    "Аниме",
    "Пользователи",
    "Гильдии",
    "Персонажи",
    "Персонал",
    "Компании",
  ];

  const popularSearches = [
    "Сельский спецзакон",
    "Хентай",
    "Наномашины",
    "Мои альтер эго получили огромное влияние",
    "Этот брак всё равно обречён на провал",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0d0d12] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Categories */}
      <div className="p-4 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-[#3b82f6] text-white"
                  : "bg-transparent text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Searches */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-500 dark:text-white/50 mb-3">
          Популярные запросы
        </h3>
        <div className="space-y-1">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => {
                onSearchChange(search);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-transparent hover:bg-gray-100 dark:hover:bg-[#1a1a1f] rounded-lg transition-colors text-left group"
            >
              <TrendingUp className="w-4 h-4 text-gray-400 dark:text-white/30 group-hover:text-[#3b82f6] transition-colors flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-white/70 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {search}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Hints */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a0f]">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-white/30">
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#1a1a1f] rounded border border-gray-200 dark:border-white/10 text-[10px]">
              ←
            </kbd>
            <span>Выбрать</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#1a1a1f] rounded border border-gray-200 dark:border-white/10 text-[10px]">
              ↑↓
            </kbd>
            <span>Навигация</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#1a1a1f] rounded border border-gray-200 dark:border-white/10 text-[10px]">
              ESC
            </kbd>
            <span>Закрыть</span>
          </div>
        </div>
      </div>
    </div>
  );
}
