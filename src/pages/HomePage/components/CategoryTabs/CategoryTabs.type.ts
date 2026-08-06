import type { MarketCategory } from '@/pages/HomePage/types';

export interface CategoryTabsProps {
  categories: MarketCategory[];
  value: string;
  onValueChange: (value: string) => void;
}
