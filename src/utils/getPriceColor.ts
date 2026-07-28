/**
 * Maps a signed price-change value to the semantic color class used
 * throughout the app, keeping "what counts as a gain/loss" logic in
 * one place instead of scattered ternaries.
 */
export function getPriceColor(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'text-muted-foreground';
  }
  if (value > 0) return 'text-success';
  if (value < 0) return 'text-danger';
  return 'text-muted-foreground';
}
