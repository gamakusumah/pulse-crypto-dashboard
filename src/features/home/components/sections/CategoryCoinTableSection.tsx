import { useState } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { CategoryTabs, CATEGORY_ALL_VALUE } from '@/features/home/components/CategoryTabs';
import { CoinTable } from '@/features/home/components/CoinTable';
import { useCategories, useMarkets } from '@/features/home/hooks';
import { PAGINATION } from '@/constants/api';

export function CategoryCoinTableSection() {
  const [category, setCategory] = useState<string>(CATEGORY_ALL_VALUE);
  const [page, setPage] = useState(1);

  const categoriesQuery = useCategories();
  const marketsQuery = useMarkets({
    category: category === CATEGORY_ALL_VALUE ? null : category,
    page,
  });

  function handleCategoryChange(next: string) {
    setCategory(next);
    setPage(1);
  }

  return (
    <section aria-labelledby="markets-heading" className="space-y-3">
      <SectionTitle title="Markets" description="Peringkat koin berdasarkan kapitalisasi pasar" />

      {categoriesQuery.isPending ? (
        <LoadingSkeleton variant="text" className="h-8 w-full" />
      ) : categoriesQuery.isError ? null : categoriesQuery.data ? (
        <CategoryTabs
          categories={categoriesQuery.data}
          value={category}
          onValueChange={handleCategoryChange}
        />
      ) : null}

      {marketsQuery.isPending ? (
        <LoadingSkeleton variant="row" count={8} />
      ) : marketsQuery.isError ? (
        <ErrorState onRetry={() => void marketsQuery.refetch()} />
      ) : marketsQuery.data && marketsQuery.data.length > 0 ? (
        <CoinTable
          data={marketsQuery.data}
          page={page}
          hasNextPage={
            page < PAGINATION.MARKETS_MAX_PAGE &&
            marketsQuery.data.length === PAGINATION.MARKETS_PER_PAGE
          }
          isFetching={marketsQuery.isFetching}
          onPageChange={setPage}
        />
      ) : (
        <EmptyState title="Tidak ada koin ditemukan" description="Coba pilih kategori lain." />
      )}
    </section>
  );
}
