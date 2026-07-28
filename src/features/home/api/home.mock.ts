import type { InsightItem, NewsItem } from '@/features/home/types';

/**
 * CoinGecko's Demo/free plan has no `/news` or `/insights` REST
 * endpoint (news and research articles are only browsable on the
 * website). Per the project brief, these sections fall back to
 * static dummy content instead of failing outright, while keeping
 * the same async, paginated-looking API/query shape as real
 * endpoints so swapping in a live source later is a one-file change.
 */

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Bitcoin ETF inflows accelerate as institutional demand grows',
    source: 'CryptoDaily',
    url: 'https://www.coingecko.com/en/news',
    publishedAt: new Date(Date.now() - 25 * 60_000).toISOString(),
    thumbnail: 'https://placehold.co/64x64/1a1d23/f0a202?text=BTC',
  },
  {
    id: 'news-2',
    title: 'Ethereum layer-2 activity hits new all-time high in weekly transactions',
    source: 'ChainWire',
    url: 'https://www.coingecko.com/en/news',
    publishedAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
    thumbnail: 'https://placehold.co/64x64/1a1d23/f0a202?text=ETH',
  },
  {
    id: 'news-3',
    title: 'Regulators outline new framework for stablecoin reserve audits',
    source: 'Block Digest',
    url: 'https://www.coingecko.com/en/news',
    publishedAt: new Date(Date.now() - 9 * 3600_000).toISOString(),
    thumbnail: 'https://placehold.co/64x64/1a1d23/f0a202?text=REG',
  },
  {
    id: 'news-4',
    title: 'On-chain data shows accumulation trend among long-term holders',
    source: 'Glassnode Insights',
    url: 'https://www.coingecko.com/en/news',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    thumbnail: 'https://placehold.co/64x64/1a1d23/f0a202?text=ON',
  },
  {
    id: 'news-5',
    title: 'Major exchange expands proof-of-reserves reporting to 40 assets',
    source: 'CoinPress',
    url: 'https://www.coingecko.com/en/news',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    thumbnail: 'https://placehold.co/64x64/1a1d23/f0a202?text=CEX',
  },
  {
    id: 'news-6',
    title: 'DeFi total value locked recovers above key support level',
    source: 'DeFi Pulse Wire',
    url: 'https://www.coingecko.com/en/news',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 44).toISOString(),
    thumbnail: 'https://placehold.co/64x64/1a1d23/f0a202?text=DFI',
  },
];

export const MOCK_INSIGHTS: InsightItem[] = [
  {
    id: 'insight-1',
    title: 'Weekly Market Pulse: rotation into mid-cap altcoins',
    summary:
      'Capital is quietly rotating out of large caps into select mid-cap tokens with strong developer activity.',
    category: 'Market Analysis',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'insight-2',
    title: 'Understanding funding rates during high volatility',
    summary:
      'A short primer on how perpetual funding rates behave when spot and derivatives markets diverge.',
    category: 'Education',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
  },
  {
    id: 'insight-3',
    title: 'Correlation between BTC dominance and altseason timing',
    summary:
      'Historical patterns suggest altseason tends to begin only after BTC dominance stabilizes.',
    category: 'Research',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  },
  {
    id: 'insight-4',
    title: 'Reading exchange order books for liquidity depth',
    summary: 'A practical walkthrough of interpreting bid/ask depth before placing large orders.',
    category: 'Education',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
];
