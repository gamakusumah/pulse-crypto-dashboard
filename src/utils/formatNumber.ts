/**
 * Formats large plain numbers in compact notation (1.2M, 3.4B), used
 * for market cap, volume, and supply figures that don't need currency
 * symbols.
 */
export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}
