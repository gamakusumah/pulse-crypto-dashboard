import type {
  CategoryDto,
  GlobalDataDto,
  MarketCoinDto,
  TrendingCoinItemDto,
} from '@/features/home/api/home.types';
import type {
  GlobalMarketStats,
  MarketCategory,
  MarketCoin,
  TopGainersLosers,
  TrendingCoin,
} from '@/features/home/types';

export function mapGlobalStats(dto: GlobalDataDto): GlobalMarketStats {
  const { data } = dto;
  return {
    totalMarketCapUsd: data.total_market_cap.usd ?? 0,
    totalVolumeUsd: data.total_volume.usd ?? 0,
    marketCapChangePercentage24h: data.market_cap_change_percentage_24h_usd ?? 0,
    btcDominance: data.market_cap_percentage.btc ?? 0,
    ethDominance: data.market_cap_percentage.eth ?? 0,
  };
}

export function mapTrendingCoin(item: TrendingCoinItemDto): TrendingCoin {
  return {
    id: item.id,
    name: item.name,
    symbol: item.symbol,
    marketCapRank: item.market_cap_rank,
    image: item.large || item.small || item.thumb,
    priceUsd: item.data?.price ?? 0,
    priceChangePercentage24h: item.data?.price_change_percentage_24h?.usd ?? null,
  };
}

export function mapMarketCoin(dto: MarketCoinDto): MarketCoin {
  return {
    id: dto.id,
    symbol: dto.symbol,
    name: dto.name,
    image: dto.image,
    rank: dto.market_cap_rank,
    priceUsd: dto.current_price,
    priceChangePercentage1h: dto.price_change_percentage_1h_in_currency ?? null,
    priceChangePercentage24h:
      dto.price_change_percentage_24h_in_currency ?? dto.price_change_percentage_24h ?? null,
    priceChangePercentage7d: dto.price_change_percentage_7d_in_currency ?? null,
    marketCapUsd: dto.market_cap,
    volumeUsd: dto.total_volume,
    sparkline: dto.sparkline_in_7d?.price ?? [],
  };
}

export function mapCategory(dto: CategoryDto): MarketCategory {
  return {
    id: dto.id,
    name: dto.name,
    marketCapUsd: dto.market_cap,
    marketCapChangePercentage24h: dto.market_cap_change_24h,
    topCoinImages: dto.top_3_coins ?? [],
  };
}

/**
 * `/coins/top_gainers_losers` is exclusive to CoinGecko's paid plans
 * (Analyst tier and above) and returns 401 on the free Demo plan. As
 * a fallback available on every plan, we derive gainers/losers from
 * the already-fetched `/coins/markets` dataset by sorting on 24h
 * change — the same underlying data the paid endpoint uses, just
 * computed client-side.
 */
export function deriveTopGainersLosers(coins: MarketCoin[], limit: number): TopGainersLosers {
  const ranked = coins.filter((coin) => coin.priceChangePercentage24h !== null);

  const gainers = [...ranked]
    .sort((a, b) => (b.priceChangePercentage24h ?? 0) - (a.priceChangePercentage24h ?? 0))
    .slice(0, limit);

  const losers = [...ranked]
    .sort((a, b) => (a.priceChangePercentage24h ?? 0) - (b.priceChangePercentage24h ?? 0))
    .slice(0, limit);

  return { gainers, losers };
}
