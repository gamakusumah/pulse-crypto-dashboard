import { useTranslation } from 'react-i18next';
import { HomeHeader } from '@/pages/HomePage/components/HomeHeader';
import { GlobalMarketSection } from '@/pages/HomePage/components/sections/GlobalMarketSection';
import { TrendingGainersLosersSection } from '@/pages/HomePage/components/sections/TrendingGainersLosersSection';
import { CategoryCoinTableSection } from '@/pages/HomePage/components/sections/CategoryCoinTableSection';
import { InsightsSection, NewsSection } from '@/pages/HomePage/components/sections/SidebarSections';

export function HomePage() {
  const { t } = useTranslation();

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

          <aside className="space-y-6" aria-label={t('home.sidebar.ariaLabel')}>
            <InsightsSection />
            <NewsSection />
          </aside>
        </div>
      </main>
    </>
  );
}
