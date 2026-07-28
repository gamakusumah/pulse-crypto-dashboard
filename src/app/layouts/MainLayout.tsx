import { Outlet } from 'react-router';

/**
 * Shared page chrome. Kept intentionally empty of navigation per the
 * brief (no top nav menu) — each page owns its own header content via
 * `PageHeader`. This wrapper exists so future routes (Coin, Exchange)
 * can share layout concerns (e.g. a global toast host) without
 * touching Home Page code.
 */
export function MainLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Outlet />
    </div>
  );
}
