import { useState } from "react";
import { Play, Plus, Share2, Eye, Calendar, Tv, ExternalLink, MessageSquare, Send } from "lucide-react";
import { useRoute } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { adminStore } from "@/lib/admin-store";
import { useToast } from "@/hooks/use-toast";

type TabType = 'about' | 'episodes' | 'comments' | 'stats';

export default function AnimeDetail() {
  const [, params] = useRoute("/anime/:id");
  const animeId = params?.id ? parseInt(params.id) : 1;
  const anime = adminStore.getAnime(animeId);
  const studio = anime ? adminStore.getStudio(anime.studioId) : null;
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [newComment, setNewComment] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(
    anime?.episodes.length > 0 ? anime.episodes[0].id : null
  );

  // Получаем комментарии для этого аниме
  const allUsers = adminStore.getUsers();
  const animeComments = allUsers.flatMap(user => 
    user.comments
      .filter(comment => comment.animeId === animeId)
      .map(comment => ({
        ...comment,
        userName: user.name,
        userAvatar: user.avatar,
        userLevel: user.level
      }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0d0d12]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Аниме не найдено
          </h1>
          <p className="text-gray-600 dark:text-white/60">
            Аниме с ID {animeId} не существует
          </p>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Ошибка",
        description: "Комментарий не может быть пустым",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Комментарий добавлен",
      description: "Ваш комментарий успешно опубликован"
    });
    setNewComment("");
  };

  const stats = [
    { icon: Calendar, label: "Сезон", value: anime.season },
    { icon: Tv, label: "Тип", value: anime.type },
    { icon: Eye, label: "Эпизодов", value: anime.episodes.length.toString() },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Poster */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Poster */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-xl">
                <img 
                  src={anime.poster} 
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
                {anime.rating && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#22c55e] text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      {anime.rating}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <Button className="w-full h-12 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white font-medium rounded-xl text-base flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                Смотреть
              </Button>

              <div className="flex gap-2">
                <Button className="flex-1 h-10 bg-gray-100 dark:bg-[#1a1a1f] hover:bg-gray-200 dark:hover:bg-[#252530] text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  В список
                </Button>
              </div>

              <Button className="w-full h-10 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Поделиться
              </Button>

              {/* Studio */}
              {studio && (
                <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-white/50 mb-3">Студия</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-lg flex items-center justify-center text-lg font-bold text-white">
                      {studio.logo}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{studio.name}</span>
                  </div>
                </div>
              )}

              {/* Links */}
              {anime.links.length > 0 && (
                <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-white/50 mb-3">Ссылки</h3>
                  <div className="space-y-2">
                    {anime.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-white/70 hover:text-[#3b82f6] transition-colors"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {anime.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-bold text-[#22c55e]">{anime.rating || "N/A"}</span>
                </div>
                <Button className="h-9 px-4 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-lg">
                  Оценить
                </Button>
              </div>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {anime.genres.map((genre, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 dark:border-white/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-base text-gray-700 dark:text-white/80 leading-relaxed">
                {anime.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-gray-200 dark:bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-5 h-5 text-gray-600 dark:text-white/60" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-white/50 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-white/5">
              <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('about')}
                  className={`pb-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'about' 
                      ? 'border-[#3b82f6] text-[#3b82f6]' 
                      : 'border-transparent text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70'
                  }`}
                >
                  О тайтле
                </button>
                <button 
                  onClick={() => setActiveTab('episodes')}
                  className={`pb-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'episodes' 
                      ? 'border-[#3b82f6] text-[#3b82f6]' 
                      : 'border-transparent text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70'
                  }`}
                >
                  Эпизоды ({anime.episodes.length})
                </button>
                <button 
                  onClick={() => setActiveTab('comments')}
                  className={`pb-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'comments' 
                      ? 'border-[#3b82f6] text-[#3b82f6]' 
                      : 'border-transparent text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70'
                  }`}
                >
                  Комментарии ({animeComments.length})
                </button>
                <button 
                  onClick={() => setActiveTab('stats')}
                  className={`pb-3 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'stats' 
                      ? 'border-[#3b82f6] text-[#3b82f6]' 
                      : 'border-transparent text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white/70'
                  }`}
                >
                  Статистика
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'about' && (
                <div className="space-y-6">
                  {/* Video Player Placeholder */}
                  <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative border border-gray-200 dark:border-white/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                          <Play className="w-10 h-10 text-white fill-current" />
                        </div>
                        <p className="text-white/70 text-lg">Выберите эпизод для просмотра</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {anime.tags.length > 0 && (
                    <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/5 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Теги</h3>
                      <div className="flex flex-wrap gap-2">
                        {anime.tags.map((tagId) => {
                          const allTags = adminStore.getTags();
                          const tag = allTags.find(t => t.id === tagId);
                          return tag ? (
                            <span
                              key={tagId}
                              className="bg-white dark:bg-[#0d0d12] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 text-sm px-3 py-1.5 rounded-lg"
                            >
                              {tag.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'episodes' && (
                <div className="space-y-6">
                  {/* Current Episode Player */}
                  {selectedEpisode && (
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden relative border border-gray-200 dark:border-white/10">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                              <Play className="w-10 h-10 text-white fill-current" />
                            </div>
                            <p className="text-white/70 text-lg">
                              Эпизод {anime.episodes.find(ep => ep.id === selectedEpisode)?.number}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Episode Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => {
                              const currentIndex = anime.episodes.findIndex(ep => ep.id === selectedEpisode);
                              if (currentIndex > 0) {
                                setSelectedEpisode(anime.episodes[currentIndex - 1].id);
                              }
                            }}
                            disabled={anime.episodes.findIndex(ep => ep.id === selectedEpisode) === 0}
                            className="w-10 h-10 bg-gray-100 dark:bg-[#1a1a1f] rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#252530] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <span className="text-xl">←</span>
                          </button>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {anime.episodes.find(ep => ep.id === selectedEpisode)?.number} серия
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-white/60">
                              Просмотрено <Eye className="w-4 h-4 inline" />
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              const currentIndex = anime.episodes.findIndex(ep => ep.id === selectedEpisode);
                              if (currentIndex < anime.episodes.length - 1) {
                                setSelectedEpisode(anime.episodes[currentIndex + 1].id);
                              }
                            }}
                            disabled={anime.episodes.findIndex(ep => ep.id === selectedEpisode) === anime.episodes.length - 1}
                            className="w-10 h-10 bg-gray-100 dark:bg-[#1a1a1f] rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#252530] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <span className="text-xl">→</span>
                          </button>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-white/60">
                          {anime.studio || 'YakuSub Studio'} 🎵
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Episodes Grid */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Все эпизоды
                    </h3>
                    <div className="relative">
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {anime.episodes.map((episode) => (
                          <div
                            key={episode.id}
                            onClick={() => setSelectedEpisode(episode.id)}
                            className={`group flex-shrink-0 w-[160px] cursor-pointer transition-all ${
                              selectedEpisode === episode.id ? 'ring-2 ring-[#3b82f6] rounded-xl' : ''
                            }`}
                          >
                            <div className="relative aspect-video bg-gray-200 dark:bg-white/5 rounded-xl overflow-hidden mb-2 border border-gray-200 dark:border-white/10">
                              <img
                                src={anime.poster}
                                alt={`Эпизод ${episode.number}`}
                                className="w-full h-full object-cover"
                              />
                              {/* Play Overlay */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <Play className="w-6 h-6 text-white fill-current" />
                                </div>
                              </div>
                              {/* Episode Number Badge */}
                              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                                {episode.number}
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Эпизод {episode.number}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Episode Details */}
                  {selectedEpisode && (
                    <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Информация о серии
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-white/60">Дата выхода</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {anime.createdAt}
                          </span>
                        </div>
                        {anime.episodes.find(ep => ep.id === selectedEpisode)?.duration && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-white/60">Длительность</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {anime.episodes.find(ep => ep.id === selectedEpisode)?.duration}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {anime.episodes.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl">
                      <Tv className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-white/50">
                        Эпизоды еще не добавлены
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="space-y-6">
                  {/* Add Comment */}
                  <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Оставить комментарий
                    </h3>
                    <div className="space-y-3">
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Поделитесь своим мнением об этом аниме..."
                        rows={4}
                        className="bg-white dark:bg-[#0d0d12] resize-none"
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-white/50">
                          Войдите, чтобы оставить комментарий
                        </p>
                        <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                          <Send className="w-4 h-4 mr-2" />
                          Отправить
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {animeComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={comment.userAvatar}
                            alt={comment.userName}
                            className="w-12 h-12 rounded-full flex-shrink-0 ring-2 ring-gray-200 dark:ring-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-bold text-gray-900 dark:text-white">
                                {comment.userName}
                              </h4>
                              <span className="text-xs bg-[#8b5cf6]/20 text-[#8b5cf6] dark:text-[#a78bfa] px-2 py-0.5 rounded font-medium">
                                {comment.userLevel}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-white/50">
                                • {comment.createdAt}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {animeComments.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl">
                        <MessageSquare className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-white/50">
                          Пока нет комментариев. Будьте первым!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Статистика
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10">
                      <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Просмотров</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">11.2K</div>
                    </div>
                    <div className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10">
                      <div className="text-sm text-gray-600 dark:text-white/60 mb-1">В списках</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">2.4K</div>
                    </div>
                    <div className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10">
                      <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Комментариев</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{animeComments.length}</div>
                    </div>
                    <div className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10">
                      <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Эпизодов</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{anime.episodes.length}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
