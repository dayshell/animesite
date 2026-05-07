import { useState } from "react";
import { Users, Search, Edit, Trash2, Mail, Calendar, X } from "lucide-react";
import { Link } from "wouter";
import { useAdminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const { toast } = useToast();
  const { users, updateUser, deleteUser } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ 
    username: "",
    email: "", 
  });

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(userId);
      setEditData({ 
        username: user.username,
        email: user.email,
      });
      setEditMode(true);
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      const updateData: any = {};
      if (editData.username) updateData.username = editData.username;
      if (editData.email) updateData.email = editData.email;
      
      updateUser(selectedUser, updateData);
      setEditMode(false);
      setSelectedUser(null);
      toast({
        title: "Успешно",
        description: "Пользователь обновлен"
      });
    }
  };

  const handleDelete = (userId: string) => {
    if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      deleteUser(userId);
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
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/90 flex-shrink-0">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate">
                            {user.username}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-white/60 truncate">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                              user.role === 'ADMIN' 
                                ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' 
                                : 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                            }`}>
                              {user.role}
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
                          setEditData({ username: "", email: "" });
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
                        value={editData.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
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

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        Сохранить
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(false);
                          setEditData({ username: "", email: "" });
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
                        <div className="w-24 h-24 rounded-full mx-auto mb-3 ring-4 ring-white/20 flex items-center justify-center text-3xl font-black bg-white/20">
                          {selectedUserData.username.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-xl font-bold mb-1">
                          {selectedUserData.username}
                        </h3>
                        <p className="text-sm text-white/80 mb-2">
                          {selectedUserData.email}
                        </p>
                        <span className={`inline-block backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium ${
                          selectedUserData.role === 'ADMIN' 
                            ? 'bg-purple-500/30' 
                            : 'bg-white/20'
                        }`}>
                          {selectedUserData.role}
                        </span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-white/60">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Регистрация</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {new Date(selectedUserData.createdAt).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-white/60">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">ID пользователя</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[150px]">
                            {selectedUserData.id.slice(0, 8)}...
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
