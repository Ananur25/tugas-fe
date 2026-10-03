'use client';

import { UserCard } from '@/components/user-card';
import { useFavorites, User } from '@/context/favorites-context';
import { useSearch } from '@/context/search-context';
import { Heart, Loader } from 'lucide-react';

export default function Favorite() {
  const { users, favorites, isFavorite, toggleFavorite, isLoading } = useFavorites();
  const { query } = useSearch();
  const q = query.toLowerCase().trim();

  const filteredFavorites = q
    ? favorites.filter(
        (u: User) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.company && u.company.toLowerCase().includes(q))
      )
    : favorites;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-950 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-white/40" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-950">
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
          <div className="mb-8">
            <h1 className="flex items-center gap-2 text-3xl font-heading font-semibold tracking-tight text-white sm:text-4xl">
              Favourites
              <Heart className="h-6 w-6 text-red-400" />
            </h1>
            <p className="mt-2 text-sm text-white/40">
              User yang kamu tandai sebagai favourites — klik untuk detail
            </p>
          </div>

          <div className="mb-6 h-px w-full bg-white/5" />

          <div className="flex flex-1 flex-col">
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/5 bg-neutral-900/50 p-10 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 shadow-inner">
                <Heart className="h-7 w-7 text-red-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-white/80">
                  Belum ada favourites
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Tambahkan user favourit dari halaman{' '}
                  <a
                    href="/users"
                    className="font-medium text-red-400/80 transition-colors hover:text-red-300"
                  >
                    Users
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-heading font-semibold tracking-tight text-white sm:text-4xl">
            Favourites
            <Heart className="h-6 w-6 text-red-400" />
          </h1>
          <p className="mt-2 text-sm text-white/40">
            User yang kamu tandai sebagai favourites — klik untuk detail
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-white/5" />

        {/* Content area */}
        <div className="flex flex-1 flex-col">
          <div>
            <div
              className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
              style={{ maxWidth: '1000px', margin: '0 auto' }}
            >
              {filteredFavorites.length > 0 &&
                filteredFavorites.map((user: User, index: number) => (
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

            {filteredFavorites.length === 0 && favorites.length > 0 && (
              <p className="mt-4 text-center text-sm text-white/30">
                Tidak ada favourites yang cocok dengan &quot;{query}&quot;
              </p>
            )}
          </div>

          {/* Count badge di bottom */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            {favorites.length} favourites
          </div>
        </div>
      </main>
    </div>
  );
}