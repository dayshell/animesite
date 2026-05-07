import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface Anime {
  id: string;
  kodikId?: string;
  title: string;
  titleEn?: string;
  description?: string;
  poster?: string;
  year?: number;
  type?: string;
  status?: string;
  episodes?: number;
  rating?: number;
  genres: string[];
  studios: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  animeId: string;
  createdAt: string;
  user?: User;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Studio {
  id: string;
  name: string;
  description?: string;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  logoUrl?: string;
  logoType?: string;
  primaryColor: string;
  secondaryColor: string;
}

interface AdminStore {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Data
  anime: Anime[];
  users: User[];
  comments: Comment[];
  tags: Tag[];
  studios: Studio[];
  siteSettings: SiteSettings;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  
  // Anime
  setAnime: (anime: Anime[]) => void;
  addAnime: (anime: Anime) => void;
  updateAnime: (id: string, data: Partial<Anime>) => void;
  deleteAnime: (id: string) => void;
  getAnime: (id: string) => Anime | undefined;
  getAnimeList: () => Anime[];
  getAnimeByKodikId: (kodikId: string) => Anime | undefined;
  
  // Users
  setUsers: (users: User[]) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUsers: () => User[];
  
  // Comments
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
  
  // Tags
  setTags: (tags: Tag[]) => void;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, data: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  getTags: () => Tag[];
  
  // Studios
  setStudios: (studios: Studio[]) => void;
  addStudio: (studio: Studio) => void;
  updateStudio: (id: string, data: Partial<Studio>) => void;
  deleteStudio: (id: string) => void;
  getStudios: () => Studio[];
  getStudio: (id: string) => Studio | undefined;
  
  // Site Settings
  getSiteSettings: () => SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      anime: [],
      users: [],
      comments: [],
      tags: [],
      studios: [],
      siteSettings: {
        siteName: 'Shiruho Anime',
        siteDescription: 'Смотрите аниме онлайн бесплатно',
        logoType: 'text',
        logoUrl: '',
        primaryColor: '#8b5cf6',
        secondaryColor: '#ec4899',
      },
      
      // Auth actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      
      // Anime actions
      setAnime: (anime) => set({ anime }),
      addAnime: (anime) => set((state) => ({ anime: [...state.anime, anime] })),
      updateAnime: (id, data) => set((state) => ({
        anime: state.anime.map((a) => (a.id === id ? { ...a, ...data } : a))
      })),
      deleteAnime: (id) => set((state) => ({
        anime: state.anime.filter((a) => a.id !== id)
      })),
      getAnime: (id) => get().anime.find((a) => a.id === id),
      getAnimeList: () => get().anime,
      getAnimeByKodikId: (kodikId) => get().anime.find((a) => a.kodikId === kodikId),
      
      // Users actions
      setUsers: (users) => set({ users }),
      updateUser: (id, data) => set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u))
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id)
      })),
      getUsers: () => get().users,
      
      // Comments actions
      setComments: (comments) => set({ comments }),
      addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
      deleteComment: (id) => set((state) => ({
        comments: state.comments.filter((c) => c.id !== id)
      })),
      
      // Tags actions
      setTags: (tags) => set({ tags }),
      addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
      updateTag: (id, data) => set((state) => ({
        tags: state.tags.map((t) => (t.id === id ? { ...t, ...data} : t))
      })),
      deleteTag: (id) => set((state) => ({
        tags: state.tags.filter((t) => t.id !== id)
      })),
      getTags: () => get().tags,
      
      // Studios actions
      setStudios: (studios) => set({ studios }),
      addStudio: (studio) => set((state) => ({ studios: [...state.studios, studio] })),
      updateStudio: (id, data) => set((state) => ({
        studios: state.studios.map((s) => (s.id === id ? { ...s, ...data } : s))
      })),
      deleteStudio: (id) => set((state) => ({
        studios: state.studios.filter((s) => s.id !== id)
      })),
      getStudios: () => get().studios,
      getStudio: (id) => get().studios.find((s) => s.id === id),
      
      // Site Settings actions
      getSiteSettings: () => get().siteSettings,
      updateSiteSettings: (settings) => set((state) => ({
        siteSettings: { ...state.siteSettings, ...settings }
      })),
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        siteSettings: state.siteSettings,
        tags: state.tags,
        studios: state.studios,
        anime: state.anime,
        comments: state.comments,
      }),
    }
  )
);

// Alias for backward compatibility
export const adminStore = useAdminStore;
