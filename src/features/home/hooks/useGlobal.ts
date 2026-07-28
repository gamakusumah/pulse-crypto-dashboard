import { useQuery } from '@tanstack/react-query';
import { globalQueryOptions } from '@/features/home/api/home.query';

export function useGlobal() {
  return useQuery(globalQueryOptions());
}
