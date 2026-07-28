import { useQuery } from '@tanstack/react-query';
import { trendingQueryOptions } from '@/features/home/api/home.query';

export function useTrending() {
  return useQuery(trendingQueryOptions());
}
