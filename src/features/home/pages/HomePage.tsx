import {
  HomeHeader,
  GlobalMarketSection,
  TrendingGainersLosersSection,
  CategoryCoinTableSection,
  InsightsSection,
  NewsSection,
} from '@/features/home/components';

export function HomePage() {
  return (
    <>
      <HomeHeader />

      <main className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <GlobalMarketSection />
            <TrendingGainersLosersSection />
            <CategoryCoinTableSection />
          </div>

          <aside className="space-y-6" aria-label="Insights dan berita terkini">
            <InsightsSection />
            <NewsSection />
          </aside>
        </div>
      </main>
    </>
  );
}
