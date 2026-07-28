import type { ReactNode } from 'react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { QueryProvider } from '@/app/providers/QueryProvider';

/**
 * Single composition root for global providers. `main.tsx` only needs
 * to import this one component, so adding a new provider later never
 * requires touching the bootstrap file.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
