import { useQuery } from '@tanstack/react-query';
import { insightsQueryOptions } from '@/features/home/api/home.query';

export function useInsights() {
  return useQuery(insightsQueryOptions());
}
