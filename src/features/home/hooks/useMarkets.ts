import { useQuery } from '@tanstack/react-query';
import { marketsQueryOptions } from '@/features/home/api/home.query';

export function useMarkets(params: { category: string | null; page: number }) {
  return useQuery(marketsQueryOptions(params));
}
