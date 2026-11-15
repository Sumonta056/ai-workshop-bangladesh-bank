# CP05 — Icon system: Goal

## Goal
Every icon in the prototype (the 18 keys of the `ICONS` map, `Bangladesh Bank.html` lines 519–538) renders through `<BaseIcon name="…" :size="…" />` with the same `viewBox`, stroke and size as the prototype's `svg()` helper (line 539), and is hidden from assistive technology.

## Why this checkpoint exists
The prototype builds icons at runtime with `React.createElement('svg', …)` and `dangerouslySetInnerHTML`. That helper is part of the design-tool runtime and is not ported (Risk R3). Without one typed icon component, CP07–CP10 would each copy SVG markup into their templates, the 1.75 stroke width and 24×24 `viewBox` would drift, and the `aria-hidden` fix that audit issue 7 needs would have to be repeated in 20 places instead of one.

## In scope
- `app/data/icons.ts`: the 18 path strings copied verbatim from lines 520–537 (`landmark`, `shield`, `globe`, `coins`, `card`, `trend`, `book`, `note`, `bank`, `cal`, `arrow`, `chev`, `search`, `phone`, `file`, `fb`, `x`, `yt`), the `IconName` type, and the two constants of the `svg()` helper (default size `22`, stroke width `1.75`).
- `app/components/base/BaseIcon.vue` (`<BaseIcon>`): props `name: IconName` (required) and `size?: number` (default `22`). It renders one `<svg>` with `aria-hidden="true"` and `focusable="false"`.
- The usage map in `plan.md` (which key, which size, which future component), so CP07–CP10 pick the correct size without reading the prototype again.
- One ESLint override so `vue/no-v-html` is allowed in `BaseIcon.vue` only.
- Unit tests in `tests/unit/icons.spec.ts` and `tests/unit/BaseIcon.spec.ts`.

## Out of scope
- Using `<BaseIcon>` inside layout or home components (CP07, CP08, CP09, CP10).
- New icons that the prototype does not have. The `pause` and `play` icons for the ticker control are added in CP07.
- Accessible names on icon-only links (the `aria-label` on the footer social links is CP07). CP05 only makes the icon itself decorative.
- An icon font, an SVG sprite, or any icon library package.

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | CP05 is the foundation for issue 7 (fixed in CP07): `BaseIcon` always renders `aria-hidden="true"` and `focusable="false"`, so a screen reader never reads raw SVG and the accessible name of an icon-only link comes only from its `aria-label`. |

## Depends on
CP01

## Demo at the end
- Terminal: `npx vitest run tests/unit/icons.spec.ts tests/unit/BaseIcon.spec.ts` shows all tests green, including "renders 18 icons".
- Terminal: `npx nuxi typecheck` fails on purpose when a temporary test file uses `<BaseIcon name="nope" />` (proves the `IconName` type guards the prop), then passes once that file is deleted.
- Browser: `npm run dev`, then open `/`. The temporary preview block (step 9 in `plan.md`, deleted before commit) shows all 18 icons in a row at 22 px in `#006A4E`, next to a screenshot of the same icons from the prototype.
