import { useQuery } from '@tanstack/react-query';
import { topGainersLosersQueryOptions } from '@/features/home/api/home.query';

export function useTopGainersLosers() {
  return useQuery(topGainersLosersQueryOptions());
}
