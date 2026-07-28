import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { HOME_PAGE_LIMITS } from '@/constants/api';
import {
  fetchCategories,
  fetchGlobalData,
  fetchInsights,
  fetchMarkets,
  fetchMarketsForRanking,
  fetchNews,
  fetchTrending,
} from '@/features/home/api/home.api';
import {
  deriveTopGainersLosers,
  mapCategory,
  mapGlobalStats,
  mapMarketCoin,
  mapTrendingCoin,
} from '@/features/home/api/home.mapper';

/**
 * Query option factories. Each one owns its query key, fetcher, and
 * DTO -> UI-model mapping, so hooks stay a one-line call to
 * `useQuery(xyzQueryOptions())`.
 */

export function globalQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.home.global(),
    queryFn: async () => mapGlobalStats(await fetchGlobalData()),
  });
}

export function trendingQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.home.trending(),
    queryFn: async () => {
      const response = await fetchTrending();
      return response.coins
        .slice(0, HOME_PAGE_LIMITS.TRENDING_COINS)
        .map((entry) => mapTrendingCoin(entry.item));
    },
  });
}

export function categoriesQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.home.categories(),
    queryFn: async () => {
      const categories = await fetchCategories();
      return categories.slice(0, HOME_PAGE_LIMITS.CATEGORIES).map(mapCategory);
    },
  });
}

export function marketsQueryOptions(params: { category: string | null; page: number }) {
  return queryOptions({
    queryKey: queryKeys.home.markets(params),
    queryFn: async () => {
      const coins = await fetchMarkets({
        category: params.category ?? undefined,
        page: params.page,
      });
      return coins.map(mapMarketCoin);
    },
    placeholderData: (previousData) => previousData,
  });
}

export function topGainersLosersQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.home.topGainersLosers(),
    queryFn: async () => {
      const coins = (await fetchMarketsForRanking()).map(mapMarketCoin);
      return deriveTopGainersLosers(coins, HOME_PAGE_LIMITS.TOP_GAINERS);
    },
  });
}

export function newsQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.home.news(),
    queryFn: fetchNews,
  });
}

export function insightsQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.home.insights(),
    queryFn: fetchInsights,
  });
}
