import { useStorage } from '@vueuse/core'

const DEFAULT_LOCALE = 'en'

const LANGUAGES = {
  en: 'English'
}

type Language = keyof typeof LANGUAGES

export type Translation<T> = {
  [key in Language]: T
}

const locale = useStorage<Language>(
  'locale',
  getValidLanguage(navigator.language || DEFAULT_LOCALE)
)

function getValidLanguage(language: string): Language {
  let locale = language
  if (locale.includes('-')) {
    locale = locale.split('-')[0]
  }

  if (Object.keys(LANGUAGES).includes(locale)) {
    return locale as Language
  }

  return DEFAULT_LOCALE
}

function setLocale(language: string) {
  locale.value = getValidLanguage(language)
}

export function useLocalization() {
  return {
    locale,
    setLocale
  }
}
