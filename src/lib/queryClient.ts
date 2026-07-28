import { QueryClient } from '@tanstack/react-query';

/**
 * Global QueryClient defaults. Individual queries can still override
 * these per-call, but this is the sane baseline for market data that
 * changes on the order of seconds to minutes, not milliseconds.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
