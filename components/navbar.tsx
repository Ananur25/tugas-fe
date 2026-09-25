'use client';

import { useSearch } from '@/context/search-context';
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const { query, setQuery, clear } = useSearch();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand — text-only, clean */}
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          <svg
            className="h-4 w-4 shrink-0 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="hidden sm:inline">User Manager</span>
        </a>

        {/* Search bar — clean, tersambung ke context */}
        <div className="relative flex-1 max-w-[200px] hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari user..."
            className="w-full rounded-lg border border-border/40 bg-background/50 py-1.5 pl-9 pr-9 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors hover:border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/30 dark:border-border/30 dark:bg-background/30"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>

        {/* Nav tabs — minimal segmented, tanpa decorative glow */}
        <div className="flex items-center gap-0.5 p-0.5">
          <a
            href="/users"
            className="flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-foreground/[0.06]"
          >
            <Users className="h-4 w-4 shrink-0" />
            Users
          </a>
          <a
            href="/favorites"
            className="flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-foreground/[0.06]"
          >
            <Heart className="h-4 w-4 shrink-0" />
            Favorites
          </a>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-foreground/8">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

// Ikon manual supaya nggak perlu lucide-react untuk brand
function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
