# Home Page

The Home Page is the only implemented route (`/`) in this phase. It has no
top navigation bar by design — the header is limited to logo, search, and
theme toggle, per the brief.

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  Header: Logo · Search · Theme Toggle                     │
├──────────────────────────────────────────────────────────┤
│  Global Market Overview  (4 stat cards)                   │
├──────────────────────────────────────────────────────────┤
│  Trending │ Top Gainers │ Top Losers   (3 cards)           │
├──────────────────────────────────────────────────────────┤
│  Category Tabs                                             │
├──────────────────────────────────────────────────────────┤
│  Coin Table                    │  Right Sidebar             │
│  (rank, coin, price, 1h, 24h,  │  - Insights                │
│   7d, market cap, volume,      │  - Latest News              │
│   sparkline; sortable,         │                              │
│   paginated)                   │                              │
└──────────────────────────────────────────────────────────┘
```

On mobile, the right sidebar (Insights + Latest News) moves **below** the
Coin Table — the grid is single-column below the `lg` breakpoint and the
sidebar is placed after the main column in markup, so it naturally stacks
underneath without any JS reordering.

## Sections

### 1. Header — `HomeHeader`

- Logo (links to `/`)
- Search input (UI only in this phase — wiring to the Coin page's search
  will happen once that feature exists)
- `ThemeToggle`

No navigation menu, per the brief.

### 2. Global Market Overview — `GlobalMarketSection`

- **API:** `GET /global`
- **Hook:** `useGlobal()`
- Shows: Total Market Cap, 24h Volume, BTC Dominance, ETH Dominance
- Loading: 4 `MarketStatCard`-shaped skeletons
- Error: `ErrorState` with retry
- Data is always present once loaded (the endpoint doesn't return empty)

### 3. Trending / Top Gainers / Top Losers — `TrendingGainersLosersSection`

Three side-by-side cards, each a list of `TrendingCard` rows.

- **Trending — API:** `GET /search/trending` → **Hook:** `useTrending()`
  Shows up to 7 trending coins (image, name, symbol, price, 24h change).
- **Top Gainers / Top Losers — API:** derived from `GET /coins/markets`
  (see [API.md](./API.md) for why) → **Hook:** `useTopGainersLosers()`
  Each list shows the top 5 by 24h percentage change, ascending for losers,
  descending for gainers.
- Loading: 5 skeleton rows per card
- Empty: `EmptyState` per card if the list is empty
- Error: `ErrorState` with retry, isolated per card (a Trending failure
  doesn't block Gainers/Losers from rendering)

### 4. Category Tabs — part of `CategoryCoinTableSection`

- **API:** `GET /coins/categories` → **Hook:** `useCategories()`
- Shows the first 10 categories as tabs, plus an "All" tab
- Selecting a tab updates `category` state, which resets the table to page 1
  and triggers a `useMarkets` refetch scoped to that category

### 5. Coin Table — part of `CategoryCoinTableSection`

- **API:** `GET /coins/markets` → **Hook:** `useMarkets({ category, page })`
- Columns: Rank, Coin, Price, 1h, 24h, 7d, Market Cap, Volume, 7d Sparkline
- **Pagination:** 20 rows/page, up to 10 pages, driven by CoinGecko's `page`
  param (server-side)
- **Sorting:** client-side, operating on the currently loaded page (see
  `CoinTable.tsx` for the rationale — CoinGecko's server-side `order` param
  doesn't cover every column)
- Loading: 8 skeleton rows
- Empty: shown if a category has zero coins
- Error: `ErrorState` with retry

### 6. Right Sidebar — `InsightsSection`, `NewsSection`

- **Insights — API:** mock (`home.mock.ts`) → **Hook:** `useInsights()`
- **News — API:** mock (`home.mock.ts`) → **Hook:** `useNews()`

CoinGecko's free plan has no REST endpoint for either of these (they're
website-only sections), so both fall back to static, clearly-labeled dummy
data — wired through the exact same api → mapper-free → query → hook shape
as every real endpoint, so swapping in a real feed later is a one-file
change in `home.api.ts`.

## Loading / Empty / Error Convention

Every section above follows the same three-state contract:

1. **Loading** → `LoadingSkeleton` (never a spinner)
2. **Empty** (query succeeded, zero items) → `EmptyState`
3. **Error** (query failed) → `ErrorState` with a `Coba Lagi` (Retry) button
   wired to that query's `refetch()`

This is enforced per-section rather than globally, so one failing section
never blocks the rest of the page from rendering.
