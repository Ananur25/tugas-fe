'use client';

import { UserCard } from '@/components/user-card';
import { User } from '@/context/favorites-context';

// Data contoh — ganti dengan data dari API/database jika sudah tersedia
const users: User[] = [
  { id: '1', name: 'Andi Saputra', email: 'andi@example.com' },
  { id: '2', name: 'Budi Santoso', email: 'budi@example.com' },
  { id: '3', name: 'Citra Dewi', email: 'citra@example.com' },
  { id: '4', name: 'Dian Permata', email: 'dian@example.com' },
  { id: '5', name: 'Andi Sahara', email: 'andi@example.com' },
  { id: '6', name: 'Budi Sentanu', email: 'budi@example.com' },
  { id: '7', name: 'Citra lestaru', email: 'citra@example.com' },
  { id: '8', name: 'Dian wijaya', email: 'dian@example.com' },
];

export function UserList() {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      {users.map((user, index) => (
        <div
          key={user.id}
          className="animate-in fade-in slide-in-from-top-2 duration-300"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}
