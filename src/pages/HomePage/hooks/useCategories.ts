import { useQuery } from '@tanstack/react-query';
import { categoriesQueryOptions } from '@/pages/HomePage/api/home.query';

export function useCategories() {
  return useQuery(categoriesQueryOptions());
}
