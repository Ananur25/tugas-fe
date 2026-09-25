'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Heart, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const links = [
  { href: '/users', label: 'Users', icon: Users },
  { href: '/favorites', label: 'Favorites', icon: Heart },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='sticky top-0 z-50 border-b border-border/60'>
      <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6'>
        {/* Brand — text-only, clean */}
        <Link
          href='/'
          className='flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors'
        >
          <Users className='h-4 w-4 shrink-0 text-primary' />
          <span className='hidden sm:inline'>User Manager</span>
        </Link>

        {/* Search bar — clean, tanpa decorative dot */}
        <div className="relative flex-1 max-w-[500px] hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari user..."
            className="w-full rounded-lg border border-border/40 bg-background/50 py-1.5 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors hover:border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/30 dark:border-border/30 dark:bg-background/30"
          />
        </div>

        {/* Theme toggle */}

        {/* Nav tabs — minimal segmented, tanpa decorative glow */}
        <div className='flex items-center gap-0.5 p-0.5'>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-background text-primary shadow-sm dark:bg-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-foreground/[0.06]'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active
                      ? 'text-primary'
                      : 'opacity-50 group-hover:opacity-100'
                  }`}
                />
                {label}
              </Link>
            );
          })}
        </div>

        <div className='flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-foreground/8'>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
