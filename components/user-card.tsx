'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { User } from '@/context/favorites-context';

interface UserCardProps {
  user: User;
  isFavorited?: boolean;
  onToggle?: (user: User) => void;
}

export function UserCard({ user, isFavorited = false, onToggle }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggle) {
      onToggle(user);
    }
  };

  return (
    <Link
      href={`/users/${user.id}`}
      className="group block rounded-xl border border-white/5 bg-neutral-900/95 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-white/10 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5"
    >
      {/* Header: avatar + info */}
      <div className="flex items-start gap-4">
        {/* Avatar: circular dark */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-sm font-semibold tracking-wide text-white/80 shadow-inner">
          {initials}
        </div>

        {/* User info */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white/90">
            {user.name}
          </h3>
          <p className="truncate text-xs text-white/40">{user.email}</p>
          {user.company && (
            <p className="truncate text-xs text-white/30">{user.company}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-3 h-px w-full bg-white/5" />

      {/* Footer: two pill buttons */}
      <div className="flex items-center gap-2">
        {/* View Profile button */}
        <span className="inline-flex h-8 flex-1 items-center justify-center rounded-full bg-white/10 px-4 text-xs font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white">
          View Profile
        </span>

        {/* Favourite button */}
        <button
          onClick={handleToggle}
          aria-label={isFavorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          className={`inline-flex h-8 w-24 items-center justify-center rounded-full border-0 bg-white/10 px-3 text-xs font-medium text-white/80 transition-all duration-200 hover:bg-white/15 ${
            isFavorited ? 'text-red-400 hover:bg-red-500/10' : ''
          }`}
        >
          <Heart className={`mr-1.5 h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          Favourite
        </button>
      </div>
    </Link>
  );
}