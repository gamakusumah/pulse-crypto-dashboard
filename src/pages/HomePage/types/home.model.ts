/**
 * UI-facing models. Components only ever import from here (or from
 * `home.types.ts` for the DTOs, though components should not use DTOs
 * directly). Produced exclusively by `home.mapper.ts`.
 */

export interface GlobalMarketStats {
  totalMarketCapUsd: number;
  totalVolumeUsd: number;
  marketCapChangePercentage24h: number;
  btcDominance: number;
  ethDominance: number;
}

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  marketCapRank: number | null;
  image: string;
  priceUsd: number;
  priceChangePercentage24h: number | null;
}

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  rank: number | null;
  priceUsd: number | null;
  priceChangePercentage1h: number | null;
  priceChangePercentage24h: number | null;
  priceChangePercentage7d: number | null;
  marketCapUsd: number | null;
  volumeUsd: number | null;
  sparkline: number[];
}

export interface MarketCategory {
  id: string;
  name: string;
  marketCapUsd: number | null;
  marketCapChangePercentage24h: number | null;
  topCoinImages: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  thumbnail: string;
}

export interface InsightItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
}

export interface TopGainersLosers {
  gainers: MarketCoin[];
  losers: MarketCoin[];
}
