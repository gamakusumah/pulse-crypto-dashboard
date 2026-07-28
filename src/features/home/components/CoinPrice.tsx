import { formatCurrency } from '@/utils';
import { cn } from '@/lib/utils';

export interface CoinPriceProps {
  value: number | null;
  className?: string;
}

export function CoinPrice({ value, className }: CoinPriceProps) {
  return (
    <span className={cn('font-mono text-sm font-medium tabular-nums', className)}>
      {formatCurrency(value)}
    </span>
  );
}
