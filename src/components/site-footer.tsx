import { Send, MessageSquare, Youtube, Copy, ChevronRight } from "lucide-react";
import footerArt from "@/assets/images/footer-art.png";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full mt-auto">
      <div className="bg-gray-100 dark:bg-[#121218] rounded-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-200 dark:border-white/5 relative">
        
        {/* Left Column (Artwork) */}
        <div className="w-full lg:w-[40%] relative aspect-square lg:aspect-auto lg:min-h-[300px]">
          <img 
            src={footerArt} 
            alt="Fox Spirit" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div className="font-bold text-2xl tracking-widest text-white drop-shadow-md">
              SHIRUHO
            </div>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 w-fit transition-colors text-sm font-medium cursor-pointer">
              Посетить Богиню
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[60%] p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[180px] font-black text-gray-900/[0.03] dark:text-white/[0.03] select-none pointer-events-none leading-none z-0">
            狐の神
          </div>
          
          <div className="relative z-10 space-y-8">
            <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-white/90 leading-snug max-w-lg">
              Огромный каталог аниме в котором есть тайтлы на любой вкус на русском в удобном плеере
            </p>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-white/40">По вопросам нарушения авторских прав пишите</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">contact@senkuro.org</span>
                <button 
                  onClick={() => navigator.clipboard.writeText('contact@senkuro.org')}
                  className="p-2 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="Скопировать"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="w-14 h-14 bg-gray-200 dark:bg-[#1a1a24] hover:bg-gray-300 dark:hover:bg-[#252532] rounded-2xl flex items-center justify-center text-gray-900 dark:text-white transition-all hover:-translate-y-1 cursor-pointer border border-gray-300 dark:border-white/5 shadow-lg">
                <Send className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 bg-gray-200 dark:bg-[#1a1a24] hover:bg-gray-300 dark:hover:bg-[#252532] rounded-2xl flex items-center justify-center text-gray-900 dark:text-white transition-all hover:-translate-y-1 cursor-pointer border border-gray-300 dark:border-white/5 shadow-lg font-bold text-xl">
                VK
              </button>
              <button className="w-14 h-14 bg-gray-200 dark:bg-[#1a1a24] hover:bg-gray-300 dark:hover:bg-[#252532] rounded-2xl flex items-center justify-center text-gray-900 dark:text-white transition-all hover:-translate-y-1 cursor-pointer border border-gray-300 dark:border-white/5 shadow-lg">
                <MessageSquare className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 bg-gray-200 dark:bg-[#1a1a24] hover:bg-gray-300 dark:hover:bg-[#252532] rounded-2xl flex items-center justify-center text-gray-900 dark:text-white transition-all hover:-translate-y-1 cursor-pointer border border-gray-300 dark:border-white/5 shadow-lg">
                <Youtube className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2 text-sm text-gray-500 dark:text-white/40 font-medium">
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-gray-700 dark:hover:text-white/70 transition-colors">DMCA</a>
          <a href="#" className="hover:text-gray-700 dark:hover:text-white/70 transition-colors">Авторское право</a>
          <a href="/admin" className="hover:text-[#3b82f6] transition-colors">Админ-панель</a>
        </div>
        <div>
          © 2026 «Shiruho» &nbsp;&nbsp;&nbsp; Версия: 270426
        </div>
      </div>
    </footer>
  );
}
