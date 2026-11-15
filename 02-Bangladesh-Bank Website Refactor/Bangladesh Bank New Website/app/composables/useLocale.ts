import { en } from '~/i18n/en'
import { bn } from '~/i18n/bn'
import type { LangCode, LocaleContent } from '~/i18n/types'

const DICTS: Record<LangCode, LocaleContent> = { en, bn }

/**
 * Language state for the English/Bangla toggle. Mirrors the original SPA:
 * flipping the language re-renders content with no URL change. Backed by
 * `useState` so the choice is shared across every component and survives
 * navigation between routes.
 */
export function useLocale() {
  const lang = useState<LangCode>('bb-lang', () => 'en')
  const L = computed<LocaleContent>(() => DICTS[lang.value])

  const setLang = (next: LangCode) => {
    lang.value = next
  }

  return { lang, L, setLang }
}
