import { useQuery } from '@tanstack/react-query';
import { topGainersLosersQueryOptions } from '@/pages/HomePage/api/home.query';

export function useTopGainersLosers() {
  return useQuery(topGainersLosersQueryOptions());
}
