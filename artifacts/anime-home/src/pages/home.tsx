import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, LayoutTemplate, Sun, LogIn, ChevronDown, Crown } from "lucide-react";
import poster1 from "@/assets/images/poster-1.png";
import poster2 from "@/assets/images/poster-2.png";
import poster3 from "@/assets/images/poster-3.png";
import poster4 from "@/assets/images/poster-4.png";
import poster5 from "@/assets/images/poster-5.png";
import poster6 from "@/assets/images/poster-6.png";
import poster7 from "@/assets/images/poster-7.png";
import poster8 from "@/assets/images/poster-8.png";
import bannerBg from "@/assets/images/banner-bg.png";

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

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-[#0d0d12] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0d0d12]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 font-bold text-xl tracking-tight text-white hover:text-white/80 transition-colors">
              SHIRUHO
              <ChevronDown className="w-4 h-4 text-white/50 ml-1" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
              Поиск
            </Link>
            <Link href="#" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
              <LayoutGrid className="w-4 h-4" />
              Каталог
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Link>
            <Link href="#" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
              <LayoutTemplate className="w-4 h-4" />
              Экосистема
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <Sun className="w-5 h-5" />
            </button>
            <Button className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white font-medium rounded-md px-4 py-2 h-9 flex items-center gap-2 border-none cursor-pointer">
              <LogIn className="w-4 h-4" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
        
        {/* Most Viewed Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-white">Самое просматриваемое</h2>
            <div className="bg-[#3b82f6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3 fill-current" />
              TOP
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer">
              За день
            </button>
            <button className="text-white/50 hover:text-white/80 hover:bg-white/5 text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer">
              За неделю
            </button>
            <button className="text-white/50 hover:text-white/80 hover:bg-white/5 text-sm font-medium px-4 py-1.5 rounded-full transition-colors cursor-pointer">
              За месяц
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 pt-2">
            {animeList.map((anime, index) => (
              <div 
                key={anime.id} 
                className="group flex flex-col gap-2 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-white/5 border border-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
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
                <h3 className="text-sm font-medium text-white/90 leading-tight line-clamp-2 group-hover:text-[#3b82f6] transition-colors">
                  {anime.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center pt-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">Реклама</span>
        </div>

        {/* Promo Banner */}
        <section className="relative w-full rounded-2xl overflow-hidden aspect-[4/1] min-h-[200px] md:min-h-[260px] border border-white/10 group cursor-pointer">
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

      </main>
    </div>
  );
}
