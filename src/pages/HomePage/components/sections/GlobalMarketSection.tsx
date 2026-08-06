import { useTranslation } from 'react-i18next';
import { Globe2, TrendingUp, Bitcoin, CircleDollarSign } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { MarketStatCard } from '@/pages/HomePage/components/MarketStatCard';
import { PriceChange } from '@/pages/HomePage/components/PriceChange';
import { useGlobal } from '@/pages/HomePage/hooks';
import { formatCurrency } from '@/utils';

function formatDominance(value: number): string {
  return `${new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;
}

export function GlobalMarketSection() {
  const { t } = useTranslation();
  const { data, isPending, isError, refetch, isFetching } = useGlobal();

  return (
    <section aria-labelledby="global-market-heading">
      <SectionTitle
        title={t('home.globalMarket.title')}
        description={t('home.globalMarket.description')}
        className="mb-3"
      />

      {isPending ? (
        <LoadingSkeleton variant="stat" count={4} className="grid-cols-2 lg:grid-cols-4" />
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : data ? (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MarketStatCard
            label={t('home.globalMarket.totalMarketCap')}
            value={formatCurrency(data.totalMarketCapUsd, { compact: true })}
            change={<PriceChange value={data.marketCapChangePercentage24h} />}
            icon={<Globe2 className="h-4 w-4" aria-hidden="true" />}
          />
          <MarketStatCard
            label={t('home.globalMarket.volume24h')}
            value={formatCurrency(data.totalVolumeUsd, { compact: true })}
            icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}
          />
          <MarketStatCard
            label={t('home.globalMarket.btcDominance')}
            value={formatDominance(data.btcDominance)}
            icon={<Bitcoin className="h-4 w-4" aria-hidden="true" />}
          />
          <MarketStatCard
            label={t('home.globalMarket.ethDominance')}
            value={formatDominance(data.ethDominance)}
            icon={<CircleDollarSign className="h-4 w-4" aria-hidden="true" />}
          />
        </div>
      ) : null}
      {isFetching && !isPending ? (
        <span className="sr-only" role="status">
          {t('home.globalMarket.updating')}
        </span>
      ) : null}
    </section>
  );
}
