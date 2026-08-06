import { useQuery } from '@tanstack/react-query';
import { globalQueryOptions } from '@/pages/HomePage/api/home.query';

export function useGlobal() {
  return useQuery(globalQueryOptions());
}
