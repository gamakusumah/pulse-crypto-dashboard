/**
 * Formats a numeric USD value for display, choosing precision that
 * keeps small-cap coin prices (e.g. 0.00000123) legible while still
 * rounding large values (market cap, volume) to sensible whole units.
 */
export function formatCurrency(
  value: number | null | undefined,
  options?: { compact?: boolean },
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';

  if (options?.compact) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  }

  const absValue = Math.abs(value);
  let maximumFractionDigits = 2;

  if (absValue > 0 && absValue < 1) {
    maximumFractionDigits = 6;
  } else if (absValue < 0.01 && absValue > 0) {
    maximumFractionDigits = 8;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
}
