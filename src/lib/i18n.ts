import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/translation.json';
import id from '@/locales/id/translation.json';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  type Language,
} from '@/constants/i18n';

/**
 * Resources are bundled at build time (no lazy backend, no network
 * fetch for translations) — the app only ships two languages, so
 * there's no benefit to the added complexity of a translation
 * loading state.
 */
const resources = {
  en: { translation: en },
  id: { translation: id },
};

function readStoredLanguage(): Language | null {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(stored as Language) ? (stored as Language) : null;
  } catch {
    return null;
  }
}

function detectInitialLanguage(): Language {
  const stored = readStoredLanguage();
  if (stored) return stored;

  const browserLanguage = navigator.language.slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(browserLanguage as Language)
    ? (browserLanguage as Language)
    : DEFAULT_LANGUAGE;
}

export const i18nReady = i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
  })
  .then(() => undefined);

document.documentElement.lang = i18n.language;

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // localStorage may be unavailable (private browsing); language
    // still applies for the current session via the i18n instance.
  }
});

export { i18n };
