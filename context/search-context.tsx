'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  clear: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');

  const clear = useCallback(() => setQuery(''), []);

  return (
    <SearchContext.Provider value={{ query, setQuery, clear }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch harus dipakai di dalam SearchProvider');
  return ctx;
}
