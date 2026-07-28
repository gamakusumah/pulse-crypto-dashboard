# Architecture

## Guiding Principle

Every screen is built from **five layers**, each with one job. Data flows
down through them in a fixed order — a component is never allowed to skip a
layer (e.g. calling axios directly), because that's exactly the coupling
this architecture exists to prevent.

```
API (axios)  →  Mapper  →  Query (TanStack Query)  →  Hook  →  Component
```

1. **API** (`*.api.ts`) — raw HTTP calls. Knows the external contract
   (CoinGecko's response shape) and nothing about React or caching.
2. **Mapper** (`*.mapper.ts`) — pure functions that convert the raw DTO into
   the UI-facing model. This is the *only* place DTOs and UI types touch.
3. **Query** (`*.query.ts`) — TanStack Query `queryOptions()` factories that
   combine a query key, the API call, and the mapper into one reusable,
   fully-typed unit.
4. **Hook** (`use*.ts`) — a one-line `useQuery(xyzQueryOptions())` wrapper.
   This is the only thing components import from the feature's data layer.
5. **Component** — renders `data`, `isPending`, `isError`, and `refetch` from
   the hook. Contains presentation logic only.

## Feature-Based Architecture

```
src/features/<feature>/
  api/          # layers 1–3 above
  components/   # layer 5 — presentational + section components
  hooks/        # layer 4
  types/        # UI-facing models (feature/types index re-exports)
  utils/        # feature-local pure helpers (if any)
  pages/        # route-level composition of the feature's sections
```

Everything a feature needs to function lives inside its own folder. A
feature is free to define its own components, but always composes them from
the shared primitives in `src/components/ui`. Nothing outside
`src/features/home` imports from inside it except `src/app/router`, which
only imports the page component for routing.

Adding **Coin** or **Exchange** later means creating
`src/features/coin/` and `src/features/exchange/` with the same five-layer
shape, and registering their routes in `src/app/router`. No existing file
in `home`, `app`, `components`, `services`, or `lib` needs to change.

## API Flow (example: Coin Table)

```
CategoryCoinTableSection
  → useMarkets({ category, page })                (hook)
    → marketsQueryOptions({ category, page })      (query)
      → fetchMarkets(params)                       (api)
        → httpClient.get('/coins/markets', ...)    (services/api → services/axios)
      → coins.map(mapMarketCoin)                   (mapper)
    → TanStack Query cache, keyed by
      queryKeys.home.markets({ category, page })
  → { data, isPending, isError, isFetching, refetch }
→ <CoinTable data={...} ... />
```

## Data Flow: DTO → Model

Raw CoinGecko fields are snake_case, sometimes nested oddly (e.g.
`total_market_cap: { usd, idr, ... }`), and occasionally paid-plan-only. The
mapper layer normalizes all of this into flat, camelCase, `null`-safe models
defined in `features/home/types/home.model.ts`. Components only ever see
these models — if CoinGecko changes their response shape, only
`home.mapper.ts` and `home.types.ts` need to change.

## TanStack Query Flow

- A single `QueryClient` (`src/lib/queryClient.ts`) is created once and
  provided via `QueryProvider` in `src/app/providers`.
- Defaults: `staleTime: 60_000`, `gcTime: 300_000`, `retry: 2`,
  `refetchOnWindowFocus: false` — market data doesn't need second-level
  freshness, and refetching every window focus would burn through
  CoinGecko's free-tier rate limit quickly.
- Query keys are centralized in `src/constants/queryKeys.ts` as a typed
  factory (`queryKeys.home.markets({ category, page })`), so cache
  invalidation and key equality are never left to string concatenation.
- Paginated queries (`useMarkets`) use `placeholderData: (prev) => prev` so
  the table doesn't flash to a skeleton on every page change — the previous
  page stays visible (dimmed via `isFetching`) until the next page resolves.

## Error Handling Flow

```
axios request fails
  → axios interceptor (services/axios/interceptors.ts)
    → toApiError() (services/axios/errorHandler.ts) normalizes into ApiError
  → TanStack Query surfaces it as `error` / `isError`
  → Section component renders <ErrorState onRetry={refetch} />
```

`ApiError` extends the native `Error` class so it works correctly as a
Promise rejection reason and preserves stack traces, while still carrying a
normalized `status` and `code`.

## Why This Split

- **Testability** — mappers and API functions are pure/isolated and can be
  unit-tested without rendering React or mocking hooks.
- **Replaceability** — swapping CoinGecko for another provider means
  rewriting `api/` and `mapper` files only.
- **No prop-drilling of fetch logic** — components ask for exactly the data
  shape they need via a hook; they never know an HTTP request happened.
