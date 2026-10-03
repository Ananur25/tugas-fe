'use client';

import { Heart, Mail, Building2, ArrowLeft, Loader } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFavorites, User } from '@/context/favorites-context';

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }): React.ReactElement {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    params.then((params) => {
      setId(params.id);
    });
  }, [params]);

  useEffect(() => {
    if (!id) return;
    
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.replace('/users');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-950 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-white/40" />
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const favorited = isFavorite(user.id);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        {/* Back link */}
        <Link
          href="/users"
          className="mb-6 flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Users
        </Link>

        {/* Profile card */}
        <div className="flex flex-col gap-3">
          {/* Card utama */}
          <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-neutral-900/95 p-6 shadow-lg backdrop-blur-sm">
            {/* Header: avatar + info */}
            <div className="flex items-start gap-4">
              {/* Avatar: circular dark */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-2xl font-semibold tracking-wide text-white/80 shadow-inner">
                {initials}
              </div>

              {/* User info */}
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-semibold text-white/90">
                  {user.name}
                </h1>
                <p className="text-sm text-white/40">{user.email}</p>
                {user.company && (
                  <p className="text-sm text-white/30 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="h-3 w-3 shrink-0" />
                    {user.company}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="my-1 h-px w-full bg-white/5" />

            {/* Footer: two pill buttons */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white">
                View Profile
              </span>

              <button
                onClick={() => toggleFavorite(user)}
                aria-label={favorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                className={`inline-flex h-9 w-28 items-center justify-center rounded-full bg-white/10 px-3 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/15 ${
                  favorited ? 'text-red-400 hover:bg-red-500/10' : ''
                }`}
              >
                <Heart className={`mr-1.5 h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
                Favourite
              </button>
            </div>
          </div>

          {/* Info section */}
          <div className="rounded-xl border border-white/5 bg-neutral-900/95 p-5 shadow-sm">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
              Informasi
            </h2>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-3">
                <Mail className="h-4 w-4 shrink-0 text-white/30" />
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-sm text-white/80">{user.email}</p>
                </div>
              </div>

              {user.company && (
                <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-3">
                  <Building2 className="h-4 w-4 shrink-0 text-white/30" />
                  <div>
                    <p className="text-xs text-white/40">Perusahaan</p>
                    <p className="text-sm text-white/80">{user.company}</p>
                  </div>
                </div>
              )}

              <div className="mt-1 rounded-lg bg-white/[0.03] p-3 text-center text-xs text-white/30">
                Kontak dan detail lainnya akan muncul di sini.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}