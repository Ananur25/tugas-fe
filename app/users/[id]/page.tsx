import { notFound } from 'next/navigation';
import { Heart, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/context/favorites-context';

// Data user statis — nanti bisa diganti pake API
const users: Record<string, { id: string; name: string; email: string }> = {
  '1': { id: '1', name: 'Andi Saputra', email: 'andi@example.com' },
  '2': { id: '2', name: 'Budi Santoso', email: 'budi@example.com' },
  '3': { id: '3', name: 'Citra Dewi', email: 'citra@example.com' },
  '4': { id: '4', name: 'Dian Permata', email: 'dian@example.com' },
};

export async function generateStaticParams() {
  return Object.keys(users).map((id) => ({ id }));
}

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = users[id];

  if (!user) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        {/* Back link */}
        <Link
          href="/users"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
        >
          <User className="h-4 w-4" />
          Kembali ke Users
        </Link>

        {/* Profile card */}
        <div className="flex flex-col gap-6">
          {/* Avatar section — big card style */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card p-8 shadow-sm dark:border-border/30 dark:bg-card">
            {/* Avatar — gradient circle besar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 via-indigo-400 to-indigo-500 text-3xl font-bold text-white shadow-lg shadow-indigo-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-2xl font-heading font-semibold tracking-tight text-foreground">
              {user.name}
            </h1>

            {/* Badge: apakah favorit? */}
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground dark:bg-foreground/[0.04]">
              <Heart className="h-3 w-3 text-red-500" />
              {(() => {
                // CEK FAVORIT — tapi nanti kalau pakai server component perlu cara lain
                // Untungnya ini client-side context, nanti kita wrap
                return 'Status favorit';
              })()}
            </div>
          </div>

          {/* Info section */}
          <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm dark:border-border/30 dark:bg-card">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Informasi
            </h2>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/50 p-3 dark:border-border/20">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user.email}</p>
                </div>
              </div>

              {/* Action: Tambah/Remove Favorit — nanti akan diaktifkan setelah kita bikin client wrapper */}
              <div className="mt-2 rounded-lg border border-border/40 bg-muted/30 p-3 text-center text-xs text-muted-foreground dark:bg-foreground/[0.02]">
                Kontak dan detail lainnya akan muncul di sini.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
