# Project Structure

```
src/
├── app/                          # Application shell — never feature logic
│   ├── providers/
│   │   ├── ThemeProvider.tsx     # next-themes wrapper (light/dark/system)
│   │   ├── QueryProvider.tsx     # TanStack QueryClientProvider
│   │   └── index.tsx             # AppProviders — composition root
│   ├── router/
│   │   └── index.tsx             # createBrowserRouter + lazy-loaded routes
│   └── layouts/
│       └── MainLayout.tsx        # Shared page chrome (no nav, per brief)
│
├── features/
│   └── home/                     # Home Page feature (Coin/Exchange join later)
│       ├── api/
│       │   ├── home.api.ts       # Raw axios calls — the only file that calls httpClient
│       │   ├── home.mapper.ts    # DTO → UI model pure functions
│       │   ├── home.query.ts     # TanStack Query `queryOptions()` factories
│       │   ├── home.types.ts     # Raw CoinGecko response DTOs
│       │   ├── home.mock.ts      # Dummy data for endpoints CoinGecko's free plan lacks
│       │   └── index.ts
│       ├── components/
│       │   ├── CoinAvatar.tsx
│       │   ├── CoinPrice.tsx
│       │   ├── PriceChange.tsx
│       │   ├── SparklineChart.tsx
│       │   ├── MarketStatCard.tsx
│       │   ├── TrendingCard.tsx
│       │   ├── CategoryTabs.tsx
│       │   ├── CoinTable.tsx
│       │   ├── NewsCard.tsx
│       │   ├── InsightCard.tsx
│       │   ├── HomeHeader.tsx
│       │   ├── sections/         # Section-level: hook + presentational glue
│       │   │   ├── GlobalMarketSection.tsx
│       │   │   ├── TrendingGainersLosersSection.tsx
│       │   │   ├── CategoryCoinTableSection.tsx
│       │   │   └── SidebarSections.tsx   (Insights + News)
│       │   └── index.ts
│       ├── hooks/
│       │   ├── useGlobal.ts
│       │   ├── useTrending.ts
│       │   ├── useTopGainersLosers.ts
│       │   ├── useCategories.ts
│       │   ├── useMarkets.ts
│       │   ├── useNews.ts
│       │   ├── useInsights.ts
│       │   └── index.ts
│       ├── types/
│       │   ├── home.model.ts     # UI-facing model types
│       │   └── index.ts
│       └── pages/
│           └── HomePage.tsx      # Composes header + all sections into the route
│
├── components/
│   ├── ui/                       # Generic shadcn-style primitives (no business logic)
│   │   ├── button.tsx / card.tsx / badge.tsx / skeleton.tsx
│   │   ├── tabs.tsx              # Wraps Base UI Tabs
│   │   ├── avatar.tsx / input.tsx
│   │   └── index.ts
│   ├── common/                   # Cross-feature reusable, app-aware components
│   │   ├── PageHeader.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── index.ts
│   └── layout/                   # Reserved for future shared layout pieces
│       (empty for now — Home Page owns its own header via `common/PageHeader`)
│
├── services/
│   ├── axios/
│   │   ├── axiosInstance.ts      # Instance creation only (baseURL, timeout)
│   │   ├── interceptors.ts       # Request/response interceptor registration
│   │   ├── errorHandler.ts       # ApiError class + toApiError() normalizer
│   │   └── index.ts
│   └── api/
│       ├── httpClient.ts         # Re-exports axiosInstance as `httpClient`
│       └── index.ts
│
├── hooks/                        # Cross-feature reusable hooks (none yet — reserved)
├── lib/
│   ├── utils.ts                  # cn() — clsx + tailwind-merge
│   ├── queryClient.ts            # Global QueryClient with app-wide defaults
│   └── i18n.ts                   # i18next init, language detection + persistence
│
├── locales/
│   ├── en/translation.json       # English (US) UI strings
│   └── id/translation.json       # Indonesian UI strings
│
├── types/
│   └── common.ts                 # Cross-feature shared types (pagination, sorting)
│
├── utils/
│   ├── formatCurrency.ts
│   ├── formatNumber.ts
│   ├── formatPercentage.ts
│   ├── formatDate.ts             # Locale-aware via i18n.language (Intl.RelativeTimeFormat)
│   ├── getPriceColor.ts
│   └── index.ts
│
├── constants/
│   ├── api.ts                    # Base URL, timeout, pagination, home page limits
│   ├── queryKeys.ts               # Typed TanStack Query key factory
│   ├── routes.ts                   # Route path constants (Home, Coin, Exchange)
│   ├── theme.ts                     # Theme storage key + theme enum
│   └── i18n.ts                       # Language storage key + supported languages
│
├── styles/
│   └── globals.css                 # Tailwind v4 import + design tokens (@theme)
│
├── assets/                          # Static assets (empty — none needed yet)
│
├── App.tsx                            # Composes AppProviders + AppRouter
├── main.tsx                            # React root, calls setupInterceptors() once
└── vite-env.d.ts                        # Vite + import.meta.env typing
```

## Folder Responsibility Summary

| Folder             | Responsibility                                                        | May import from                              |
| ------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| `app/`                | Bootstraps providers, routing, layout shell                                | `features/*/pages`, `components`, `lib`           |
| `features/<name>/`      | Everything one feature needs, self-contained                                 | `components/ui`, `components/common`, `services`, `lib`, `utils`, `types`, `constants` |
| `components/ui`           | Generic, feature-agnostic UI primitives                                        | `lib` only                                          |
| `components/common`         | Reusable composite components (still feature-agnostic)                            | `components/ui`, `lib`                                |
| `services/`                    | HTTP transport — axios instance, interceptors, error normalization                   | `constants` only                                        |
| `lib/`                            | Cross-cutting singletons and pure helpers with no feature knowledge                     | nothing feature-specific                                    |
| `types/`, `utils/`, `constants/`    | Cross-feature shared primitives                                                            | nothing feature-specific                                        |

The dependency direction is always **feature → shared**, never the reverse —
`components/ui`, `services`, and `lib` must never import anything from
`features/`.
