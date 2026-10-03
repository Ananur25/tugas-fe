'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import {
  fetchUsers,
  addToFavorites as apiAddToFavorites,
  removeFromFavorites as apiRemoveFromFavorites,
  getFavorites,
  deleteUser as apiDeleteUser,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  User as ApiUser,
} from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  avatarUrl?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface FavoritesContextType {
  users: User[];
  favorites: User[];
  isFavorite: (userId: string) => boolean;
  addFavorite: (user: User) => void;
  removeFavorite: (userId: string) => Promise<void>;
  toggleFavorite: (user: User) => Promise<void>;
  isLoading: boolean;
  searchUsers: (query: string) => Promise<User[]>;
  addUser: (user: Omit<User, 'id'>) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<User>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'favorite-users';
const CURRENT_USER_STORAGE_KEY = 'current-user-id';

// Fixed UUID for testing
const FIXED_USER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [favorites, setFavorites] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get or create current user ID
  const getCurrentUserId = useMemo(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (stored) return stored;
      
      const newId = FIXED_USER_ID;
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, newId);
      return newId;
    }
    return FIXED_USER_ID;
  }, []);

  // Load data from API on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const userId = getCurrentUserId;
        
        // Load users from API
        try {
          const usersResponse = await fetchUsers();
          setUsers(usersResponse.data);
        } catch (apiError) {
          console.error('Error loading users:', apiError);
        }
        
        // Load favorites from API
        try {
          const favoritesResponse = await getFavorites(userId);
          setFavorites(favoritesResponse.data);
        } catch (apiError) {
          // Fallback to localStorage
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
              setFavorites(JSON.parse(stored));
            }
          } catch (storageError) {
            console.error('Error loading favorites from storage:', storageError);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoaded(true);
        setIsLoading(false);
      }
    };

    loadData();
  }, [getCurrentUserId]);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites, isLoaded]);

  // Sync with API
  const syncWithAPI = async (user: User, action: 'add' | 'remove') => {
    const userId = getCurrentUserId;
    try {
      if (action === 'add') {
        await apiAddToFavorites(user.id, userId);
      } else {
        await apiRemoveFromFavorites(user.id, userId);
      }
    } catch (error) {
      console.error(`Error ${action}ing favorite to API:`, error);
    }
  };

  const isFavorite = (userId: string) => favorites.some((u) => u.id === userId);

  const addFavorite = (user: User) => {
    if (!isFavorite(user.id)) {
      setFavorites((prev) => [...prev, user]);
      syncWithAPI(user, 'add');
    }
  };

  const removeFavorite = async (userId: string) => {
    const user = favorites.find(u => u.id === userId);
    if (!user) return;
    
    setFavorites((prev) => prev.filter((u) => u.id !== userId));
    await syncWithAPI(user, 'remove');
  };

  const toggleFavorite = async (user: User) => {
    if (isFavorite(user.id)) {
      await removeFavorite(user.id);
    } else {
      addFavorite(user);
    }
  };

  // Search users via API
  const searchUsers = async (query: string): Promise<User[]> => {
    try {
      const response = await fetchUsers(query);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  };

  // Add user
  const addUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    try {
      const response = await apiCreateUser(userData);
      const newUser = response.data;
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  // Update user
  const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
    try {
      const response = await apiUpdateUser(userId, updates);
      const updatedUser = response.data;
      setUsers((prev) => prev.map(u => u.id === userId ? updatedUser : u));
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  // Delete user
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      await apiDeleteUser(userId);
      setUsers((prev) => prev.filter(u => u.id !== userId));
      setFavorites((prev) => prev.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        users,
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isLoading,
        searchUsers,
        addUser,
        deleteUser,
        updateUser,
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