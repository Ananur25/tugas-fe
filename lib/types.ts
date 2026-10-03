// Base types
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

// API response types
export interface ApiResponse<T> {
  data: T;
  count?: number;
  message?: string;
}

export interface UsersResponse {
  data: User[];
  count: number;
}

// Create/Update user types
export interface UserCreate {
  name: string;
  email: string;
  company?: string | null;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  company?: string | null;
  is_active?: boolean;
}

// Database entity types (can have different types)
export interface UserEntity {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  avatar_url?: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface FavoriteEntity {
  id: string;
  user_id: string;
  favorited_by: string;
  created_at: string;
}