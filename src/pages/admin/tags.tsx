import { useState } from "react";
import { Tags, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { adminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminTags() {
  const [tags, setTags] = useState(adminStore.getTags());
  const [activeCategory, setActiveCategory] = useState<'cast' | 'traits' | 'setting'>('cast');
  const [newTagName, setNewTagName] = useState("");

  const categories = [
    { id: 'cast' as const, label: 'Основной каст' },
    { id: 'traits' as const, label: 'Черты' },
    { id: 'setting' as const, label: 'Сеттинг' }
  ];

  const filteredTags = tags.filter(tag => tag.category === activeCategory);

  const handleAdd = () => {
    if (newTagName.trim()) {
      adminStore.addTag({ name: newTagName.trim(), category: activeCategory });
      setTags(adminStore.getTags());
      setNewTagName("");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этот тег?")) {
      adminStore.deleteTag(id);
      setTags(adminStore.getTags());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d0d12]">
      <header className="bg-white dark:bg-[#121218] border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Управление тегами и категориями
            </h1>
            <Link href="/admin" className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80">
              ← Назад к дашборду
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#3b82f6] text-white'
                  : 'bg-white dark:bg-[#121218] text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Add New Tag */}
        <div className="bg-white dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Добавить новый тег в категорию "{categories.find(c => c.id === activeCategory)?.label}"
          </h3>
          <div className="flex gap-3">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Название тега..."
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1"
            />
            <Button onClick={handleAdd} disabled={!newTagName.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить
            </Button>
          </div>
        </div>

        {/* Tags List */}
        <div className="bg-white dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Теги категории "{categories.find(c => c.id === activeCategory)?.label}"
          </h3>
          
          {filteredTags.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {tag.name}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(tag.id)}
                    className="text-red-600 hover:text-red-700"
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
    </div>
  );
}
