# CP04 — `useLocale` composable and language switch: Test Criteria

Run every command inside `Bangladesh Bank New Website/`.

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors
- [ ] `.output/public/index.html` contains `<html lang="en"`
- [ ] `grep -rn "import { en }\|import { bn }" app` lists only `app/composables/useLocale.ts`
- [ ] `useLocale.ts` and `LangToggle.vue` contain 0 comments

## Unit tests (Vitest)
File: `tests/unit/composables/useLocale.spec.ts`

| Test | Input | Expected result |
|------|-------|-----------------|
| Default language | `useLocale()` on a fresh Nuxt app | `lang.value === 'en'` |
| Default content | `L.value.bankName` | `'Bangladesh Bank'` |
| Switch to Bangla | `setLang('bn')` | `lang.value === 'bn'`, `L.value.bankName === 'বাংলাদেশ ব্যাংক'`, `L.value.nav.home === 'মূলপাতা'` |
| Switch back | `setLang('bn')` then `setLang('en')` | `L.value.searchPh === 'Search the site'` |
| Shared state | Two calls `a = useLocale()`, `b = useLocale()`; `a.setLang('bn')` | `b.lang.value === 'bn'` |
| Idempotent | `setLang('bn')` twice | `lang.value === 'bn'`, no error |
| Whole dict swaps | After `setLang('bn')` | `L.value` is the same object as the exported `bn` (`toBe(bn)`) |
| No URL change | `useRouter().currentRoute.value.fullPath` before and after `setLang('bn')` | Equal (`'/'`) |

File: `tests/unit/components/LangToggle.spec.ts` (`mountSuspended(LayoutLangToggle)`)

| Test | Input | Expected result |
|------|-------|-----------------|
| Renders 2 buttons | Mount | 2 `button[type="button"]` with text `English` and `বাংলা` |
| Initial pressed state | Mount (lang `en`) | `English` has `aria-pressed="true"`, `বাংলা` has `aria-pressed="false"` |
| Click Bangla | `trigger('click')` on `বাংলা` | `useLocale().lang.value === 'bn'`; `aria-pressed` flips |
| Click English | Then click `English` | `lang.value === 'en'` |
| Bangla label language | `বাংলা` button | Has attribute `lang="bn"` |
| No design-tool syntax | Component source text | 0 matches for `onClick="{{`, `style-hover`, `sc-if` |

`npm run test` reports all CP01–CP04 tests passed, 0 failed.

## Visual QA (Chrome DevTools MCP vs prototype)
Serve with `npx serve .output/public`. Open `http://localhost:3000/` in a new tab (`new_page`) and the prototype `02-Design/Bangladesh Bank.html` in a second tab. Viewport 1280 px. Use `select_page` before each action.
- [ ] Pill wrapper: `border` = `1px solid rgba(255, 255, 255, 0.28)`, `border-radius` = `999px`, `overflow` = `hidden`
- [ ] Active `English` button: `background-color` = `rgb(255, 255, 255)`, `color` = `rgb(10, 61, 44)` (`#0A3D2C`)
- [ ] Inactive `বাংলা` button: `background-color` = `rgba(0, 0, 0, 0)`, `color` = `rgba(255, 255, 255, 0.8)`
- [ ] Both buttons: `font-size` = `11.5px`, `font-weight` = `600`, `padding` = `6px 13px`, `font-family` starts with `Inter`
- [ ] Pill bounding box width and height equal the prototype's pill (±0 px) in a side-by-side screenshot
- [ ] Click `বাংলা`: masthead name = `বাংলাদেশ ব্যাংক`, search placeholder = `সাইটে অনুসন্ধান করুন`, notice tag = `নোটিশ`; styles of the 2 buttons swap
- [ ] After the click, `location.href` is still `http://localhost:3000/` and the Network panel shows no new document request
- [ ] After the click, `document.documentElement.lang` = `bn`; click `English` → `en`
- [ ] Reload the page: language is `English` again (same as prototype)
- [ ] Console has 0 errors and 0 warnings (including no `Hydration` mismatch message)
- [ ] Close both tabs with `close_page`

## Accessibility
- [ ] WCAG 3.1.1 Language of Page: `<html lang>` = `en` in English and `bn` in Bangla
- [ ] WCAG 3.1.2 Language of Parts: the `বাংলা` button has `lang="bn"`
- [ ] WCAG 4.1.2 Name, Role, Value: accessibility tree (`take_snapshot`) shows 2 buttons named `English` and `বাংলা`, each with a `pressed` state that matches the active language
- [ ] WCAG 2.1.1 Keyboard: `Tab` reaches both buttons; `Enter` and `Space` switch the language
- [ ] WCAG 2.4.7 Focus Visible: a focus indicator is visible on each button when tabbed to (no `outline: none` without a replacement)
- [ ] WCAG 2.5.8 Target Size (Minimum): each button's bounding box is ≥ 24 × 24 px

## Responsive
Prototype has 0 `@media` rules; full layout breakpoints are CP11 (D2). Check only the toggle, with `resize_page`:
- [ ] 1280 px — pill is fully visible in the utility bar and matches the prototype screenshot
- [ ] 768 px — both buttons are visible and clickable; clicking `বাংলা` switches the language
- [ ] 375 px — both buttons are reachable (scroll if needed) and clickable; clicking `বাংলা` switches the language; overflow of the rest of the utility bar is logged for CP11, not fixed here

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
