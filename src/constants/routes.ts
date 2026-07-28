/**
 * Route path constants. `Coin` and `Exchange` are declared now so
 * links and types can reference them, even though their pages are
 * not implemented until a later phase.
 */
export const ROUTES = {
  HOME: '/',
  COIN: '/coin/:id',
  EXCHANGE: '/exchange/:id',
} as const;

export function coinRoute(id: string): string {
  return `/coin/${id}`;
}

export function exchangeRoute(id: string): string {
  return `/exchange/${id}`;
}
