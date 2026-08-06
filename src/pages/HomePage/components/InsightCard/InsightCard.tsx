import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils';
import type { InsightCardProps } from './InsightCard.type';

export function InsightCard({ item }: InsightCardProps) {
  // See NewsCard for why this hook is called without using `t`.
  useTranslation();

  return (
    <div className="rounded-lg p-2 transition-colors hover:bg-secondary/50">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="accent">{item.category}</Badge>
        <span className="text-xs text-muted-foreground">{formatDate(item.publishedAt)}</span>
      </div>
      <p className="mt-1.5 text-sm font-medium leading-snug">{item.title}</p>
      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.summary}</p>
    </div>
  );
}
