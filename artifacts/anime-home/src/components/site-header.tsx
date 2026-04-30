import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, LayoutTemplate, Sun, LogIn, ChevronDown } from "lucide-react";

export function SiteHeader() {
  const [location] = useLocation();

  return (
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
          <Link href="/catalog" className={`flex items-center gap-2 text-sm font-medium transition-colors relative ${location === "/catalog" ? "text-white" : "text-white/70 hover:text-white"}`}>
            <LayoutGrid className="w-4 h-4" />
            Каталог
            <ChevronDown className="w-3 h-3 opacity-50" />
            {location === "/catalog" && (
              <div className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            )}
          </Link>
          <Link href="#" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
            <LayoutTemplate className="w-4 h-4" />
            Экосистема
            <ChevronDown className="w-3 h-3 opacity-50" />
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer">
            <Sun className="w-5 h-5" />
          </button>
          <Button className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white font-medium rounded-md px-4 py-2 h-9 flex items-center gap-2 border-none cursor-pointer">
            <LogIn className="w-4 h-4" />
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
}
