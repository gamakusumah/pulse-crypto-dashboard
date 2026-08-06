import { useQuery } from '@tanstack/react-query';
import { newsQueryOptions } from '@/pages/HomePage/api/home.query';

export function useNews() {
  return useQuery(newsQueryOptions());
}
