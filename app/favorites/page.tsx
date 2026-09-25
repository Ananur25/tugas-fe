'use client';

import Link from 'next/link';
import { UserCard } from '@/components/user-card';
import { useFavorites } from '@/context/favorites-context';
import { Heart } from 'lucide-react';

export default function Favorite() {
  const { favorites } = useFavorites();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl">
            Favorit
            <Heart className="h-6 w-6 text-red-500" />
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            User yang kamu tandai sebagai favorit — klik untuk detail
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent dark:via-foreground/5" />

        {/* Content area */}
        <div className="flex flex-1 flex-col">
          {favorites.length === 0 ? (
            /* Empty state — elegan, bukan cuma teks polos */
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/40 bg-muted/30 p-10 text-center shadow-sm dark:bg-foreground/[0.02]">
              {/* Icon container */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 shadow-sm shadow-red-200/50 dark:from-red-900/30 dark:to-red-800/30 dark:shadow-none">
                <Heart className="h-7 w-7 text-red-500" />
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Belum ada favorit
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tambahkan user favorit dari halaman{' '}
                  <Link
                    href="/users"
                    className="font-medium text-violet-500 transition-colors hover:text-violet-600 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
                  >
                    Users
                  </Link>
                  .
                </p>
              </div>

              {/* Decorative dot grid */}
              <div className="mt-4 flex items-center gap-1.5">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full bg-muted-foreground/20 dark:bg-muted-foreground/10"
                    style={{
                      width: i % 2 === 0 ? '8px' : '4px',
                      opacity: 0.3 + i * 0.08,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Favorites — tampilan card yang rapi */
            <div>
              <div
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                style={{ maxWidth: '600px', margin: '0 auto' }}
              >
                {favorites.map((user, index) => (
                  <div
                    key={user.id}
                    className="animate-in fade-in slide-in-from-top-2 duration-300"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <UserCard user={user} />
                  </div>
                ))}
              </div>

              {/* Count badge di bottom */}
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground dark:bg-foreground/[0.02]">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                {favorites.length} favorit
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
