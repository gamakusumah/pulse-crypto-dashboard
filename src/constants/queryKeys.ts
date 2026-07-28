/**
 * Query key factory. Keeping keys in one typed place avoids typos and
 * makes cache invalidation / refetching predictable across features.
 */
export const queryKeys = {
  home: {
    all: ['home'] as const,
    global: () => [...queryKeys.home.all, 'global'] as const,
    trending: () => [...queryKeys.home.all, 'trending'] as const,
    topGainersLosers: () => [...queryKeys.home.all, 'top-gainers-losers'] as const,
    categories: () => [...queryKeys.home.all, 'categories'] as const,
    markets: (params: { category: string | null; page: number }) =>
      [...queryKeys.home.all, 'markets', params] as const,
    news: () => [...queryKeys.home.all, 'news'] as const,
    insights: () => [...queryKeys.home.all, 'insights'] as const,
  },
} as const;
