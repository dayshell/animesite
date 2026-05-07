import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FaVk, FaTelegram, FaGoogle, FaDiscord, FaTwitch } from "react-icons/fa";
import { SiSteam } from "react-icons/si";
import { useAdminStore } from "@/lib/admin-store";
import { toast } from "sonner";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { setUser, setToken } = useAdminStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const body = isRegister 
        ? { email, username, password }
        : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка авторизации');
      }

      // Сохраняем пользователя и токен
      setUser(data.user);
      setToken(data.token);
      
      toast.success(isRegister ? 'Регистрация успешна!' : 'Вход выполнен!');
      onOpenChange(false);
      
      // Очищаем форму
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const socialLogins = [
    { icon: FaVk, color: "#0077FF", name: "VK" },
    { icon: FaTelegram, color: "#26A5E4", name: "Telegram" },
    { icon: SiSteam, color: "#171A21", name: "Steam" },
    { icon: FaGoogle, color: "#4285F4", name: "Google" },
    { icon: FaDiscord, color: "#5865F2", name: "Discord" },
    { icon: FaTwitch, color: "#9146FF", name: "Twitch" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#0d0d12] border border-white/10 text-white p-8">
        <DialogHeader className="space-y-3 text-center">
          <DialogTitle className="text-3xl font-bold text-white">
            {isRegister ? 'Создать аккаунт' : 'Войти в аккаунт'}
          </DialogTitle>
          <p className="text-white/50 text-base">
            {isRegister 
              ? 'Заполни данные для регистрации' 
              : 'Напиши почту, на которой создавал аккаунт'}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Input
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 bg-[#1a1a1f] border-white/10 text-white placeholder:text-white/30 rounded-xl text-base focus-visible:ring-[#3b82f6] focus-visible:ring-2 focus-visible:border-transparent"
            />
          </div>

          {isRegister && (
            <div>
              <Input
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-14 bg-[#1a1a1f] border-white/10 text-white placeholder:text-white/30 rounded-xl text-base focus-visible:ring-[#3b82f6] focus-visible:ring-2 focus-visible:border-transparent"
              />
            </div>
          )}

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="h-14 bg-[#1a1a1f] border-white/10 text-white placeholder:text-white/30 rounded-xl text-base pr-12 focus-visible:ring-[#3b82f6] focus-visible:ring-2 focus-visible:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white font-medium rounded-xl text-base disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
          </Button>

          <div className="text-center">
            <span className="text-white/50">
              {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
            </span>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#3b82f6] hover:text-[#3b82f6]/80 font-medium transition-colors"
            >
              {isRegister ? 'Войди!' : 'Создай его!'}
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0d0d12] text-white/50">
                или войди через
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {socialLogins.map((social, index) => (
              <button
                key={index}
                type="button"
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                style={{ backgroundColor: social.color }}
                title={social.name}
              >
                <social.icon className="w-7 h-7 text-white" />
              </button>
            ))}
          </div>

          {!isRegister && (
            <div className="text-center pt-2">
              <button
                type="button"
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Восстановить пароль
              </button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
