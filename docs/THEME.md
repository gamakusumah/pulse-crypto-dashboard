# Theming

## Overview

Light and dark mode are implemented with `next-themes` (`attribute="class"`)
plus a set of HSL CSS custom properties defined in `src/styles/globals.css`
and mapped into Tailwind v4's `@theme` block. Components never hardcode
colors — they use semantic Tailwind classes (`bg-card`, `text-muted-foreground`,
`text-success`) that resolve to the current theme's tokens.

## Design Direction

The palette is inspired by trading-terminal software: quiet neutral
surfaces, numbers set in a monospace face for alignment, and a single
amber accent color reserved for interactive/focus states — kept
deliberately separate from the green/red used for market direction, so
"this is clickable" and "this went up" are never visually confused.

- **Sans:** Inter — UI text, labels, headings
- **Mono:** JetBrains Mono — prices, percentages, market cap, volume (`font-mono tabular-nums` throughout the Coin Table and stat cards)

## Token Reference

Defined in `:root` (light) and `.dark` (dark) as HSL triplets, then exposed
as `--color-*` variables via `@theme inline`:

| Token | Role |
|---|---|
| `background` / `foreground` | Page background / default text |
| `card` / `card-foreground` | Card surfaces |
| `popover` / `popover-foreground` | Overlay surfaces |
| `border` / `input` | Borders, input outlines |
| `ring` | Focus ring color |
| `primary` / `primary-foreground` | Primary action color (amber in dark mode, near-black in light mode) |
| `secondary` / `secondary-foreground` | Secondary surfaces (hover states, subtle backgrounds) |
| `muted` / `muted-foreground` | De-emphasized text and backgrounds |
| `accent` / `accent-foreground` | The signature amber — used for focus rings, active tab indicator, badges |
| `destructive` / `destructive-foreground` | Destructive actions |
| `success` / `success-foreground` | Positive price movement |
| `danger` / `danger-foreground` | Negative price movement |

`getPriceColor()` (`src/utils/getPriceColor.ts`) is the single source of
truth mapping a signed number to `text-success` / `text-danger` /
`text-muted-foreground` — no component computes this inline.

## Adding/Using a Themed Color

1. Add the HSL value to both `:root` and `.dark` in `globals.css`.
2. Expose it in the `@theme inline` block as `--color-<name>: hsl(var(--<name>))`.
3. Use it in JSX via the generated utility classes: `bg-<name>`, `text-<name>`, `border-<name>`.

## ThemeProvider Setup

```tsx
// src/app/providers/ThemeProvider.tsx
<NextThemesProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  storageKey="pulse-ui-theme"
  disableTransitionOnChange
>
```

- `storageKey` matches the constant in `src/constants/theme.ts` and the
  inline anti-flash script in `index.html`, which reads `localStorage`
  synchronously before React mounts and applies the `dark` class
  immediately — preventing a flash of the wrong theme on load.
- `ThemeToggle` (`src/components/common/ThemeToggle.tsx`) reads
  `resolvedTheme` from `useTheme()` and flips between `light`/`dark`; it
  renders a disabled placeholder until mounted, since `next-themes` can't
  know the resolved theme during server/first render.

## Radius Scale

`--radius` (`0.625rem`) is the base; `--radius-sm/md/lg/xl` are derived
offsets from it, exposed as `rounded-sm` / `rounded-md` / `rounded-lg` /
`rounded-xl` utilities — used instead of arbitrary `rounded-[Npx]` values
throughout.
