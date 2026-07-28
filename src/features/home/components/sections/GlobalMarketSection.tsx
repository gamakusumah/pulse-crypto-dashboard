import { Globe2, TrendingUp, Bitcoin, CircleDollarSign } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { MarketStatCard } from '@/features/home/components/MarketStatCard';
import { PriceChange } from '@/features/home/components/PriceChange';
import { useGlobal } from '@/features/home/hooks';
import { formatCurrency } from '@/utils';

function formatDominance(value: number): string {
  return `${new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;
}

export function GlobalMarketSection() {
  const { data, isPending, isError, refetch, isFetching } = useGlobal();

  return (
    <section aria-labelledby="global-market-heading">
      <SectionTitle
        title="Global Market Overview"
        description="Ringkasan kondisi pasar kripto secara keseluruhan"
        className="mb-3"
      />

      {isPending ? (
        <LoadingSkeleton variant="stat" count={4} className="grid-cols-2 lg:grid-cols-4" />
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : data ? (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MarketStatCard
            label="Total Market Cap"
            value={formatCurrency(data.totalMarketCapUsd, { compact: true })}
            change={<PriceChange value={data.marketCapChangePercentage24h} />}
            icon={<Globe2 className="h-4 w-4" aria-hidden="true" />}
          />
          <MarketStatCard
            label="24h Volume"
            value={formatCurrency(data.totalVolumeUsd, { compact: true })}
            icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}
          />
          <MarketStatCard
            label="BTC Dominance"
            value={formatDominance(data.btcDominance)}
            icon={<Bitcoin className="h-4 w-4" aria-hidden="true" />}
          />
          <MarketStatCard
            label="ETH Dominance"
            value={formatDominance(data.ethDominance)}
            icon={<CircleDollarSign className="h-4 w-4" aria-hidden="true" />}
          />
        </div>
      ) : null}
      {isFetching && !isPending ? (
        <span className="sr-only" role="status">
          Memperbarui data pasar…
        </span>
      ) : null}
    </section>
  );
}
