import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LayoutGrid, LayoutTemplate, Sun, Moon, LogIn, ChevronDown, Mic } from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";
import { SearchDropdown } from "@/components/search-dropdown";
import { EcosystemDropdown } from "@/components/ecosystem-dropdown";
import { useTheme } from "@/components/theme-provider";
import { adminStore } from "@/lib/admin-store";

export function SiteHeader() {
  const [location] = useLocation();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [ecosystemDropdownOpen, setEcosystemDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [siteSettings, setSiteSettings] = useState(adminStore.getSiteSettings());

  // Обновляем настройки при изменении
  useEffect(() => {
    const interval = setInterval(() => {
      setSiteSettings(adminStore.getSiteSettings());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 dark:border-white/5 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 font-bold text-xl tracking-tight text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-white/80 transition-colors whitespace-nowrap">
            {siteSettings.logoType !== 'text' && siteSettings.logoUrl && (
              <img
                src={siteSettings.logoUrl}
                alt="Logo"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            {siteSettings.logoType !== 'logo' && siteSettings.siteName}
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:block relative w-[400px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/40 pointer-events-none z-10" />
              <Input
                type="text"
                placeholder="Что вы ищете?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchDropdownOpen(true)}
                className="w-full h-10 pl-10 pr-10 bg-gray-100 dark:bg-[#1a1a1f] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 rounded-lg text-sm focus-visible:ring-[#3b82f6] focus-visible:ring-1 focus-visible:border-transparent"
              />
              <button 
                onClick={() => setSearchDropdownOpen(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60 transition-colors"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <SearchDropdown
              isOpen={searchDropdownOpen}
              onClose={() => setSearchDropdownOpen(false)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/catalog" className={`flex items-center gap-2 text-sm font-medium transition-colors relative ${location === "/catalog" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white"}`}>
            <LayoutGrid className="w-4 h-4" />
            Каталог
            {location === "/catalog" && (
              <div className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            )}
          </Link>
          <div className="relative">
            <button 
              onClick={() => setEcosystemDropdownOpen(!ecosystemDropdownOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <LayoutTemplate className="w-4 h-4" />
              Экосистема
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            <EcosystemDropdown 
              isOpen={ecosystemDropdownOpen} 
              onClose={() => setEcosystemDropdownOpen(false)} 
            />
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <Button 
            onClick={() => setAuthDialogOpen(true)}
            className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white font-medium rounded-md px-4 py-2 h-9 flex items-center gap-2 border-none cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            Войти
          </Button>
        </div>
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>
  );
}
