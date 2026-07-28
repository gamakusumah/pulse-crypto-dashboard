# Contributing

## Before You Start

```bash
npm install
cp .env.example .env
npm run dev
```

## Workflow

1. Create/modify files following the five-layer pattern described in
   [ARCHITECTURE.md](./ARCHITECTURE.md) — a component should never call
   `axios`/`httpClient` directly, and a hook should never contain a `fetch`
   call inline.
2. Run checks before committing:
   ```bash
   npm run typecheck
   npm run lint
   npm run format:check
   npm run build
   ```
   All four must pass cleanly — this project has **zero tolerance for
   TypeScript errors, ESLint warnings, or unformatted files**.
3. If you touch a component, verify it still has explicit loading, empty,
   and error states if it renders query data.

## TypeScript

- `strict: true`, `noUnusedLocals`, `noUnusedParameters` are all on.
- **Never use `any`.** `@typescript-eslint/no-explicit-any` is set to
  `error`, not `warn`. If a type is genuinely unknown, use `unknown` and
  narrow it.
- Prefer `interface` for object shapes, `type` for unions/utility types —
  matches the convention already used across `home.model.ts` and
  `home.types.ts`.
- Import types with `import type { X } from '...'` (enforced by
  `@typescript-eslint/consistent-type-imports`).

## Components

- Functional components only. No class components.
- One component per file; the file name matches the component name.
- Presentation and data-fetching are separate: a "section" component calls
  a feature hook and handles `isPending`/`isError`/`data`; the pure
  presentational pieces it renders (`TrendingCard`, `CoinTable`, ...) take
  plain props and know nothing about TanStack Query.
- Compose from `components/ui` primitives instead of writing raw
  `<div className="rounded-md border ...">` markup inline — if you find
  yourself repeating a style combination twice, it probably belongs in
  `components/ui` or `components/common`.
- Every list/data-driven section must render:
  - a **loading** state via `LoadingSkeleton` (never a spinner),
  - an **empty** state via `EmptyState` when the query succeeds with zero
    items,
  - an **error** state via `ErrorState` with `onRetry` wired to that
    query's `refetch()`.

## Adding a New Feature (e.g. Coin, Exchange)

1. Create `src/features/<name>/` with `api/`, `components/`, `hooks/`,
   `types/`, `utils/` (if needed), `pages/` — mirroring `features/home`.
2. Add DTOs to `<name>.types.ts`, pure mappers to `<name>.mapper.ts`, raw
   calls to `<name>.api.ts`, and `queryOptions()` factories to
   `<name>.query.ts`.
3. Add hooks that wrap each `queryOptions()` factory.
4. Add a query key group to `src/constants/queryKeys.ts`.
5. Register the route in `src/app/router/index.tsx` using the existing
   `ROUTES` constant and `lazy()` + `Suspense` pattern.
6. Do not modify `home`'s files to accommodate the new feature — if you
   find yourself needing to, the shared piece probably belongs in
   `components/ui`, `components/common`, `services`, or `lib` instead.

## Formatting

Prettier config (`.prettierrc`) is fixed project-wide:

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "all"
}
```

Run `npm run format` before committing; CI-equivalent check is
`npm run format:check`.

## Performance

- Reach for `React.memo` / `useMemo` / `useCallback` only when there's a
  concrete reason (an expensive computation, a large list, a prop causing
  visible re-render cost) — not by default. Over-memoizing adds complexity
  without measurable benefit in most of this codebase.
- Route-level code splitting is already in place (`lazy()` in
  `app/router`); new feature pages should follow the same pattern.

## Accessibility

- Use semantic HTML (`<header>`, `<main>`, `<aside>`, `<section>`, `<table>`)
  — already the convention in `HomePage.tsx` and its sections.
- Add `aria-label` to icon-only buttons and to landmark regions with
  ambiguous purpose (e.g. the sidebar `<aside aria-label="...">`).
- Interactive elements must be reachable and operable via keyboard — this
  is largely free from using semantic elements and the Base UI `Tabs`
  primitive, which manages roving tabindex and ARIA attributes internally.
