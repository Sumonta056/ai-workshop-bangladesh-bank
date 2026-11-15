# CP04 — `useLocale` composable and language switch: Goal

## Goal
`useLocale()` in `app/composables/useLocale.ts` holds the active language (`'en'` by default) in `useState('bb-lang')`, exposes `lang`, `L` and `setLang`, and the `English` / `বাংলা` pill (`<LayoutLangToggle>`) switches all content and `<html lang>` with no URL change and no page reload.

## Why this checkpoint exists
The prototype keeps `lang` in component state (line 503) and swaps the whole dictionary with `const L = T[lang]` (line 854). In Nuxt there is no single component, so every section needs the same shared value. If each component reads the language its own way, two parts of the page can show different languages, or the server-rendered HTML and the browser can disagree (hydration mismatch). One composable over `useState` gives one shared, SSR-safe value. CP06 (`useNav` labels) and every component from CP07 onward read `L` from here.

## In scope
- `app/composables/useLocale.ts`: `lang` (`Ref<LangCode>`), `L` (`ComputedRef<LocaleContent>`), `setLang(next: LangCode)`.
- `app/components/layout/LangToggle.vue` → `<LayoutLangToggle>`: the 2-button pill from prototype lines 40–43 with the exact on/off styles from lines 865–866.
- Use `<LayoutLangToggle />` inside `app/components/layout/UtilityBar.vue` in place of its inline buttons.
- Sync `<html lang>` with the active language via `useHead` in `app/layouts/default.vue`.
- Invisible accessibility additions (decision D1): `aria-pressed` on both buttons, `lang="bn"` on the `বাংলা` button, `type="button"`.
- Unit tests for the composable and the toggle.

## Out of scope
- Pixel-matching the rest of the utility bar (government line, RTI / Sitemap / Feedback links, separator) — CP07.
- Saving the language across reloads (cookie, `localStorage`, URL prefix like `/bn/`) — not in the prototype; a reload returns to English, exactly like the prototype.
- Nav labels and active state — CP06.
- Focus ring styling beyond the browser default — CP11.

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | No audit issue maps to CP04 in the master plan. It enables the bilingual labels that CP07 (#7, #9) and CP09 (#8) rely on. |

## Depends on
CP03

## Demo at the end
1. `npm run test` shows `tests/unit/composables/useLocale.spec.ts` and `tests/unit/components/LangToggle.spec.ts` green.
2. `npm run generate && npx serve .output/public`, open `http://localhost:3000/`. Click `বাংলা`: the masthead name changes from `Bangladesh Bank` to `বাংলাদেশ ব্যাংক`, the address bar still shows `http://localhost:3000/`, and `document.documentElement.lang` is `bn`.
3. Click `English`: everything returns to English and `lang` is `en`.
