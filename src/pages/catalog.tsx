import { ChevronDown, ArrowDownUp, RefreshCw, Search, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useState, useEffect, useRef } from "react";
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
  { id: 1, title: "Бессмертный культиватор против…", rating: 8.55, image: catalog1 },
  { id: 2, title: "Я получил читерские способности в другом…", rating: 8.20, image: catalog2 },
  { id: 3, title: "Мастера на все руки выгнали из отряда…", rating: 7.92, image: catalog3 },
  { id: 4, title: "Отверженная святая и её гастрономическое…", rating: 8.30, image: poster4 },
  { id: 5, title: "Вознёсшийся над небесами", rating: 8.80, image: poster5 },
  { id: 6, title: "Освободите эту ведьму", rating: 8.65, image: poster6 },
  { id: 7, title: "Фермерская жизнь в ином мире 2", rating: 8.40, image: poster7 },
  { id: 8, title: "Авантюрист, пожирающий демонов…", rating: 8.25, image: poster8 },
  { id: 9, title: "Разбивая звёзды", rating: 8.90, image: poster1 },
  { id: 10, title: "В команде героя была милая девушка, так ч…", rating: 8.35, image: poster2 },
  { id: 11, title: "Агрессивная Рэцуко", rating: 8.75, image: poster3 },
  { id: 12, title: "Владыка духовного меча 4", rating: 8.30, image: poster4 },
  { id: 13, title: "Владыка множества миров 3", rating: 7.88, image: poster5 },
  { id: 14, title: "Ван-Пис", rating: 9.10, image: poster6 },
  { id: 15, title: "Вечера с кошкой 2", rating: 8.45, image: poster7 },
];

type SortOption = 'popularity' | 'rating' | 'title' | 'year';
type OrderOption = 'desc' | 'asc';

function FilterSection({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="py-4 border-t border-gray-200 dark:border-white/5 space-y-3">
      <div className="flex items-center justify-between text-gray-900 dark:text-white font-medium cursor-pointer hover:text-gray-700 dark:hover:text-white/80 transition-colors">
        {title}
        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-white/40" />
      </div>
      <div className="text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">
        Популярные
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-white/20 group-hover:border-gray-500 dark:group-hover:border-white/50 transition-colors flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item}</span>
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
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [order, setOrder] = useState<OrderOption>('desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showOrderMenu, setShowOrderMenu] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const orderMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
      if (orderMenuRef.current && !orderMenuRef.current.contains(event.target as Node)) {
        setShowOrderMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popularity', label: 'популярности' },
    { value: 'rating', label: 'рейтингу' },
    { value: 'title', label: 'названию' },
    { value: 'year', label: 'году' },
  ];

  const orderOptions: { value: OrderOption; label: string }[] = [
    { value: 'desc', label: 'По убыванию' },
    { value: 'asc', label: 'По возрастанию' },
  ];

  const getSortedItems = () => {
    const items = [...catalogItems];
    
    items.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'popularity':
        case 'year':
        default:
          comparison = a.id - b.id;
          break;
      }
      
      return order === 'desc' ? -comparison : comparison;
    });
    
    return items;
  };

  const sortedItems = getSortedItems();

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Библиотека аниме</h1>
        
        <div className="flex items-center gap-3 mb-8">
          {/* Sort By Dropdown */}
          <div className="relative" ref={sortMenuRef}>
            <button 
              onClick={() => {
                setShowSortMenu(!showSortMenu);
                setShowOrderMenu(false);
              }}
              className="bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-200 dark:hover:bg-[#1a1a24] transition-colors rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white/90 cursor-pointer shadow-sm"
            >
              По: {sortOptions.find(opt => opt.value === sortBy)?.label}
              <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-white/50 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showSortMenu && (
              <div className="absolute top-full mt-2 left-0 bg-white dark:bg-[#16161e] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg overflow-hidden z-10 min-w-[180px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-[#3b82f6]/10 text-[#3b82f6] font-medium'
                        : 'text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    По {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Order Dropdown */}
          <div className="relative" ref={orderMenuRef}>
            <button 
              onClick={() => {
                setShowOrderMenu(!showOrderMenu);
                setShowSortMenu(false);
              }}
              className="bg-gray-100 dark:bg-[#16161e] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-200 dark:hover:bg-[#1a1a24] transition-colors rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white/90 cursor-pointer shadow-sm"
            >
              {orderOptions.find(opt => opt.value === order)?.label}
              <ArrowDownUp className="w-4 h-4 text-gray-500 dark:text-white/50" />
            </button>
            
            {showOrderMenu && (
              <div className="absolute top-full mt-2 left-0 bg-white dark:bg-[#16161e] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg overflow-hidden z-10 min-w-[180px]">
                {orderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setOrder(option.value);
                      setShowOrderMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      order === option.value
                        ? 'bg-[#3b82f6]/10 text-[#3b82f6] font-medium'
                        : 'text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sortedItems.map((anime, index) => (
                <div 
                  key={anime.id} 
                  className="group flex flex-col gap-2 cursor-pointer animate-in fade-in zoom-in-95 duration-300"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
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
                        +{anime.rating.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white/90 leading-tight line-clamp-2 group-hover:text-[#3b82f6] transition-colors mt-1">
                    {anime.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-2xl p-5 sticky top-[5rem]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Фильтры</h3>
                <button className="text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Сбросить
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-white/80">Поиск лейблов</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                  <input 
                    type="text" 
                    placeholder="Например романтика" 
                    className="w-full bg-white dark:bg-[#0a0a0e] border border-gray-200 dark:border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-all"
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