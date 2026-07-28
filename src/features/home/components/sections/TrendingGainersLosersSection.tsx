import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { TrendingCard } from '@/features/home/components/TrendingCard';
import { useTrending, useTopGainersLosers } from '@/features/home/hooks';
import type { MarketCoin, TrendingCoin } from '@/features/home/types';

export function TrendingGainersLosersSection() {
  const trending = useTrending();
  const gainersLosers = useTopGainersLosers();

  return (
    <section
      aria-label="Trending, Top Gainers, dan Top Losers"
      className="grid gap-3 lg:grid-cols-3"
    >
      <CoinListCard
        title="Trending"
        isPending={trending.isPending}
        isError={trending.isError}
        onRetry={() => void trending.refetch()}
        emptyLabel="Belum ada coin trending"
      >
        {trending.data?.map((coin, index) => (
          <TrendingRow key={coin.id} rank={index + 1} coin={coin} />
        ))}
      </CoinListCard>

      <CoinListCard
        title="Top Gainers"
        isPending={gainersLosers.isPending}
        isError={gainersLosers.isError}
        onRetry={() => void gainersLosers.refetch()}
        emptyLabel="Belum ada data top gainers"
      >
        {gainersLosers.data?.gainers.map((coin) => (
          <MarketRow key={coin.id} coin={coin} />
        ))}
      </CoinListCard>

      <CoinListCard
        title="Top Losers"
        isPending={gainersLosers.isPending}
        isError={gainersLosers.isError}
        onRetry={() => void gainersLosers.refetch()}
        emptyLabel="Belum ada data top losers"
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
