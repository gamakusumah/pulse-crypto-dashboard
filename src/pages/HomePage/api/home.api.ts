import { httpClient } from '@/services/api';
import { API_CONFIG, PAGINATION } from '@/constants/api';
import { MOCK_INSIGHTS, MOCK_NEWS } from '@/pages/HomePage/api/home.mock';
import type { CategoryDto, GlobalDataDto, MarketCoinDto, TrendingResponseDto } from '@/pages/HomePage/api/home.types';
import type { InsightItem, NewsItem } from '@/pages/HomePage/types';

/**
 * All network calls for the Home feature live in this file only.
 * Components and hooks never import `httpClient` directly — they go
 * through `home.query.ts`, which calls these functions.
 */

export async function fetchGlobalData(): Promise<GlobalDataDto> {
  const { data } = await httpClient.get<GlobalDataDto>('/global');
  return data;
}

export async function fetchTrending(): Promise<TrendingResponseDto> {
  const { data } = await httpClient.get<TrendingResponseDto>('/search/trending');
  return data;
}

export async function fetchCategories(): Promise<CategoryDto[]> {
  const { data } = await httpClient.get<CategoryDto[]>('/coins/categories');
  return data;
}

export interface FetchMarketsParams {
  category?: string | null;
  page?: number;
  perPage?: number;
}

export async function fetchMarkets(params: FetchMarketsParams = {}): Promise<MarketCoinDto[]> {
  const { data } = await httpClient.get<MarketCoinDto[]>('/coins/markets', {
    params: {
      vs_currency: API_CONFIG.DEFAULT_CURRENCY,
      order: 'market_cap_desc',
      per_page: params.perPage ?? PAGINATION.MARKETS_PER_PAGE,
      page: params.page ?? 1,
      sparkline: true,
      price_change_percentage: '1h,24h,7d',
      ...(params.category ? { category: params.category } : {}),
    },
  });
  return data;
}

/**
 * Used to derive Top Gainers/Losers client-side (see
 * `home.mapper.ts`) since the dedicated CoinGecko endpoint requires a
 * paid plan. Fetches a wider unfiltered pool than the table's page
 * size so the ranking is meaningful.
 */
export async function fetchMarketsForRanking(): Promise<MarketCoinDto[]> {
  const { data } = await httpClient.get<MarketCoinDto[]>('/coins/markets', {
    params: {
      vs_currency: API_CONFIG.DEFAULT_CURRENCY,
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h',
    },
  });
  return data;
}

/** No free CoinGecko endpoint exists for this — see `home.mock.ts`. */
export async function fetchNews(): Promise<NewsItem[]> {
  return Promise.resolve(MOCK_NEWS);
}

/** No free CoinGecko endpoint exists for this — see `home.mock.ts`. */
export async function fetchInsights(): Promise<InsightItem[]> {
  return Promise.resolve(MOCK_INSIGHTS);
}
