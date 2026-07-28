/**
 * Formats a percentage change with an explicit sign, e.g. `+3.42%` or
 * `-1.05%`, so the caller doesn't need to prepend signs manually.
 */
export function formatPercentage(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always',
  }).format(value);

  return `${formatted}%`;
}
