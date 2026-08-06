import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { MarketStatCardProps } from './MarketStatCard.type';

export function MarketStatCard({ label, value, change, icon, className }: MarketStatCardProps) {
  return (
    <Card className={cn('bg-card/60', className)}>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 truncate font-mono text-lg font-semibold tabular-nums">{value}</p>
          {change ? <div className="mt-1">{change}</div> : null}
        </div>
        {icon ? <div className="shrink-0 text-accent">{icon}</div> : null}
      </CardContent>
    </Card>
  );
}
