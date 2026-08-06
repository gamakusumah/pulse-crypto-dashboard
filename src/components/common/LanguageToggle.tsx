import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LANGUAGES, type Language } from '@/constants/i18n';

const NEXT_LANGUAGE: Record<Language, Language> = {
  [LANGUAGES.EN]: LANGUAGES.ID,
  [LANGUAGES.ID]: LANGUAGES.EN,
};

/**
 * Toggles between English and Indonesian. Mirrors `ThemeToggle`'s
 * shape (icon button, single click cycles the only two options) —
 * if a third language is ever added, this should become a dropdown
 * instead of a toggle.
 */
export function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const current = (i18n.language in NEXT_LANGUAGE ? i18n.language : LANGUAGES.EN) as Language;
  const next = NEXT_LANGUAGE[current];

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t('languageToggle.switchTo', { language: t(`languageToggle.languages.${next}`) })}
      onClick={() => void i18n.changeLanguage(next)}
    >
      <Languages aria-hidden="true" />
      <span className="sr-only">{t('languageToggle.label')}</span>
    </Button>
  );
}
