/**
 * Central place for API-related constants. Values that could change
 * per environment (base URL) come from `import.meta.env`; everything
 * else is a fixed contract the app relies on.
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  TIMEOUT_MS: 15_000,
  DEFAULT_CURRENCY: 'usd',
} as const;

export const PAGINATION = {
  MARKETS_PER_PAGE: 20,
  MARKETS_MAX_PAGE: 10,
} as const;

export const HOME_PAGE_LIMITS = {
  TRENDING_COINS: 7,
  TOP_GAINERS: 5,
  TOP_LOSERS: 5,
  CATEGORIES: 10,
  NEWS: 6,
  INSIGHTS: 4,
} as const;
