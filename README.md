# Pulse — Crypto Market Dashboard

Real-time cryptocurrency market dashboard built as a scalable, feature-based
frontend foundation. This first phase implements the **Home Page** only; the
architecture is designed so that **Coin** and **Exchange** pages can be added
later as new features without restructuring existing code.

See [`docs/`](./docs) for the full documentation set:

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) — layered architecture, data flow
- [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) — folder-by-folder reference
- [HOME_PAGE.md](./docs/HOME_PAGE.md) — every section, its API, and its states
- [API.md](./docs/API.md) — endpoint-by-endpoint contract (input/output/mapper/query)
- [COMPONENTS.md](./docs/COMPONENTS.md) — reusable component catalog with props
- [THEME.md](./docs/THEME.md) — design tokens and light/dark theming
- [I18N.md](./docs/I18N.md) — English/Indonesian language support
- [CONTRIBUTING.md](./docs/CONTRIBUTING.md) — coding standards and workflow

## Tech Stack

| Concern               | Choice                                                     |
| ---------------------- | ----------------------------------------------------------- |
| Build tool              | Vite                                                          |
| UI library               | React 19                                                       |
| Language                  | TypeScript (strict mode, no `any`)                              |
| Styling                    | Tailwind CSS v4                                                  |
| Component primitives        | shadcn-style primitives on top of Base UI / Radix UI               |
| Data fetching                 | TanStack Query                                                       |
| HTTP client                     | Axios                                                                  |
| Routing                           | React Router v7                                                         |
| Table                                | TanStack Table                                                           |
| Forms / validation                    | React Hook Form + Zod (wired, used as features need them)                 |
| Icons                                    | Lucide React                                                               |
| Class utilities                            | clsx, class-variance-authority, tailwind-merge                              |
| Theming                                       | next-themes                                                                    |
| Internationalization                            | i18next + react-i18next (English (US) + Indonesian)                             |
| Market data                                     | CoinGecko public API                                                            |

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

| Variable       | Description                         | Default                             |
| --------------- | ------------------------------------- | -------------------------------------- |
| `VITE_API_URL`    | Base URL for the CoinGecko REST API     | `https://api.coingecko.com/api/v3`        |

> The CoinGecko free/Demo plan is rate-limited (100 requests/min, 10,000/month)
> and does not require an API key for the endpoints this app uses.

## Run

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Script                  | Purpose                                    |
| ------------------------ | -------------------------------------------- |
| `npm run dev`              | Start the Vite dev server                       |
| `npm run build`              | Type-check (`tsc -b`) then build for production    |
| `npm run preview`              | Preview the production build locally               |
| `npm run typecheck`              | Type-check only, no emit                              |
| `npm run lint`                    | Run ESLint across the project                          |
| `npm run lint:fix`                  | Run ESLint and auto-fix what it can                       |
| `npm run format`                      | Format the project with Prettier                            |
| `npm run format:check`                  | Check formatting without writing changes                      |

## Folder Structure

```
src/
  app/            # providers, router, layouts — application shell
  features/       # one folder per feature (currently: home)
  components/     # cross-feature reusable UI (common/, ui/, layout/)
  services/       # axios instance + interceptors, generic http client
  hooks/          # cross-feature reusable hooks
  lib/            # framework-level singletons (cn(), queryClient)
  types/          # cross-feature shared types
  utils/          # pure formatting/helper functions
  constants/      # query keys, routes, api config, theme constants
  styles/         # global stylesheet + design tokens
```

Full breakdown in [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md).

## Coding Standards

- Functional components only, strict TypeScript, **no `any`**.
- Business logic never lives inside UI components — it lives in feature
  `api/`, `hooks/`, and `utils/` modules.
- Every list/data section has an explicit loading (skeleton), empty, and
  error state — never a bare spinner.
- Components are composed from the shared `components/ui` primitives rather
  than duplicating markup.
- New features are added as a new folder under `src/features/`, following the
  same `api / components / hooks / types / utils / pages` shape as `home`.

Full details in [CONTRIBUTING.md](./docs/CONTRIBUTING.md).
