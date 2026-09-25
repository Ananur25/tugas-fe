import { FavoritesProvider } from '@/context/favorites-context';
import { SearchProvider } from '@/context/search-context';
import { Navbar } from '@/components/navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id' suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SearchProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
          </FavoritesProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
