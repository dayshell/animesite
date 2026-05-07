import { useState } from "react";
import { Settings, Save, Image, Type } from "lucide-react";
import { Link } from "wouter";
import { useAdminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminSiteSettings() {
  const { toast } = useToast();
  const { getSiteSettings, updateSiteSettings } = useAdminStore();
  const [settings, setSettings] = useState(getSiteSettings());

  const handleSave = () => {
    updateSiteSettings(settings);
    toast({
      title: "Успешно",
      description: "Настройки сайта сохранены"
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d12]">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Настройки сайта
                </h1>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  Управление названием и логотипом
                </p>
              </div>
            </div>
            <Link href="/admin" className="text-sm text-[#3b82f6] hover:text-[#3b82f6]/80 font-medium">
              ← Назад
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Название сайта */}
        <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
              <Type className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Название сайта
            </h3>
          </div>
          <Input
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            placeholder="Название сайта"
            className="bg-white dark:bg-[#0d0d12] h-12 text-lg"
          />
          <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
            Это название будет отображаться в шапке сайта
          </p>
        </div>

        {/* Логотип */}
        <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#8b5cf6]/10 rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Логотип
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-3">
                Тип отображения
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, logoType: 'text' })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.logoType === 'text'
                      ? 'border-[#3b82f6] bg-[#3b82f6]/5'
                      : 'border-gray-200 dark:border-white/10 hover:border-[#3b82f6]/50'
                  }`}
                >
                  <Type className="w-6 h-6 mx-auto mb-2 text-gray-900 dark:text-white" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Только текст
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, logoType: 'logo' })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.logoType === 'logo'
                      ? 'border-[#3b82f6] bg-[#3b82f6]/5'
                      : 'border-gray-200 dark:border-white/10 hover:border-[#3b82f6]/50'
                  }`}
                >
                  <Image className="w-6 h-6 mx-auto mb-2 text-gray-900 dark:text-white" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Только лого
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, logoType: 'both' })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    settings.logoType === 'both'
                      ? 'border-[#3b82f6] bg-[#3b82f6]/5'
                      : 'border-gray-200 dark:border-white/10 hover:border-[#3b82f6]/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Image className="w-5 h-5 text-gray-900 dark:text-white" />
                    <Type className="w-5 h-5 text-gray-900 dark:text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Лого + текст
                  </div>
                </button>
              </div>
            </div>

            {settings.logoType !== 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                  URL логотипа
                </label>
                <Input
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  placeholder="/logo.png или https://example.com/logo.png"
                  className="bg-white dark:bg-[#0d0d12] h-12"
                />
                <p className="text-sm text-gray-600 dark:text-white/60 mt-2">
                  Укажите путь к изображению логотипа
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Предпросмотр */}
        <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Предпросмотр
          </h3>
          <div className="bg-white dark:bg-[#0d0d12] border border-gray-200 dark:border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              {settings.logoType !== 'text' && settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              {settings.logoType !== 'logo' && (
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  {settings.siteName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Кнопка сохранения */}
        <div className="flex gap-3">
          <Button onClick={handleSave} className="flex-1 h-12">
            <Save className="w-5 h-5 mr-2" />
            Сохранить настройки
          </Button>
        </div>
      </div>
    </div>
  );
}
