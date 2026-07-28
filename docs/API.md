# API Reference

All endpoints are called against `VITE_API_URL` (default:
`https://api.coingecko.com/api/v3`). This document covers the Home Page's
data contracts: input, output (DTO), mapper, and the query that ties them
together.

---

## `GET /global`

**Used by:** Global Market Overview

| | |
|---|---|
| API function | `fetchGlobalData()` in `home.api.ts` |
| Input | none |
| Output DTO | `GlobalDataDto` — `{ data: { total_market_cap, total_volume, market_cap_percentage, market_cap_change_percentage_24h_usd, ... } }` |
| Mapper | `mapGlobalStats()` → `GlobalMarketStats { totalMarketCapUsd, totalVolumeUsd, marketCapChangePercentage24h, btcDominance, ethDominance }` |
| Query | `globalQueryOptions()`, key: `queryKeys.home.global()` |
| Hook | `useGlobal()` |

---

## `GET /search/trending`

**Used by:** Trending card

| | |
|---|---|
| API function | `fetchTrending()` |
| Input | none |
| Output DTO | `TrendingResponseDto` — `{ coins: [{ item: TrendingCoinItemDto }] }` |
| Mapper | `mapTrendingCoin()` applied to each `item`, sliced to `HOME_PAGE_LIMITS.TRENDING_COINS` (7) → `TrendingCoin[]` |
| Query | `trendingQueryOptions()`, key: `queryKeys.home.trending()` |
| Hook | `useTrending()` |

---

## `GET /coins/categories`

**Used by:** Category Tabs

| | |
|---|---|
| API function | `fetchCategories()` |
| Input | none |
| Output DTO | `CategoryDto[]` — `{ id, name, market_cap, market_cap_change_24h, top_3_coins, ... }[]` |
| Mapper | `mapCategory()`, sliced to `HOME_PAGE_LIMITS.CATEGORIES` (10) → `MarketCategory[]` |
| Query | `categoriesQueryOptions()`, key: `queryKeys.home.categories()` |
| Hook | `useCategories()` |

---

## `GET /coins/markets`

**Used by:** Coin Table

| | |
|---|---|
| API function | `fetchMarkets({ category, page, perPage })` |
| Input (query params) | `vs_currency=usd`, `order=market_cap_desc`, `per_page=20`, `page`, `sparkline=true`, `price_change_percentage=1h,24h,7d`, optional `category` |
| Output DTO | `MarketCoinDto[]` — includes `current_price`, `market_cap`, `sparkline_in_7d.price[]`, per-window `price_change_percentage_*_in_currency` |
| Mapper | `mapMarketCoin()` → `MarketCoin[]` (flattened, camelCase, `null`-safe) |
| Query | `marketsQueryOptions({ category, page })`, key: `queryKeys.home.markets({ category, page })`; uses `placeholderData` to keep the previous page visible while the next loads |
| Hook | `useMarkets({ category, page })` |

---

## Top Gainers / Top Losers — derived, not `/coins/top_gainers_losers`

CoinGecko's dedicated `GET /coins/top_gainers_losers` endpoint requires a
**paid plan** (Analyst tier and above) and returns `401` on the free/Demo
plan used by this project. Per the brief's instruction to fall back to
dummy/derived data when an endpoint isn't available on the plan in use, this
is computed client-side instead:

| | |
|---|---|
| API function | `fetchMarketsForRanking()` — fetches 100 coins by market cap, no sparkline |
| Mapper/derive | `deriveTopGainersLosers(coins, limit)` — sorts the mapped `MarketCoin[]` by `priceChangePercentage24h` descending (gainers) and ascending (losers), takes top 5 of each |
| Output | `TopGainersLosers { gainers: MarketCoin[], losers: MarketCoin[] }` |
| Query | `topGainersLosersQueryOptions()`, key: `queryKeys.home.topGainersLosers()` |
| Hook | `useTopGainersLosers()` |

If the app is later upgraded to a CoinGecko plan that includes
`/coins/top_gainers_losers`, only `fetchMarketsForRanking` and
`topGainersLosersQueryOptions` need to change — the hook and every
component stay the same, since they only depend on the `TopGainersLosers`
shape.

---

## News & Insights — mock data

CoinGecko has no public REST endpoint for either "News" or "Insights" (both
are website-only sections, not part of the v3 API on any plan). These are
served from static, clearly-labeled data in `home.mock.ts`:

| | |
|---|---|
| API function | `fetchNews()` / `fetchInsights()` — return `Promise.resolve(MOCK_NEWS)` / `MOCK_INSIGHTS` |
| Output | `NewsItem[]` / `InsightItem[]` |
| Query | `newsQueryOptions()` / `insightsQueryOptions()`, keys: `queryKeys.home.news()` / `queryKeys.home.insights()` |
| Hook | `useNews()` / `useInsights()` |

Both are wired through the exact same api → query → hook shape as a real
endpoint, so pointing them at a real news API later only requires editing
`fetchNews` / `fetchInsights` in `home.api.ts`.

---

## Error Normalization

Every API function above goes through the shared axios instance
(`services/axios/axiosInstance.ts`), whose response interceptor converts any
failure into an `ApiError` (`services/axios/errorHandler.ts`) before
TanStack Query ever sees it — network errors, timeouts, and HTTP error
responses (including CoinGecko's `429` rate-limit responses) all surface to
components as a consistent `{ message, status, code }` shape via
`isError` / `error` on the query result.
