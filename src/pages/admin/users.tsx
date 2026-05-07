import { useState } from "react";
import { Users, Search, Edit, Trash2, Mail, Lock, Trophy, Calendar, MessageSquare, Star, X, Award } from "lucide-react";
import { Link } from "wouter";
import { adminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type ProfileTab = 'overview' | 'comments' | 'achievements';

export default function AdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState(adminStore.getUsers());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [editData, setEditData] = useState({ 
    name: "",
    email: "", 
    password: ""
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(userId);
      setEditData({ 
        name: user.name,
        email: user.email, 
        password: ""
      });
      setEditMode(true);
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      const updateData: any = {};
      if (editData.name) updateData.name = editData.name;
      if (editData.email) updateData.email = editData.email;
      if (editData.password) updateData.password = editData.password;
      
      adminStore.updateUser(selectedUser, updateData);
      setUsers(adminStore.getUsers());
      setEditMode(false);
      setSelectedUser(null);
      toast({
        title: "Успешно",
        description: "Пользователь обновлен"
      });
    }
  };

  const handleDelete = (userId: number) => {
    if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      adminStore.deleteUser(userId);
      setUsers(adminStore.getUsers());
      if (selectedUser === userId) {
        setSelectedUser(null);
        setEditMode(false);
      }
      toast({
        title: "Успешно",
        description: "Пользователь удален"
      });
    }
  };

  const selectedUserData = selectedUser ? users.find(u => u.id === selectedUser) : null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d12]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Управление пользователями
                </h1>
                <p className="text-sm text-gray-600 dark:text-white/60">
                  {filteredUsers.length} из {users.length} пользователей
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/30" />
                  <Input
                    type="text"
                    placeholder="Поиск по имени или email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-white dark:bg-[#0d0d12]"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-white/10 max-h-[calc(100vh-250px)] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 hover:bg-white dark:hover:bg-[#0d0d12] cursor-pointer transition-colors ${
                      selectedUser === user.id ? 'bg-[#3b82f6]/5 dark:bg-[#3b82f6]/10 border-l-4 border-[#3b82f6]' : ''
                    }`}
                    onClick={() => {
                      setSelectedUser(user.id);
                      setEditMode(false);
                      setActiveTab('overview');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full flex-shrink-0 ring-2 ring-gray-200 dark:ring-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-white/60 truncate">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-[#8b5cf6]/20 text-[#8b5cf6] dark:text-[#a78bfa] px-2 py-0.5 rounded font-medium">
                              {user.level}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-white/50">
                              {user.achievements.length} достижений
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(user.id);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user.id);
                          }}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-white/50">
                    {searchQuery ? "Пользователи не найдены" : "Нет пользователей"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Profile Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-[#121218] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden sticky top-24">
              {selectedUserData ? (
                editMode ? (
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Редактировать
                      </h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditMode(false);
                          setEditData({ name: "", email: "", password: "" });
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                        Имя пользователя
                      </label>
                      <Input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="bg-white dark:bg-[#0d0d12]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email
                      </label>
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="bg-white dark:bg-[#0d0d12]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2">
                        <Lock className="w-4 h-4 inline mr-1" />
                        Новый пароль
                      </label>
                      <Input
                        type="password"
                        placeholder="Оставьте пустым, чтобы не менять"
                        value={editData.password}
                        onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                        className="bg-white dark:bg-[#0d0d12]"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        Сохранить
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(false);
                          setEditData({ name: "", email: "", password: "" });
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Profile Header */}
                    <div className="p-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] text-white">
                      <div className="text-center">
                        <img
                          src={selectedUserData.avatar}
                          alt={selectedUserData.name}
                          className="w-24 h-24 rounded-full mx-auto mb-3 ring-4 ring-white/20"
                        />
                        <h3 className="text-xl font-bold mb-1">
                          {selectedUserData.name}
                        </h3>
                        <p className="text-sm text-white/80 mb-2">
                          {selectedUserData.email}
                        </p>
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          {selectedUserData.level}
                        </span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d0d12]">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                          activeTab === 'overview'
                            ? 'text-[#3b82f6] dark:text-[#3b82f6]'
                            : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <Star className="w-4 h-4 inline mr-1" />
                        Обзор
                        {activeTab === 'overview' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab('comments')}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                          activeTab === 'comments'
                            ? 'text-[#3b82f6] dark:text-[#3b82f6]'
                            : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        Комментарии
                        {activeTab === 'comments' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab('achievements')}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                          activeTab === 'achievements'
                            ? 'text-[#3b82f6] dark:text-[#3b82f6]'
                            : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <Trophy className="w-4 h-4 inline mr-1" />
                        Награды
                        {activeTab === 'achievements' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" />
                        )}
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 max-h-[500px] overflow-y-auto">
                      {activeTab === 'overview' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10">
                              <div className="flex items-center gap-2 text-gray-600 dark:text-white/60 mb-1">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-xs">Комментариев</span>
                              </div>
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {selectedUserData.comments.length}
                              </div>
                            </div>
                            <div className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10">
                              <div className="flex items-center gap-2 text-gray-600 dark:text-white/60 mb-1">
                                <Trophy className="w-4 h-4" />
                                <span className="text-xs">Достижений</span>
                              </div>
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {selectedUserData.achievements.length}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10">
                              <div className="flex items-center gap-2 text-gray-600 dark:text-white/60">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">Регистрация</span>
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white text-sm">
                                {selectedUserData.createdAt}
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10">
                              <div className="flex items-center gap-2 text-gray-600 dark:text-white/60">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">ID пользователя</span>
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white text-sm">
                                #{selectedUserData.id}
                              </span>
                            </div>
                          </div>

                          <div className="pt-4 space-y-2">
                            <Button
                              onClick={() => handleEdit(selectedUserData.id)}
                              className="w-full"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Редактировать профиль
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleDelete(selectedUserData.id)}
                              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Удалить пользователя
                            </Button>
                          </div>
                        </div>
                      )}

                      {activeTab === 'comments' && (
                        <div className="space-y-3">
                          {selectedUserData.comments.length > 0 ? (
                            selectedUserData.comments.map((comment) => {
                              const anime = adminStore.getAnime(comment.animeId);
                              return (
                                <div
                                  key={comment.id}
                                  className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10"
                                >
                                  <div className="flex items-start gap-3 mb-2">
                                    <MessageSquare className="w-4 h-4 text-[#3b82f6] mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs text-gray-500 dark:text-white/50 mb-1">
                                        {anime?.title || 'Неизвестное аниме'}
                                      </div>
                                      <p className="text-sm text-gray-900 dark:text-white">
                                        {comment.text}
                                      </p>
                                      <div className="text-xs text-gray-500 dark:text-white/50 mt-2">
                                        {comment.createdAt}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center py-8">
                              <MessageSquare className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                              <p className="text-sm text-gray-500 dark:text-white/50">
                                Пользователь еще не оставлял комментариев
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'achievements' && (
                        <div className="space-y-3">
                          {selectedUserData.achievements.length > 0 ? (
                            selectedUserData.achievements.map((achievementId) => (
                              <div
                                key={achievementId}
                                className="bg-white dark:bg-[#0d0d12] rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-[#3b82f6] dark:hover:border-[#3b82f6] transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Award className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                                      Достижение #{achievementId}
                                    </h4>
                                    <p className="text-xs text-gray-600 dark:text-white/60">
                                      Получено за активность на сайте
                                    </p>
                                  </div>
                                  <Trophy className="w-5 h-5 text-[#fbbf24] flex-shrink-0" />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <Trophy className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                              <p className="text-sm text-gray-500 dark:text-white/50">
                                У пользователя пока нет достижений
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )
              ) : (
                <div className="text-center py-12 p-6">
                  <Users className="w-12 h-12 text-gray-300 dark:text-white/10 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-white/50">
                    Выберите пользователя для просмотра профиля
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
