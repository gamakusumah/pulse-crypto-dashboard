# Component Catalog

Two tiers of reusable components exist:

- **`src/components/ui`** — generic, feature-agnostic primitives (shadcn-style).
- **`src/components/common`** — reusable, app-aware composite components.
- **`src/features/home/components`** — feature-scoped reusable components,
  documented here too since the brief calls them out explicitly.

---

## `components/ui` — Primitives

### `Button`

```tsx
<Button variant="outline" size="sm" onClick={...}>Retry</Button>
```
| Prop | Type | Default |
|---|---|---|
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'default'` |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` |
| ...rest | native `<button>` props | — |

### `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

Composable card primitives. All accept native `div`/`h3`/`p` props plus `className`.

```tsx
<Card>
  <CardHeader><CardTitle>Top Gainers</CardTitle></CardHeader>
  <CardContent>...</CardContent>
</Card>
```

### `Badge`

```tsx
<Badge variant="success">+3.42%</Badge>
```
| Prop | Type | Default |
|---|---|---|
| `variant` | `'default' \| 'success' \| 'danger' \| 'accent' \| 'outline'` | `'default'` |

### `Skeleton`

```tsx
<Skeleton className="h-4 w-24" />
```
A single pulsing placeholder block; `LoadingSkeleton` (in `common/`) composes several of these into shapes.

### `Tabs`, `TabsList`, `TabsTab`, `TabsIndicator`, `TabsPanel`

Thin styled wrapper around Base UI's `Tabs`. Used directly by
`CategoryTabs`; can be reused for any future tabbed UI.

### `Avatar`

```tsx
<Avatar src={coin.image} alt={coin.name} size={28} />
```
Falls back to the first letter of `alt` if `src` is missing or fails to load — CoinGecko coin images occasionally 404.

### `Input`

Standard styled text input, used by the header search field.

---

## `components/common` — Reusable Composite Components

### `PageHeader`

```tsx
<PageHeader logo={<Logo />} search={<SearchBox />} actions={<ThemeToggle />} />
```
| Prop | Type | Required |
|---|---|---|
| `logo` | `ReactNode` | yes |
| `search` | `ReactNode` | no |
| `actions` | `ReactNode` | no |

Sticky top header shell. Deliberately has no navigation slot — this project's
Home Page has no top nav menu.

### `SectionTitle`

```tsx
<SectionTitle title="Markets" description="Ranked by market cap" action={<Filter />} />
```
| Prop | Type | Required |
|---|---|---|
| `title` | `string` | yes |
| `description` | `string` | no |
| `action` | `ReactNode` | no |

### `LoadingSkeleton`

```tsx
<LoadingSkeleton variant="row" count={5} />
```
| Prop | Type | Default |
|---|---|---|
| `variant` | `'card' \| 'row' \| 'stat' \| 'text'` | `'card'` |
| `count` | `number` | `1` |

Central place for every skeleton shape used across the Home Page — sections
never hand-roll their own `<Skeleton>` layout.

### `EmptyState`

```tsx
<EmptyState title="Tidak ada koin ditemukan" description="Coba kategori lain." />
```
| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `'Belum ada data'` |
| `description` | `string` | generic message |
| `icon` | `ReactNode` | `<Inbox />` |
| `action` | `ReactNode` | — |

### `ErrorState`

```tsx
<ErrorState onRetry={() => refetch()} />
```
| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `'Gagal memuat data'` |
| `description` | `string` | generic message |
| `onRetry` | `() => void` | — (button hidden if omitted) |

Always wired to a query's `refetch` in this project — every data section has
a retry path.

### `ThemeToggle`

```tsx
<ThemeToggle />
```
No props. Reads/writes theme via `next-themes`' `useTheme()`; renders a
disabled placeholder until mounted to avoid a hydration flash.

### `LanguageToggle`

```tsx
<LanguageToggle />
```
No props. Toggles between English and Indonesian via `react-i18next`'s
`useTranslation()` / `i18n.changeLanguage()`. See
[I18N.md](./I18N.md) for the full setup.

---

## `features/home/components` — Feature-Scoped Reusable Components

### `CoinAvatar`

```tsx
<CoinAvatar image={coin.image} name={coin.name} size={28} />
```
Thin wrapper around `Avatar` scoped to coin logos.

### `CoinPrice`

```tsx
<CoinPrice value={coin.priceUsd} />
```
Formats a USD price with `formatCurrency`, using tabular mono figures so
prices align in tables.

### `PriceChange`

```tsx
<PriceChange value={coin.priceChangePercentage24h} showIcon />
```
| Prop | Type | Default |
|---|---|---|
| `value` | `number \| null` | — |
| `showIcon` | `boolean` | `true` |

Colors text green/red via `getPriceColor` and shows an up/down arrow.

### `SparklineChart`

```tsx
<SparklineChart data={coin.sparkline} width={120} height={36} />
```
Dependency-free inline SVG line chart — no charting library needed for a
sparkline. Color follows the same green/red convention as `PriceChange`,
based on whether the series ends above or below where it started.

### `MarketStatCard`

```tsx
<MarketStatCard label="Total Market Cap" value="$2.14T" change={<PriceChange value={1.2} />} icon={<Globe2 />} />
```
Used by Global Market Overview's four stat cards.

### `TrendingCard`

```tsx
<TrendingCard image={coin.image} name={coin.name} symbol={coin.symbol} priceUsd={coin.priceUsd} priceChangePercentage24h={coin.priceChangePercentage24h} rank={1} />
```
A single coin row — reused by Trending, Top Gainers, and Top Losers cards.

### `CategoryTabs`

```tsx
<CategoryTabs categories={categories} value={category} onValueChange={setCategory} />
```
Built on the `Tabs` primitive; always includes an "All" tab (`CATEGORY_ALL_VALUE`).

### `CoinTable`

```tsx
<CoinTable data={coins} page={page} hasNextPage={hasNext} isFetching={isFetching} onPageChange={setPage} />
```
TanStack Table-powered, sortable (client-side, current page) and paginated
(server-side). Renders CoinAvatar, CoinPrice, PriceChange, and
SparklineChart internally per row.

### `NewsCard` / `InsightCard`

```tsx
<NewsCard item={newsItem} />
<InsightCard item={insightItem} />
```
Single-item rows for the sidebar sections.

### `HomeHeader`

Composes `PageHeader` with the app logo, search input, and `ThemeToggle` —
Home Page's concrete header instance.

---

## Section Components (hook + presentation glue)

These aren't "reusable" in the traditional sense (each is specific to one
Home Page section) but are documented for completeness since they're the
pattern every future feature's sections should follow: a section component
calls its feature hook(s) and renders the loading/empty/error/data states,
so `HomePage.tsx` itself stays a pure composition of sections.

- `GlobalMarketSection`
- `TrendingGainersLosersSection`
- `CategoryCoinTableSection`
- `InsightsSection`, `NewsSection`
