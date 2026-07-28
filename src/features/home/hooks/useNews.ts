import { useQuery } from '@tanstack/react-query';
import { newsQueryOptions } from '@/features/home/api/home.query';

export function useNews() {
  return useQuery(newsQueryOptions());
}
