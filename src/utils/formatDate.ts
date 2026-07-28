import { i18n } from '@/lib/i18n';

const relativeUnits: Array<{ ms: number; unit: Intl.RelativeTimeFormatUnit }> = [
  { ms: 60_000, unit: 'minute' },
  { ms: 3_600_000, unit: 'hour' },
  { ms: 86_400_000, unit: 'day' },
];

/**
 * Formats an ISO date string as a relative "time ago" label for
 * recent items, falling back to an absolute date once the item is
 * older than a week. Uses the app's current language (`i18n.language`)
 * so the label localizes automatically — e.g. "2 hours ago" in
 * English vs "2 jam yang lalu" in Indonesian.
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '—';

  const diffMs = Date.now() - date.getTime();

  if (diffMs < relativeUnits[0].ms) {
    return i18n.t('common.justNow');
  }

  if (diffMs < 7 * relativeUnits[2].ms) {
    const relativeFormat = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

    // Pick the largest unit that still yields at least 1 (e.g. prefer
    // "2 hours ago" over "120 minutes ago").
    const { ms, unit } =
      [...relativeUnits].reverse().find((entry) => diffMs >= entry.ms) ?? relativeUnits[0];

    return relativeFormat.format(-Math.floor(diffMs / ms), unit);
  }

  return new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
