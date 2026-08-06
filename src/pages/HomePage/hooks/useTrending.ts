import { useQuery } from '@tanstack/react-query';
import { trendingQueryOptions } from '@/pages/HomePage/api/home.query';

export function useTrending() {
  return useQuery(trendingQueryOptions());
}
