import { UserList } from '@/components/user-list';

export default function UsersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-12">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl">
            Daftar User
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Klik card user untuk melihat detailnya
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent dark:via-foreground/5" />

        {/* User list sebagai grid card */}
        <div className="flex flex-1 flex-col">
          <UserList />
        </div>

        {/* Footer count */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          8 user tersedia
        </div>
      </main>
    </div>
  );
}
