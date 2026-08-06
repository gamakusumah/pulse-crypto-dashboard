import { useQuery } from '@tanstack/react-query';
import { insightsQueryOptions } from '@/pages/HomePage/api/home.query';

export function useInsights() {
  return useQuery(insightsQueryOptions());
}
