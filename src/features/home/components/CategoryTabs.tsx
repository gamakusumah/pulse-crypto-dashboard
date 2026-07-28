import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTab, TabsIndicator } from '@/components/ui/tabs';
import type { MarketCategory } from '@/features/home/types';

export interface CategoryTabsProps {
  categories: MarketCategory[];
  value: string;
  onValueChange: (value: string) => void;
}

const ALL_VALUE = 'all';

/** Category tab bar. Selecting a tab drives a Coin Table refetch. */
export function CategoryTabs({ categories, value, onValueChange }: CategoryTabsProps) {
  const { t } = useTranslation();

  return (
    <Tabs
      value={value}
      onValueChange={(next) => onValueChange(typeof next === 'string' ? next : ALL_VALUE)}
    >
      <TabsList aria-label={t('home.categoryMarket.tabsAriaLabel')}>
        <TabsTab value={ALL_VALUE}>{t('home.categoryMarket.allTab')}</TabsTab>
        {categories.map((category) => (
          <TabsTab key={category.id} value={category.id}>
            {category.name}
          </TabsTab>
        ))}
        <TabsIndicator />
      </TabsList>
    </Tabs>
  );
}

export { ALL_VALUE as CATEGORY_ALL_VALUE };
