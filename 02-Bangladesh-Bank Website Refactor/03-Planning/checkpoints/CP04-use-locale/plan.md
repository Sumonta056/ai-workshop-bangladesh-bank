# CP04 — `useLocale` composable and language switch: Plan

All paths are relative to `Bangladesh Bank New Website/` unless they start with `../`. A draft `useLocale.ts` exists (commit `456fe5e`) and 18 draft files already call `useLocale()`. The public API (`lang`, `L`, `setLang`) stays the same, so those callers do not change.

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `app/composables/useLocale.ts` | Verify / rewrite | `useState<LangCode>('bb-lang', () => 'en')`; `L = computed(() => DICTS[lang.value])` with `DICTS: Record<LangCode, LocaleContent> = { en, bn }`; `setLang(next)` sets `lang.value`. Explicit imports from `~/i18n/en`, `~/i18n/bn`, `~/i18n/types`. No comments (user rule). |
| `app/components/layout/LangToggle.vue` | Create | The pill: wrapper + 2 `<button type="button">`. Reads `lang`, calls `setLang`. Scoped CSS with the exact values below. |
| `app/components/layout/UtilityBar.vue` | Change | Replace the `<div class="toggle">…</div>` block (draft lines 17–20) and its `.toggle` / `.tbtn` / `.on` / `.off` CSS with `<LayoutLangToggle />`. Remove `lang` and `setLang` from its `useLocale()` destructure. |
| `app/layouts/default.vue` | Change | Add `<script setup lang="ts">` with `const { lang } = useLocale()` and `useHead({ htmlAttrs: { lang } })`. |
| `tests/unit/composables/useLocale.spec.ts` | Create | Composable tests (see `test-criteria.md`). |
| `tests/unit/components/LangToggle.spec.ts` | Create | Component tests with `mountSuspended` from `@nuxt/test-utils/runtime`. |

### Exact toggle styles (from the prototype)

| Part | Property | Value | Source line |
|------|----------|-------|-------------|
| Wrapper | `display` / `align-items` | `flex` / `center` | 40 |
| Wrapper | `border` | `1px solid rgba(255,255,255,.28)` | 40 |
| Wrapper | `border-radius` / `overflow` | `999px` / `hidden` | 40 |
| Button (both) | `border` / `cursor` | `none` / `pointer` | 865–866 |
| Button (both) | `font-family` | `Inter, sans-serif` (use `var(--bb-font)`) | 865–866 |
| Button (both) | `font-size` / `font-weight` | `11.5px` / `600` | 865–866 |
| Button (both) | `padding` | `6px 13px` | 865–866 |
| Active (`aria-pressed="true"`) | `background` / `color` | `#fff` (`var(--bb-white)`) / `#0A3D2C` (`var(--bb-green-dark)`) | 865 |
| Inactive (`aria-pressed="false"`) | `background` / `color` | `transparent` / `rgba(255,255,255,.8)` | 866 |
| Labels | text | `English`, `বাংলা` (hard-coded, same in both locales) | 41–42 |

## Steps
1. Write `tests/unit/composables/useLocale.spec.ts` first (8 tests in `test-criteria.md`). Run `npm run test` → red or green against the draft; record the baseline.
2. Open `app/composables/useLocale.ts`. Make it match the "Files" row above: state key `bb-lang`, default `'en'`, `DICTS` typed `Record<LangCode, LocaleContent>`, return `{ lang, L, setLang }`. Remove the JSDoc comment block.
3. Run `npm run test` → composable tests green.
4. Write `tests/unit/components/LangToggle.spec.ts` (6 tests in `test-criteria.md`).
5. Create `app/components/layout/LangToggle.vue`: 2 buttons with `type="button"`, `:aria-pressed="lang === 'en'"` / `:aria-pressed="lang === 'bn'"`, `lang="bn"` on the Bangla button, `@click="setLang('en')"` / `@click="setLang('bn')"`. Style by `[aria-pressed="true"]` / `[aria-pressed="false"]` in scoped CSS with the values in the table. No comments.
6. Run `npm run test` → toggle tests green.
7. Edit `app/components/layout/UtilityBar.vue`: put `<LayoutLangToggle />` where the `.toggle` div was; delete the now-unused CSS rules; keep `L` in the destructure.
8. Edit `app/layouts/default.vue`: add the `useHead({ htmlAttrs: { lang } })` script block.
9. Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run generate` → all exit 0.
10. Run `npx serve .output/public`, open a new Chrome DevTools MCP tab, run the Visual QA list next to the prototype (`02-Design/Bangladesh Bank.html` opened in a second tab).
11. Ask the user for approval, then commit (`feat(cp04): useLocale and language toggle`).

## Design source
`02-Design/Bangladesh Bank.html`:
- Line 503: `state = { view: 'home', lang: 'en' };` — default language `en`, in memory.
- Lines 511–512: `setEn` / `setBn` — set `lang`, nothing else (no `scrollTo`, no URL change).
- Lines 40–43: the pill wrapper and the 2 buttons (`English`, `বাংলা`).
- Line 854: `const L = T[lang];` — the whole dictionary switches at once.
- Lines 864–866: `onSt` / `offSt` style strings.
- Lines 898–899: `enBtnStyle` / `bnBtnStyle` pick `onSt` for the active language.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| State holder | `useState<LangCode>('bb-lang', () => 'en')` | Shared across all components, created once per request on the server, serialized into the payload, so server HTML and client agree (no hydration mismatch). |
| `L` | `computed` over a static `DICTS` map | Matches prototype line 854; switching swaps one reference, no copying. |
| Persistence | None — reload shows English | Prototype keeps `lang` in memory only (line 503). Reading `localStorage` before hydration would also cause an `en`→`bn` flash on SSG pages. |
| URL | No locale prefix, no query param | `architecture.md`: "Toggling language re-renders content with no URL change". 5 routes stay 5 generated files. |
| Toggle as its own component | `layout/LangToggle.vue` → `<LayoutLangToggle>` | One responsibility per file; CP07 can rebuild the utility bar without touching toggle logic. |
| Active styling hook | `[aria-pressed]` attribute selectors instead of `.on` / `.off` classes | One source for state: the same attribute drives screen readers and visuals, so they cannot disagree. |
| `<html lang>` | `useHead({ htmlAttrs: { lang } })` in `layouts/default.vue` | WCAG 3.1.1: screen readers switch voice to Bangla. `app.vue` stays "`<NuxtLayout><NuxtPage/></NuxtLayout>` — nothing else" (architecture.md). Generated HTML keeps `lang="en"` (the default). |
| Accessibility additions | `aria-pressed`, `type="button"`, `lang="bn"` on `বাংলা` | Decision D1: invisible additions only; no default-state pixel changes. |

## Risks
| Risk | Mitigation |
|------|------------|
| A component calls `T`/`en` directly and ignores the toggle | CP11 grep: `import { en }` / `import { bn }` appear only in `app/composables/useLocale.ts` and tests. |
| `useState` key collision | Key `bb-lang` is unique; test asserts two `useLocale()` calls share the same ref. |
| Hydration mismatch warning on load | Default is the same on server and client (`'en'`); Visual QA checks the console for `Hydration` warnings. |
| Language resets when moving between routes | `useState` survives client-side navigation; re-checked in CP06 when real routes exist. |
| Removing the draft `.toggle` CSS breaks the utility bar layout | Visual QA compares the utility bar at 1280 px to the prototype before commit. |

## Estimated effort
2 hours.
