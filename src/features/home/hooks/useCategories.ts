import { useQuery } from '@tanstack/react-query';
import { categoriesQueryOptions } from '@/features/home/api/home.query';

export function useCategories() {
  return useQuery(categoriesQueryOptions());
}
