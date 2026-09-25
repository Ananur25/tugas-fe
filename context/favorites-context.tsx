'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface FavoritesContextType {
  favorites: User[];
  isFavorite: (userId: string) => boolean;
  addFavorite: (user: User) => void;
  removeFavorite: (userId: string) => void;
  toggleFavorite: (user: User) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'favorite-users';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Muat data favorit dari localStorage saat pertama kali render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Gagal memuat data favorit:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Simpan setiap kali favorites berubah (setelah data awal dimuat)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Gagal menyimpan data favorit:', error);
    }
  }, [favorites, isLoaded]);

  const isFavorite = (userId: string) => favorites.some((u) => u.id === userId);

  const addFavorite = (user: User) => {
    setFavorites((prev) =>
      prev.some((u) => u.id === user.id) ? prev : [...prev, user]
    );
  };

  const removeFavorite = (userId: string) => {
    setFavorites((prev) => prev.filter((u) => u.id !== userId));
  };

  const toggleFavorite = (user: User) => {
    setFavorites((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites harus dipakai di dalam FavoritesProvider');
  }
  return context;
}
