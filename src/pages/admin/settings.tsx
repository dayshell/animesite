import { useState } from "react";
import { Settings, Tags, Building2, Plus, Trash2, Edit } from "lucide-react";
import { Link } from "wouter";
import { useAdminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSettings() {
  const { tags, studios, getTags, getStudios, addTag, deleteTag, addStudio, updateStudio, deleteStudio } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'tags' | 'studios'>('tags');
  const [activeCategory, setActiveCategory] = useState<'cast' | 'traits' | 'setting'>('cast');
  
  // Tags state
  const [newTagName, setNewTagName] = useState("");
  
  // Studios state
  const [isAddingStudio, setIsAddingStudio] = useState(false);
  const [editingStudioId, setEditingStudioId] = useState<string | null>(null);
  const [studioFormData, setStudioFormData] = useState({ name: "", description: "" });

  const categories = [
    { id: 'cast' as const, label: 'Основной каст', icon: '👥' },
    { id: 'traits' as const, label: 'Черты', icon: '⭐' },
    { id: 'setting' as const, label: 'Сеттинг', icon: '🌍' }
  ];

  const filteredTags = tags.filter(tag => tag.name.toLowerCase().includes(''));

  // Tag handlers
  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag({ id: Date.now().toString(), name: newTagName.trim(), color: '#3b82f6' });
      setNewTagName("");
    }
  };

  const handleDeleteTag = (id: string) => {
    if (confirm("Удалить этот тег?")) {
      deleteTag(id);
    }
  };

  // Studio handlers
  const handleAddStudio = () => {
    if (studioFormData.name) {
      addStudio({ id: Date.now().toString(), name: studioFormData.name, description: studioFormData.description });
      setStudioFormData({ name: "", description: "" });
      setIsAddingStudio(false);
    }
  };

  const handleEditStudio = (id: string) => {
    const studio = studios.find(s => s.id === id);
    if (studio) {
      setStudioFormData({ name: studio.name, description: studio.description || "" });
      setEditingStudioId(id);
    }
  };

  const handleUpdateStudio = () => {
    if (editingStudioId && studioFormData.name) {
      updateStudio(editingStudioId, studioFormData);
      setStudioFormData({ name: "", description: "" });
      setEditingStudioId(null);
    }
  };

  const handleDeleteStudio = (id: string) => {
    if (confirm("Удалить эту студию?")) {
      deleteStudio(id);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d12]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Настройки контента
                </h1>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Управление тегами, категориями и студиями
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
        {/* Main Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab('tags')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'tags'
                ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20'
                : 'bg-gray-100 dark:bg-[#121218] text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-[#16161e]'
            }`}
          >
            <Tags className="w-5 h-5" />
            Теги и категории
          </button>
          <button
            onClick={() => setActiveTab('studios')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'studios'
                ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20'
                : 'bg-gray-100 dark:bg-[#121218] text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-[#16161e]'
            }`}
          >
            <Building2 className="w-5 h-5" />
            Студии
          </button>
        </div>

        {/* Tags Section */}
        {activeTab === 'tags' && (
          <div className="space-y-6">
            {/* Category Pills */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#3b82f6] text-white'
                      : 'bg-gray-100 dark:bg-[#121218] text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-[#16161e] border border-gray-200 dark:border-white/10'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Add Tag Form */}
            <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Добавить тег в "{categories.find(c => c.id === activeCategory)?.label}"
              </h3>
              <div className="flex gap-3">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Название тега..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 h-12 bg-white dark:bg-[#0d0d12]"
                />
                <Button onClick={handleAddTag} disabled={!newTagName.trim()} className="h-12 px-6">
                  <Plus className="w-5 h-5 mr-2" />
                  Добавить
                </Button>
              </div>
            </div>

            {/* Tags Grid */}
            <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Теги ({filteredTags.length})
                </h3>
              </div>
              
              {filteredTags.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="group flex items-center justify-between p-4 bg-white dark:bg-[#0d0d12] rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-all"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {tag.name}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTag(tag.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Tags className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-white/50">
                    В этой категории пока нет тегов
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Studios Section */}
        {activeTab === 'studios' && (
          <div className="space-y-6">
            {/* Add Studio Button */}
            <div>
              <Button 
                onClick={() => setIsAddingStudio(true)} 
                disabled={isAddingStudio || editingStudioId !== null}
                className="h-12 px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Добавить студию
              </Button>
            </div>

            {/* Add/Edit Studio Form */}
            {(isAddingStudio || editingStudioId !== null) && (
              <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {editingStudioId ? "Редактировать студию" : "Новая студия"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Название студии
                    </label>
                    <Input
                      value={studioFormData.name}
                      onChange={(e) => setStudioFormData({ ...studioFormData, name: e.target.value })}
                      placeholder="Например: Studio Ghibli"
                      className="h-12 bg-white dark:bg-[#0d0d12]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                      Описание (опционально)
                    </label>
                    <Input
                      value={studioFormData.description}
                      onChange={(e) => setStudioFormData({ ...studioFormData, description: e.target.value })}
                      placeholder="Краткое описание студии"
                      className="h-12 bg-white dark:bg-[#0d0d12]"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={editingStudioId ? handleUpdateStudio : handleAddStudio} className="h-12">
                      {editingStudioId ? "Сохранить" : "Добавить"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingStudio(false);
                        setEditingStudioId(null);
                        setStudioFormData({ name: "", description: "" });
                      }}
                      className="h-12"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Studios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studios.map((studio) => (
                <div
                  key={studio.id}
                  className="group bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {studio.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditStudio(studio.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteStudio(studio.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {studio.name}
                  </h3>
                  {studio.description && (
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      {studio.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {studios.length === 0 && (
              <div className="text-center py-12 bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl">
                <Building2 className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-white/50">
                  Студии еще не добавлены
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
