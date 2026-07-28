import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatPercentage, getPriceColor } from '@/utils';
import { cn } from '@/lib/utils';

export interface PriceChangeProps {
  value: number | null;
  className?: string;
  showIcon?: boolean;
}

export function PriceChange({ value, className, showIcon = true }: PriceChangeProps) {
  const color = getPriceColor(value);
  const Icon = value !== null && value < 0 ? ArrowDown : ArrowUp;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 font-mono text-xs font-medium tabular-nums',
        color,
        className,
      )}
    >
      {showIcon && value !== null && value !== 0 ? (
        <Icon className="h-3 w-3" aria-hidden="true" />
      ) : null}
      {formatPercentage(value)}
    </span>
  );
}
