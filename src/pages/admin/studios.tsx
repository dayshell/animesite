import { useState } from "react";
import { Building2, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { adminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminStudios() {
  const [studios, setStudios] = useState(adminStore.getStudios());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", logo: "" });

  const handleAdd = () => {
    if (formData.name && formData.logo) {
      adminStore.addStudio(formData);
      setStudios(adminStore.getStudios());
      setFormData({ name: "", logo: "" });
      setIsAdding(false);
    }
  };

  const handleEdit = (id: number) => {
    const studio = studios.find(s => s.id === id);
    if (studio) {
      setFormData({ name: studio.name, logo: studio.logo });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.name && formData.logo) {
      adminStore.updateStudio(editingId, formData);
      setStudios(adminStore.getStudios());
      setFormData({ name: "", logo: "" });
      setEditingId(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить эту студию?")) {
      adminStore.deleteStudio(id);
      setStudios(adminStore.getStudios());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d0d12]">
      <header className="bg-white dark:bg-[#121218] border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Управление студиями
            </h1>
            <Link href="/admin" className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80">
              ← Назад к дашборду
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить студию
          </Button>
        </div>

        {(isAdding || editingId !== null) && (
          <div className="bg-white dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {editingId ? "Редактировать студию" : "Новая студия"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                  Название студии
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Например: Studio Ghibli"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                  Логотип (буквы или emoji)
                </label>
                <Input
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="Например: SG или 🎬"
                  maxLength={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={editingId ? handleUpdate : handleAdd}>
                  {editingId ? "Сохранить" : "Добавить"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ name: "", logo: "" });
                  }}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className="bg-white dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#3b82f6] rounded-xl flex items-center justify-center text-white text-xl font-bold">
                    {studio.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {studio.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      ID: {studio.id}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(studio.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(studio.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
