import { useState } from "react";
import { Download, Film, CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { adminStore } from "@/lib/admin-store";
import { mockAnimeData, generateMockEpisodes } from "@/lib/mock-anime-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const KODIK_API_TOKEN = '3ddf7d450fb2574572333296960c6368';

export default function AdminImportAnime() {
  const { toast } = useToast();
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [imported, setImported] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [limit, setLimit] = useState(10);
  const [useMockData, setUseMockData] = useState(false);

  const importFromKodik = async () => {
    setImporting(true);
    setImported([]);
    setErrors([]);
    setProgress({ current: 0, total: 0 });

    try {
      // Пробуем через прокси, если не работает - показываем инструкцию
      let data;
      
      try {
        const response = await fetch(`/api/kodik-proxy?limit=${limit}`);
        if (!response.ok) throw new Error('Proxy failed');
        data = await response.json();
      } catch (proxyError) {
        // Если прокси не работает, пробуем напрямую
        const params = new URLSearchParams({
          token: KODIK_API_TOKEN,
          types: 'anime-serial',
          limit: limit.toString(),
          with_material_data: 'true',
          with_episodes: 'true',
          sort: 'updated_at',
          order: 'desc'
        });

        const response = await fetch(`https://kodik-api.com/list?${params}`, {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        data = await response.json();
      }

      if (!data.results || data.results.length === 0) {
        toast({
          title: "Ошибка",
          description: "Не удалось получить данные из API",
          variant: "destructive"
        });
        setImporting(false);
        return;
      }

      const animeList = data.results;
      setProgress({ current: 0, total: animeList.length });

      // Получаем или создаем студию Kodik
      let studios = adminStore.getStudios();
      let kodikStudio = studios.find(s => s.name === 'Kodik');
      
      if (!kodikStudio) {
        kodikStudio = adminStore.addStudio({
          name: 'Kodik',
          logo: 'K'
        });
      }

      // Статистика импорта
      let addedCount = 0;
      let updatedCount = 0;
      let skippedCount = 0;

      // Импортируем каждое аниме
      for (let i = 0; i < animeList.length; i++) {
        const kodikAnime = animeList[i];
        
        try {
          const materialData = kodikAnime.material_data || {};
          const kodikId = kodikAnime.id; // Уникальный ID из Kodik
          
          // Получаем эпизоды
          const episodes: any[] = [];
          if (kodikAnime.seasons) {
            Object.values(kodikAnime.seasons).forEach((season: any) => {
              if (season.episodes) {
                Object.entries(season.episodes).forEach(([episodeNum, episodeLink]) => {
                  episodes.push({
                    id: episodes.length + 1,
                    number: parseInt(episodeNum),
                    title: `Эпизод ${episodeNum}`,
                    videoUrl: episodeLink as string,
                    duration: materialData.duration ? `${materialData.duration} мин` : '24 мин'
                  });
                });
              }
            });
          }

          // Проверяем, существует ли уже это аниме
          const existingAnime = adminStore.getAnimeByKodikId(kodikId);

          if (existingAnime) {
            // Аниме уже существует - проверяем эпизоды
            const existingEpisodeNumbers = existingAnime.episodes.map(ep => ep.number);
            const newEpisodes = episodes.filter(ep => !existingEpisodeNumbers.includes(ep.number));

            if (newEpisodes.length > 0) {
              // Есть новые эпизоды - обновляем
              const updatedEpisodes = [
                ...existingAnime.episodes,
                ...newEpisodes.map((ep, idx) => ({
                  ...ep,
                  id: existingAnime.episodes.length + idx + 1
                }))
              ].sort((a, b) => a.number - b.number);

              adminStore.updateAnime(existingAnime.id, {
                episodes: updatedEpisodes
              });

              setImported(prev => [...prev, `✏️ Обновлено: ${existingAnime.title} (+${newEpisodes.length} эп.)`]);
              updatedCount++;
            } else {
              // Нет новых эпизодов - пропускаем
              setImported(prev => [...prev, `⏭️ Пропущено: ${existingAnime.title} (уже существует)`]);
              skippedCount++;
            }
          } else {
            // Новое аниме - добавляем
            const animeData = {
              kodikId: kodikId,
              title: materialData.anime_title || kodikAnime.title || 'Без названия',
              description: materialData.description || 'Описание отсутствует',
              poster: materialData.poster_url || '/images/placeholder.png',
              rating: materialData.minimal_age ? `+${materialData.minimal_age}` : '+12',
              studioId: kodikStudio.id,
              season: kodikAnime.year ? `${kodikAnime.year}` : 'Неизвестно',
              type: materialData.anime_kind || 'ТВ',
              genres: materialData.genres || [],
              tags: [],
              links: [
                kodikAnime.kinopoisk_id && {
                  label: 'Кинопоиск',
                  url: `https://www.kinopoisk.ru/film/${kodikAnime.kinopoisk_id}/`
                },
                kodikAnime.imdb_id && {
                  label: 'IMDb',
                  url: `https://www.imdb.com/title/${kodikAnime.imdb_id}/`
                },
                kodikAnime.shikimori_id && {
                  label: 'Shikimori',
                  url: `https://shikimori.one/animes/${kodikAnime.shikimori_id}`
                }
              ].filter(Boolean) as { label: string; url: string }[],
              episodes: episodes.slice(0, 50) // Ограничиваем до 50 эпизодов
            };

            adminStore.addAnime(animeData);
            setImported(prev => [...prev, `✅ Добавлено: ${animeData.title} (${episodes.length} эп.)`]);
            addedCount++;
          }

          setProgress({ current: i + 1, total: animeList.length });
        } catch (error) {
          const errorMsg = `Ошибка при импорте ${kodikAnime.title}: ${error}`;
          setErrors(prev => [...prev, errorMsg]);
        }
      }

      toast({
        title: "Импорт завершен!",
        description: `Добавлено: ${addedCount}, Обновлено: ${updatedCount}, Пропущено: ${skippedCount}`
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: `Не удалось импортировать: ${error}`,
        variant: "destructive"
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d12]">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Импорт аниме из Kodik
                </h1>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Автоматический импорт аниме через API
                </p>
              </div>
            </div>
            <Link href="/admin/anime" className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 font-medium">
              ← Назад
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Settings */}
        <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Настройки импорта
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                Количество аниме для импорта
              </label>
              <Input
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                min={1}
                max={100}
                className="bg-white dark:bg-[#0d0d12] w-32"
              />
            </div>
            <Button
              onClick={importFromKodik}
              disabled={importing}
              className="w-full h-12"
            >
              {importing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Импортируем... {progress.current}/{progress.total}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Начать импорт
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress */}
        {importing && progress.total > 0 && (
          <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Прогресс импорта
            </h3>
            <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 mb-2">
              <div
                className="bg-[#3b82f6] h-3 rounded-full transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-white/60 text-center">
              {progress.current} из {progress.total} ({Math.round((progress.current / progress.total) * 100)}%)
            </p>
          </div>
        )}

        {/* Imported */}
        {imported.length > 0 && (
          <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Результаты импорта ({imported.length})
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {imported.map((message, idx) => {
                const isAdded = message.startsWith('✅');
                const isUpdated = message.startsWith('✏️');
                const isSkipped = message.startsWith('⏭️');
                
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      isAdded ? 'bg-green-50 dark:bg-green-500/10' :
                      isUpdated ? 'bg-blue-50 dark:bg-blue-500/10' :
                      'bg-gray-100 dark:bg-white/5'
                    }`}
                  >
                    <Film className={`w-4 h-4 flex-shrink-0 ${
                      isAdded ? 'text-green-500' :
                      isUpdated ? 'text-blue-500' :
                      'text-gray-500'
                    }`} />
                    <span className={`text-sm ${
                      isAdded ? 'text-green-900 dark:text-green-400' :
                      isUpdated ? 'text-blue-900 dark:text-blue-400' :
                      'text-gray-700 dark:text-gray-400'
                    }`}>
                      {message}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-red-900 dark:text-red-400 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Ошибки ({errors.length})
            </h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {errors.map((error, idx) => (
                <div
                  key={idx}
                  className="text-sm text-red-700 dark:text-red-300 p-2 bg-white dark:bg-red-500/5 rounded"
                >
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
