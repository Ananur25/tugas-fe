'use client';

import { UserCard } from '@/components/user-card';
import { User } from '@/context/favorites-context';
import { useSearch } from '@/context/search-context';

// Data contoh — ganti dengan data dari API/database jika sudah tersedia
const users: User[] = [
  { id: '1', name: 'Andi Saputra', email: 'andi@example.com', company: 'PT Maju Kreatif' },
  { id: '2', name: 'Budi Santoso', email: 'budi@example.com', company: 'CV Mandiri Digital' },
  { id: '3', name: 'Citra Dewi', email: 'citra@example.com', company: 'StartUp Lokal' },
  { id: '4', name: 'Dian Permata', email: 'dian@example.com', company: 'Freelance Designer' },
  { id: '5', name: 'Andi Sahara', email: 'andi.sahara@example.com', company: 'Studio Lakon' },
  { id: '6', name: 'Budi Sentanu', email: 'budi.sentanu@example.com', company: 'Agen Penerbangan' },
  { id: '7', name: 'Citra Lestari', email: 'citra.lestari@example.com', company: 'Toko Buku Online' },
  { id: '8', name: 'Dian Wijaya', email: 'dian.wijaya@example.com', company: 'Event Organizer' },
];

export function UserList() {
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
            <UserCard user={user} />
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-4 text-center text-sm text-white/30">
          Tidak ada user yang cocok dengan &quot;{query}&quot;
        </p>
      )}
    </div>
  );
}
