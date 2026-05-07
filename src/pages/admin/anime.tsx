import { useState } from "react";
import { Film, Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { Link, useLocation } from "wouter";
import { adminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminAnime() {
  const [animeList, setAnimeList] = useState(adminStore.getAnimeList());
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const filteredAnime = animeList.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anime.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить это аниме?")) {
      adminStore.deleteAnime(id);
      setAnimeList(adminStore.getAnimeList());
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d12]">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Управление аниме
                </h1>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  {filteredAnime.length} из {animeList.length} аниме
                </p>
              </div>
            </div>
            <Link href="/admin" className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 font-medium">
              ← Назад
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Поиск и добавление */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/30" />
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-50 dark:bg-[#121218]"
            />
          </div>
          <Button onClick={() => setLocation('/admin/anime/import')} variant="outline" className="h-12 px-6">
            <Download className="w-5 h-5 mr-2" />
            Импорт из Kodik
          </Button>
          <Button onClick={() => setLocation('/admin/anime/new')} className="h-12 px-6">
            <Plus className="w-5 h-5 mr-2" />
            Добавить аниме
          </Button>
        </div>

        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredAnime.map((anime) => {
              const studio = adminStore.getStudio(anime.studioId);
              return (
                <div
                  key={anime.id}
                  className="group bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-all"
                >
                  <div className="aspect-[2/3] bg-gray-200 dark:bg-white/5 relative overflow-hidden">
                    <img
                      src={anime.poster}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-[#22c55e] text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                        {anime.rating}
                      </span>
                    </div>
                    {/* Overlay с кнопками при наведении */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setLocation(`/admin/anime/edit/${anime.id}`)}
                        className="bg-white text-gray-900 hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(anime.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">
                      {anime.title}
                    </h3>
                    <div className="text-xs text-gray-600 dark:text-white/60 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Студия:</span>
                        <span className="truncate">{studio?.name || 'Неизвестно'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Эпизодов:</span>
                        <span>{anime.episodes.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl">
            <Film className="w-16 h-16 text-gray-300 dark:text-white/10 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-white/50 mb-4">
              {searchQuery ? "Аниме не найдено" : "Аниме еще не добавлено"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setLocation('/admin/anime/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить первое аниме
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
