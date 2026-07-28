import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { NewsCard } from '@/features/home/components/NewsCard';
import { InsightCard } from '@/features/home/components/InsightCard';
import { useNews, useInsights } from '@/features/home/hooks';

export function InsightsSection() {
  const { data, isPending, isError, refetch } = useInsights();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {isPending ? (
          <LoadingSkeleton variant="text" count={4} />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} className="py-6" />
        ) : data && data.length > 0 ? (
          data.map((item) => <InsightCard key={item.id} item={item} />)
        ) : (
          <EmptyState title="Belum ada insight" className="py-6" />
        )}
      </CardContent>
    </Card>
  );
}

export function NewsSection() {
  const { data, isPending, isError, refetch } = useNews();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {isPending ? (
          <LoadingSkeleton variant="row" count={5} />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} className="py-6" />
        ) : data && data.length > 0 ? (
          data.map((item) => <NewsCard key={item.id} item={item} />)
        ) : (
          <EmptyState title="Belum ada berita" className="py-6" />
        )}
      </CardContent>
    </Card>
  );
}
