import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Mic, TrendingUp } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Манга");

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[600px] bg-[#0d0d12] border border-white/10 text-white p-0 gap-0">
        {/* Search Input */}
        <div className="p-6 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
            <Input
              type="text"
              placeholder="Что вы ищете?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full h-14 pl-14 pr-14 bg-[#1a1a1f] border-white/10 text-white placeholder:text-white/40 rounded-xl text-lg focus-visible:ring-[#3b82f6] focus-visible:ring-2 focus-visible:border-transparent"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors">
              <Mic className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-[#3b82f6] text-white"
                    : "bg-transparent text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="px-6 pb-6 overflow-y-auto">
          <h3 className="text-lg font-medium text-white/70 mb-4">
            Популярные запросы
          </h3>
          <div className="space-y-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a1a1f] hover:bg-[#1f1f24] rounded-xl transition-colors text-left group"
              >
                <TrendingUp className="w-5 h-5 text-white/40 group-hover:text-[#3b82f6] transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  {search}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Hints */}
        <div className="px-6 py-4 border-t border-white/5 bg-[#0a0a0f]">
          <div className="flex items-center justify-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-[#1a1a1f] rounded border border-white/10 text-xs">
                ←
              </kbd>
              <span>Выбрать</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-[#1a1a1f] rounded border border-white/10 text-xs">
                ↑↓
              </kbd>
              <span>Навигация</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-[#1a1a1f] rounded border border-white/10 text-xs">
                ESC
              </kbd>
              <span>Закрыть</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
