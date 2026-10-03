'use client';

import { UserCard } from '@/components/user-card';
import { useFavorites } from '@/context/favorites-context';
import { useSearch } from '@/context/search-context';

export function UserList() {
  const { users, isFavorite, toggleFavorite } = useFavorites();
  const { query } = useSearch();
  const q = query.toLowerCase().trim();

  const filtered = q
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.company && u.company.toLowerCase().includes(q))
      )
    : users;

  return (
    <div>
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        {filtered.map((user, index) => (
          <div
            key={user.id}
            className="animate-in fade-in slide-in-from-top-2 duration-300"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <UserCard 
              user={user} 
              isFavorited={isFavorite(user.id)} 
              onToggle={toggleFavorite} 
            />
          </div>
        ))}
      </div>
      {filtered.length === 0 && users.length > 0 && (
        <p className="mt-4 text-center text-sm text-white/30">
          Tidak ada user yang cocok dengan &quot;{query}&quot;
        </p>
      )}
    </div>
  );
}