'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/users');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Redirecting...
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Loading users...
        </p>
      </div>
    </div>
  );
}