# CP03 — i18n contract (`types.ts`, `en.ts`, `bn.ts`): Goal

## Goal
`app/i18n/types.ts` defines `LangCode`, `InnerPageKey` and `LocaleContent` covering all 65 top-level keys of the prototype's `T` dictionary, and `app/i18n/en.ts` and `app/i18n/bn.ts` are deep-equal to `T.en` and `T.bn` (359 leaf values each), proven by a test that reads the prototype file.

## Why this checkpoint exists
Every visible word on the site, in both languages, comes from this dictionary. If the shape is loose, a component can read `L.newsTitle` in English and get `undefined` in Bangla, and nobody sees it until a user switches language. If the copy is retyped by hand, Bangla text drifts (risk R1). A shared `LocaleContent` type makes shape drift a compile error, and a deep-equal test against the prototype makes copy drift a test failure. CP04 (`useLocale`) and every component from CP07 onward depend on these types.

## In scope
- `app/i18n/types.ts`: `LangCode = 'en' | 'bn'`, `InnerPageKey = 'mp' | 'fin' | 'pub' | 'svc'`, `LocaleContent` and its 14 item interfaces.
- `app/i18n/en.ts` and `app/i18n/bn.ts`: exact transcription of `T.en` (prototype lines 542–696) and `T.bn` (lines 697–851), including the nested `pages` map for the 4 inner views.
- A fidelity test that extracts `T` from the prototype at test time and deep-compares.
- A key-parity test between `en` and `bn`.

## Out of scope
- The composable that picks the active language (CP04).
- The `ICONS` map (prototype lines 519–538) — CP05.
- The view → route map and nav handlers (lines 505–513, 857–862) — CP06.
- Hard-coded values outside `T`, such as the sidebar rates `10.00%`, `9.84%`, `123.10`, `4.00%` (lines 886–891) and the "Last updated" dates on lines 166 and 188 — they are ported with their components (CP09, CP10).
- Native-speaker review of the Bangla text (R1) — CP11.

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | No audit issue maps to CP03. It is the typed content base that CP07 (#9 search placeholder text) and CP09 (#8 bilingual hotline labels) read from. |

## Depends on
CP01

## Demo at the end
1. `npm run test` shows `tests/unit/i18n/fidelity.spec.ts` and `tests/unit/i18n/parity.spec.ts` green.
2. Delete the key `newsTitle` from `app/i18n/bn.ts` and run `npm run typecheck`: it fails with "Property 'newsTitle' is missing in type". Restore the key: it passes.
3. Change one Bangla character in `bn.ts` (for example `মূলপাতা` → `মুলপাতা`) and run `npm run test`: the fidelity test fails and prints the diff. Restore it: green.
