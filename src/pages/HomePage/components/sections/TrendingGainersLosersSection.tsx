import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { TrendingCard } from '@/pages/HomePage/components/TrendingCard';
import { useTrending, useTopGainersLosers } from '@/pages/HomePage/hooks';
import type { MarketCoin, TrendingCoin } from '@/pages/HomePage/types';

export function TrendingGainersLosersSection() {
  const { t } = useTranslation();
  const trending = useTrending();
  const gainersLosers = useTopGainersLosers();

  return (
    <section aria-label={t('home.trendingGainersLosers.ariaLabel')} className="grid gap-3 lg:grid-cols-3">
      <CoinListCard
        title={t('home.trendingGainersLosers.trending')}
        isPending={trending.isPending}
        isError={trending.isError}
        onRetry={() => void trending.refetch()}
        emptyLabel={t('home.trendingGainersLosers.emptyTrending')}
      >
        {trending.data?.map((coin, index) => (
          <TrendingRow key={coin.id} rank={index + 1} coin={coin} />
        ))}
      </CoinListCard>

      <CoinListCard
        title={t('home.trendingGainersLosers.topGainers')}
        isPending={gainersLosers.isPending}
        isError={gainersLosers.isError}
        onRetry={() => void gainersLosers.refetch()}
        emptyLabel={t('home.trendingGainersLosers.emptyGainers')}
      >
        {gainersLosers.data?.gainers.map((coin) => (
          <MarketRow key={coin.id} coin={coin} />
        ))}
      </CoinListCard>

      <CoinListCard
        title={t('home.trendingGainersLosers.topLosers')}
        isPending={gainersLosers.isPending}
        isError={gainersLosers.isError}
        onRetry={() => void gainersLosers.refetch()}
        emptyLabel={t('home.trendingGainersLosers.emptyLosers')}
      >
        {gainersLosers.data?.losers.map((coin) => (
          <MarketRow key={coin.id} coin={coin} />
        ))}
      </CoinListCard>
    </section>
  );
}

function TrendingRow({ coin, rank }: { coin: TrendingCoin; rank: number }) {
  return (
    <TrendingCard
      rank={rank}
      image={coin.image}
      name={coin.name}
      symbol={coin.symbol}
      priceUsd={coin.priceUsd}
      priceChangePercentage24h={coin.priceChangePercentage24h}
    />
  );
}

function MarketRow({ coin }: { coin: MarketCoin }) {
  return (
    <TrendingCard
      image={coin.image}
      name={coin.name}
      symbol={coin.symbol}
      priceUsd={coin.priceUsd}
      priceChangePercentage24h={coin.priceChangePercentage24h}
    />
  );
}

function CoinListCard({
  title,
  isPending,
  isError,
  onRetry,
  emptyLabel,
  children,
}: {
  title: string;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  emptyLabel: string;
  children: ReactNode;
}) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5">
        {isPending ? (
          <LoadingSkeleton variant="row" count={5} />
        ) : isError ? (
          <ErrorState onRetry={onRetry} className="py-6" />
        ) : hasChildren ? (
          children
        ) : (
          <EmptyState title={emptyLabel} className="py-6" />
        )}
      </CardContent>
    </Card>
  );
}
