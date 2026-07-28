import { useTranslation } from 'react-i18next';
import { Activity, Search } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import { Input } from '@/components/ui/input';

export function HomeHeader() {
  const { t } = useTranslation();

  return (
    <PageHeader
      logo={
        <a
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label={t('header.logoAriaLabel')}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Activity className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">Pulse</span>
        </a>
      }
      search={
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder={t('header.searchPlaceholder')}
            aria-label={t('header.searchAriaLabel')}
            className="pl-8"
          />
        </div>
      }
      actions={
        <>
          <LanguageToggle />
          <ThemeToggle />
        </>
      }
    />
  );
}
