import { useRef, useEffect } from "react";
import { Crown, Trophy, Users } from "lucide-react";
import { Link } from "wouter";

interface EcosystemDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { 
    icon: Crown, 
    label: "Топ пользователей", 
    description: "Лучшие пользователи по активности",
    href: "/users-rating",
    color: "text-yellow-500"
  },
  { 
    icon: Trophy, 
    label: "Рейтинг достижений", 
    description: "Сравнивай достижения по редкости",
    href: "/achievements",
    color: "text-purple-500"
  },
  { 
    icon: Users, 
    label: "Сообщество", 
    description: "Гильдии и группы пользователей",
    href: "/community",
    color: "text-blue-500"
  }
];

export function EcosystemDropdown({ isOpen, onClose }: EcosystemDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-[320px] bg-white dark:bg-[#0d0d12] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="p-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={onClose}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className={`w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-colors`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-0.5">
                {item.label}
              </h4>
              <p className="text-xs text-gray-500 dark:text-white/50">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
