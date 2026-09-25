'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { User, useFavorites } from '@/context/favorites-context';

export function UserCard({ user }: { user: User }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(user.id);

  return (
    <Link
      href={`/users/${user.id}`}
      className={`group flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card bg-background/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-md hover:shadow-black/5 hover:bg-background dark:border-border/30 dark:bg-card dark:hover:border-foreground/10 dark:hover:shadow-lg dark:hover:shadow-black/20 ${
        favorited ? 'ring-1 ring-red-400/30' : ''
      }`}
    >
      {/* Avatar + info */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar: gradient circle dengan initial - scale on hover */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 via-indigo-400 to-indigo-500 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* User info dengan visual hierarchy */}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground tracking-tight">
            {user.name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>

      {/* Favorite button — tetap ada di dalam card tapi tidak navigasi */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(user);
        }}
        aria-label={favorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-0 transition-all duration-200 ${
          favorited
            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:scale-105'
            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-red-500 hover:scale-105 dark:bg-foreground/5 dark:text-muted-foreground'
        }`}
      >
        <Heart className={`h-4.5 w-4.5 transition-all duration-300 ${favorited ? 'fill-current scale-105' : ''}`} />
      </button>
    </Link>
  );
}
