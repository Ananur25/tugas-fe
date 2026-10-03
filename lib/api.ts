export interface User {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  count?: number;
  message?: string;
}

export interface UsersResponse {
  data: User[];
  count: number;
}

// Base URL for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetch all users with optional search
 */
export async function fetchUsers(search?: string, limit = 100, offset = 0): Promise<UsersResponse> {
  let url = `${API_BASE_URL}/api/users?limit=${limit}&offset=${offset}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

/**
 * Fetch a single user by ID
 */
export async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

/**
 * Create a new user
 */
export async function createUser(user: {
  name: string;
  email: string;
  company?: string | null;
}): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create user');
  }
  return response.json();
}

/**
 * Update a user
 */
export async function updateUser(id: string, updates: Partial<User>): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update user');
  }
  return response.json();
}

/**
 * Delete a user
 */
export async function deleteUser(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete user');
  }
  return response.json();
}

/**
 * Add user to favorites
 */
export async function addToFavorites(userId: string, favoritedBy: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, favoritedBy }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add to favorites');
    console.log(error.error);
  }
  return response.json();
}

/**
 * Remove user from favorites
 */
export async function removeFromFavorites(userId: string, favoritedBy: string): Promise<any> {
  const response = await fetch(
    `${API_BASE_URL}/api/favorites?userId=${userId}&favoritedBy=${favoritedBy}`,
    {
      method: 'DELETE',
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to remove from favorites');
  }
  return response.json();
}

/**
 * Get user favorites
 */
export async function getFavorites(userId: string): Promise<UsersResponse> {
  const response = await fetch(`${API_BASE_URL}/api/favorites?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  return response.json();
}

/**
 * Check if user is favorited
 */
export async function checkFavorite(userId: string, favoritedBy: string): Promise<{ isFavorite: boolean }> {
  const response = await fetch(
    `${API_BASE_URL}/api/favorites?userId=${userId}&favoritedBy=${favoritedBy}`
  );
  return response.json();
}