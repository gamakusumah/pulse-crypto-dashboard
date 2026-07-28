export const LANGUAGE_STORAGE_KEY = 'pulse-ui-language';

export const LANGUAGES = {
  EN: 'en',
  ID: 'id',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const SUPPORTED_LANGUAGES: Language[] = [LANGUAGES.EN, LANGUAGES.ID];

export const DEFAULT_LANGUAGE: Language = LANGUAGES.EN;
