import { ChevronDown, ArrowDownUp, RefreshCw, Search, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import poster1 from "@/assets/images/poster-1.png";
import poster2 from "@/assets/images/poster-2.png";
import poster3 from "@/assets/images/poster-3.png";
import poster4 from "@/assets/images/poster-4.png";
import poster5 from "@/assets/images/poster-5.png";
import poster6 from "@/assets/images/poster-6.png";
import poster7 from "@/assets/images/poster-7.png";
import poster8 from "@/assets/images/poster-8.png";
import catalog1 from "@/assets/images/catalog-1.png";
import catalog2 from "@/assets/images/catalog-2.png";
import catalog3 from "@/assets/images/catalog-3.png";

const catalogItems = [
  { id: 1, title: "Бессмертный культиватор против…", rating: "+8.55", image: catalog1 },
  { id: 2, title: "Я получил читерские способности в другом…", rating: "+8.20", image: catalog2 },
  { id: 3, title: "Мастера на все руки выгнали из отряда…", rating: "+7.92", image: catalog3 },
  { id: 4, title: "Отверженная святая и её гастрономическое…", rating: "+8.30", image: poster4 },
  { id: 5, title: "Вознёсшийся над небесами", rating: "+8.80", image: poster5 },
  { id: 6, title: "Освободите эту ведьму", rating: "+8.65", image: poster6 },
  { id: 7, title: "Фермерская жизнь в ином мире 2", rating: "+8.40", image: poster7 },
  { id: 8, title: "Авантюрист, пожирающий демонов…", rating: "+8.25", image: poster8 },
  { id: 9, title: "Разбивая звёзды", rating: "+8.90", image: poster1 },
  { id: 10, title: "В команде героя была милая девушка, так ч…", rating: "+8.35", image: poster2 },
  { id: 11, title: "Агрессивная Рэцуко", rating: "+8.75", image: poster3 },
  { id: 12, title: "Владыка духовного меча 4", rating: "+8.30", image: poster4 },
  { id: 13, title: "Владыка множества миров 3", rating: "+7.88", image: poster5 },
  { id: 14, title: "Ван-Пис", rating: "+9.10", image: poster6 },
  { id: 15, title: "Вечера с кошкой 2", rating: "+8.45", image: poster7 },
];

function FilterSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="py-4 border-t border-white/5 space-y-3">
      <div className="flex items-center justify-between text-white font-medium cursor-pointer hover:text-white/80 transition-colors">
        {title}
        <ChevronRight className="w-4 h-4 text-white/40" />
      </div>
      <div className="text-xs font-semibold text-white/30 uppercase tracking-wider">
        Популярные
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/50 transition-colors flex-shrink-0" />
            <span className="text-sm text-white/80 group-hover:text-white transition-colors">{item}</span>
          </label>
        ))}
      </div>
      <button className="text-sm text-[#3b82f6]/80 hover:text-[#3b82f6] font-medium transition-colors mt-2 cursor-pointer">
        Полностью &gt;
      </button>
    </div>
  );
}

export default function Catalog() {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-[#0d0d12] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Библиотека аниме</h1>
        
        <div className="flex items-center gap-3 mb-8">
          <button className="bg-[#16161e] border border-white/5 hover:border-white/10 hover:bg-[#1a1a24] transition-colors rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-white/90 cursor-pointer shadow-sm">
            По: популярности
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>
          <button className="bg-[#16161e] border border-white/5 hover:border-white/10 hover:bg-[#1a1a24] transition-colors rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-white/90 cursor-pointer shadow-sm">
            Показать сначала
            <ArrowDownUp className="w-4 h-4 text-white/50" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {catalogItems.map((anime, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col gap-2 cursor-pointer animate-in fade-in zoom-in-95 duration-300"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-white/5 border border-white/5 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
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
                  <h3 className="text-sm font-medium text-white/90 leading-tight line-clamp-2 group-hover:text-[#3b82f6] transition-colors mt-1">
                    {anime.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="bg-[#121218] border border-white/5 rounded-2xl p-5 sticky top-[5rem]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Фильтры</h3>
                <button className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Сбросить
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-white/80">Поиск лейблов</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Например романтика" 
                    className="w-full bg-[#0a0a0e] border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-all"
                  />
                </div>
              </div>

              <FilterSection 
                title="Основной каст" 
                items={["ГГ мужчина", "Умный ГГ", "В основном взрослые"]} 
              />
              <FilterSection 
                title="Черты" 
                items={["Злодейка", "Детектив", "Правонарушитель / Хулиган", "Идол ♀", "Идол ♂"]} 
              />
              <FilterSection 
                title="Сеттинг" 
                items={["Исторический", "Школа", "Городское фэнтези"]} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}