import type { MarketCoin } from '@/pages/HomePage/types';

export interface CoinTableProps {
  data: MarketCoin[];
  page: number;
  hasNextPage: boolean;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}
