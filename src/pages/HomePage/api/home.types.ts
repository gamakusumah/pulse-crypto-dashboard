/**
 * Raw response shapes as returned by the CoinGecko REST API. These
 * intentionally mirror the wire format (snake_case, nullable fields)
 * — `home.mapper.ts` is the only place allowed to touch these types
 * directly and convert them into the UI-facing models in
 * `features/home/types`.
 */

export interface GlobalDataDto {
  data: {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export interface TrendingCoinItemDto {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data?: {
    price: number;
    price_change_percentage_24h?: Record<string, number>;
    market_cap?: string;
    total_volume?: string;
    sparkline?: string;
  };
}

export interface TrendingResponseDto {
  coins: Array<{ item: TrendingCoinItemDto }>;
}

export interface CategoryDto {
  id: string;
  name: string;
  market_cap: number | null;
  market_cap_change_24h: number | null;
  volume_24h: number | null;
  top_3_coins: string[];
  content?: string | null;
  updated_at: string | null;
}

export interface MarketCoinDto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  total_volume: number | null;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_24h?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  sparkline_in_7d?: { price: number[] } | null;
}

export interface MarketsQueryParamsDto {
  vs_currency: string;
  category?: string;
  order?: string;
  per_page: number;
  page: number;
  sparkline: boolean;
  price_change_percentage?: string;
}
