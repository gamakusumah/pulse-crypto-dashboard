import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { NewsCard } from '@/pages/HomePage/components/NewsCard';
import { InsightCard } from '@/pages/HomePage/components/InsightCard';
import { useNews, useInsights } from '@/pages/HomePage/hooks';

export function InsightsSection() {
  const { t } = useTranslation();
  const { data, isPending, isError, refetch } = useInsights();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('home.sidebar.insightsTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {isPending ? (
          <LoadingSkeleton variant="text" count={4} />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} className="py-6" />
        ) : data && data.length > 0 ? (
          data.map((item) => <InsightCard key={item.id} item={item} />)
        ) : (
          <EmptyState title={t('home.sidebar.emptyInsights')} className="py-6" />
        )}
      </CardContent>
    </Card>
  );
}

export function NewsSection() {
  const { t } = useTranslation();
  const { data, isPending, isError, refetch } = useNews();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('home.sidebar.newsTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {isPending ? (
          <LoadingSkeleton variant="row" count={5} />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} className="py-6" />
        ) : data && data.length > 0 ? (
          data.map((item) => <NewsCard key={item.id} item={item} />)
        ) : (
          <EmptyState title={t('home.sidebar.emptyNews')} className="py-6" />
        )}
      </CardContent>
    </Card>
  );
}
