export interface TrendingCardProps {
  image: string;
  name: string;
  symbol: string;
  priceUsd: number | null;
  priceChangePercentage24h: number | null;
  rank?: number;
}
