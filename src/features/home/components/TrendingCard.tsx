import { CoinAvatar } from '@/features/home/components/CoinAvatar';
import { CoinPrice } from '@/features/home/components/CoinPrice';
import { PriceChange } from '@/features/home/components/PriceChange';

export interface TrendingCardProps {
  image: string;
  name: string;
  symbol: string;
  priceUsd: number | null;
  priceChangePercentage24h: number | null;
  rank?: number;
}

/** A single coin row: image, name, symbol, price, 24h change. */
export function TrendingCard({
  image,
  name,
  symbol,
  priceUsd,
  priceChangePercentage24h,
  rank,
}: TrendingCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-secondary/50">
      {rank ? (
        <span className="w-4 shrink-0 font-mono text-xs text-muted-foreground">{rank}</span>
      ) : null}
      <CoinAvatar image={image} name={name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate text-xs uppercase text-muted-foreground">{symbol}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <CoinPrice value={priceUsd} />
        <PriceChange value={priceChangePercentage24h} />
      </div>
    </div>
  );
}
