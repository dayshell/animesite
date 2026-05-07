import { useState, useEffect } from "react";
import { Film, Plus, X, Link as LinkIcon, Save } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { adminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function AdminAnimeForm() {
  const [, params] = useRoute("/admin/anime/edit/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEdit = !!params?.id;
  const animeId = params?.id ? parseInt(params.id) : null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    poster: "",
    rating: "",
    studioId: 0,
    season: "",
    type: "",
    genres: [] as string[],
    tags: [] as number[],
    links: [] as { label: string; url: string }[],
    episodes: [] as { number: number; title: string; videoUrl: string; duration: string }[]
  });

  const [newGenre, setNewGenre] = useState("");
  const [newLink, setNewLink] = useState({ label: "", url: "" });
  const [newEpisode, setNewEpisode] = useState({ number: 1, title: "", videoUrl: "", duration: "" });

  const studios = adminStore.getStudios();
  const allTags = adminStore.getTags();

  useEffect(() => {
    if (isEdit && animeId) {
      const anime = adminStore.getAnime(animeId);
      if (anime) {
        setFormData({
          title: anime.title,
          description: anime.description,
          poster: anime.poster,
          rating: anime.rating,
          studioId: anime.studioId,
          season: anime.season,
          type: anime.type,
          genres: anime.genres,
          tags: anime.tags,
          links: anime.links,
          episodes: anime.episodes.map(ep => ({
            number: ep.number,
            title: ep.title,
            videoUrl: ep.videoUrl,
            duration: ep.duration
          }))
        });
      }
    }
  }, [isEdit, animeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.poster || !formData.studioId) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля: название, постер, студия",
        variant: "destructive"
      });
      return;
    }

    if (isEdit && animeId) {
      adminStore.updateAnime(animeId, {
        ...formData,
        episodes: formData.episodes.map((ep, idx) => ({
          id: idx + 1,
          ...ep
        }))
      });
      toast({
        title: "Успешно",
        description: "Аниме обновлено"
      });
    } else {
      adminStore.addAnime({
        ...formData,
        episodes: formData.episodes.map((ep, idx) => ({
          id: idx + 1,
          ...ep
        }))
      });
      toast({
        title: "Успешно",
        description: "Аниме добавлено"
      });
    }
    
    setLocation("/admin/anime");
  };

  const addGenre = () => {
    if (newGenre.trim() && !formData.genres.includes(newGenre.trim())) {
      setFormData({ ...formData, genres: [...formData.genres, newGenre.trim()] });
      setNewGenre("");
    }
  };

  const removeGenre = (genre: string) => {
    setFormData({ ...formData, genres: formData.genres.filter(g => g !== genre) });
  };

  const toggleTag = (tagId: number) => {
    if (formData.tags.includes(tagId)) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagId) });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tagId] });
    }
  };

  const addLink = () => {
    if (newLink.label.trim() && newLink.url.trim()) {
      setFormData({ ...formData, links: [...formData.links, newLink] });
      setNewLink({ label: "", url: "" });
    }
  };

  const removeLink = (index: number) => {
    setFormData({ ...formData, links: formData.links.filter((_, i) => i !== index) });
  };

  const addEpisode = () => {
    if (newEpisode.title.trim() && newEpisode.videoUrl.trim()) {
      setFormData({ ...formData, episodes: [...formData.episodes, newEpisode] });
      setNewEpisode({ 
        number: formData.episodes.length + 2, 
        title: "", 
        videoUrl: "", 
        duration: "" 
      });
    }
  };

  const removeEpisode = (index: number) => {
    setFormData({ ...formData, episodes: formData.episodes.filter((_, i) => i !== index) });
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
                  {isEdit ? "Редактировать аниме" : "Добавить аниме"}
                </h1>
              </div>
            </div>
            <Link href="/admin/anime" className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 font-medium">
              ← Назад
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Основная информация
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                  Название *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Название аниме"
                  required
                  className="bg-white dark:bg-[#0d0d12]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                  Описание
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Описание аниме"
                  rows={4}
                  className="bg-white dark:bg-[#0d0d12]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    URL постера *
                  </label>
                  <Input
                    value={formData.poster}
                    onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                    placeholder="/images/poster.png"
                    required
                    className="bg-white dark:bg-[#0d0d12]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Рейтинг
                  </label>
                  <Input
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    placeholder="+8.75"
                    className="bg-white dark:bg-[#0d0d12]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Студия *
                  </label>
                  <select
                    value={formData.studioId}
                    onChange={(e) => setFormData({ ...formData, studioId: parseInt(e.target.value) })}
                    required
                    className="w-full h-10 px-3 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white"
                  >
                    <option value={0}>Выберите студию</option>
                    {studios.map(studio => (
                      <option key={studio.id} value={studio.id}>{studio.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Сезон
                  </label>
                  <Input
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    placeholder="Весна 2024"
                    className="bg-white dark:bg-[#0d0d12]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                    Тип
                  </label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="ТВ (12 эп.)"
                    className="bg-white dark:bg-[#0d0d12]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Жанры */}
          <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Жанры
            </h3>
            <div className="flex gap-3 mb-4">
              <Input
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                placeholder="Добавить жанр"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
                className="bg-white dark:bg-[#0d0d12]"
              />
              <Button type="button" onClick={addGenre}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#3b82f6]/10 text-[#3b82f6] rounded-full text-sm font-medium"
                >
                  {genre}
                  <button type="button" onClick={() => removeGenre(genre)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Теги */}
          <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Теги
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    formData.tags.includes(tag.id)
                      ? 'bg-[#3b82f6] text-white'
                      : 'bg-white dark:bg-[#0d0d12] text-gray-700 dark:text-white/70 border border-gray-200 dark:border-white/10'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Ссылки */}
          <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Ссылки
            </h3>
            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <Input
                  value={newLink.label}
                  onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  placeholder="Название ссылки"
                  className="bg-white dark:bg-[#0d0d12]"
                />
                <Input
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  placeholder="URL"
                  className="bg-white dark:bg-[#0d0d12]"
                />
                <Button type="button" onClick={addLink}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {formData.links.map((link, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-[#0d0d12] rounded-lg">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{link.label}</span>
                    <span className="text-sm text-gray-500 dark:text-white/50">{link.url}</span>
                  </div>
                  <Button type="button" size="sm" variant="ghost" onClick={() => removeLink(idx)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Эпизоды */}
          <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Эпизоды
            </h3>
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-12 gap-3">
                <Input
                  type="number"
                  value={newEpisode.number}
                  onChange={(e) => setNewEpisode({ ...newEpisode, number: parseInt(e.target.value) })}
                  placeholder="№"
                  className="col-span-1 bg-white dark:bg-[#0d0d12]"
                />
                <Input
                  value={newEpisode.title}
                  onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
                  placeholder="Название эпизода"
                  className="col-span-5 bg-white dark:bg-[#0d0d12]"
                />
                <Input
                  value={newEpisode.videoUrl}
                  onChange={(e) => setNewEpisode({ ...newEpisode, videoUrl: e.target.value })}
                  placeholder="URL видео"
                  className="col-span-4 bg-white dark:bg-[#0d0d12]"
                />
                <Input
                  value={newEpisode.duration}
                  onChange={(e) => setNewEpisode({ ...newEpisode, duration: e.target.value })}
                  placeholder="24 мин"
                  className="col-span-1 bg-white dark:bg-[#0d0d12]"
                />
                <Button type="button" onClick={addEpisode} className="col-span-1">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {formData.episodes.map((episode, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-[#0d0d12] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900 dark:text-white">#{episode.number}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{episode.title}</span>
                    <span className="text-sm text-gray-500 dark:text-white/50">{episode.duration}</span>
                  </div>
                  <Button type="button" size="sm" variant="ghost" onClick={() => removeEpisode(idx)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1 h-12">
              <Save className="w-5 h-5 mr-2" />
              {isEdit ? "Сохранить изменения" : "Добавить аниме"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/admin/anime")}
              className="h-12"
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
