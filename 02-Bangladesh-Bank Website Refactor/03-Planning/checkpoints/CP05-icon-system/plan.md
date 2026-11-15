# CP05 — Icon system: Plan

## Files to create or change
All paths are relative to `Bangladesh Bank New Website/`.

| File | Action | Responsibility |
|------|--------|----------------|
| `app/data/icons.ts` | Create | `ICONS` map (18 keys, path strings copied verbatim), `IconName` type, `ICON_DEFAULT_SIZE = 22`, `ICON_STROKE_WIDTH = 1.75` |
| `app/components/base/BaseIcon.vue` | Create | Render one `<svg>` for a given `name` and `size`. Decorative only. No wrapper element |
| `eslint.config.mjs` | Change | Turn off `vue/no-v-html` for `app/components/base/BaseIcon.vue` only |
| `tests/unit/icons.spec.ts` | Create | Data tests: key set, verbatim paths, no unsafe markup |
| `tests/unit/BaseIcon.spec.ts` | Create | Component tests: attributes, default size, custom size, inner markup |
| `app/pages/index.vue` | Temporary change, reverted before commit | Preview row of all 18 icons for the visual QA in step 9 |

## Steps
1. Open `02-Design/Bangladesh Bank.html` lines 519–538. Copy each value of the `ICONS` object into `app/data/icons.ts` character for character. Do not reformat the path strings and do not change attribute order. The `x` entry keeps its own `stroke-width="2"` (line 536). That inner attribute overrides the root `1.75`, exactly as in the prototype.
2. In the same file, export the object `as const` and derive `export type IconName = keyof typeof ICONS`. Export `ICON_DEFAULT_SIZE = 22` and `ICON_STROKE_WIDTH = 1.75` (the defaults of `svg(p, sz)` on line 539).
3. Create `app/components/base/BaseIcon.vue` with `<script setup lang="ts">`. Props: `name: IconName` (required) and `size?: number` (default `ICON_DEFAULT_SIZE`). Import `ICONS` explicitly from `~/data/icons` (data modules are not auto-imported).
4. In the template, render exactly one root `<svg>` with these attributes, which match line 539 one to one:
   `:width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="ICON_STROKE_WIDTH" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"`.
   Put the path string inside it with `v-html="ICONS[name]"`. Add no `class`, no `style` and no wrapper. The color comes from the parent's `color` through `currentColor`, the same as the prototype's `<span style="color:…;display:inline-flex">` wrappers.
5. Add this override to `eslint.config.mjs` (config only, no inline disable comment):
   ```js
   { files: ['app/components/base/BaseIcon.vue'], rules: { 'vue/no-v-html': 'off' } }
   ```
   Reason: the HTML comes from a constant in the repo, never from user input.
6. Write `tests/unit/icons.spec.ts` (see `test-criteria.md`). It reads `02-Design/Bangladesh Bank.html` with `fs.readFileSync`, extracts the 18 `key: '…'` pairs between `const ICONS = {` and `};` with a regular expression, and asserts that each one is equal to `ICONS[key]`. This proves a verbatim copy without anyone comparing by eye.
7. Write `tests/unit/BaseIcon.spec.ts` with `mount(BaseIcon, { props: { name: 'arrow' } })` from `@vue/test-utils`.
8. Run `npx vitest run`, `npx nuxi typecheck` and `npx eslint .`. All exit 0.
9. Temporary preview for visual QA. Add a `<div style="color:#006A4E;display:flex;gap:12px;padding:20px">` with one `<BaseIcon>` for each of the 18 names to `app/pages/index.vue`. Run `npm run generate && npx serve .output/public`. Compare it in Chrome DevTools MCP with the prototype (see `test-criteria.md`). Delete the preview block again.
10. Run `npm run generate` again without the preview. Commit after explicit approval: `git commit -m "feat(cp05): icon data and BaseIcon"`.

**Icon usage map (for CP07–CP10)**
Source: the view-model `return` on lines 903–906 and the arrays on lines 872 and 877. Each prototype `{{ xxxIcon }}` sits inside `<span style="display:inline-flex">`. The consuming component keeps that span and puts `<BaseIcon>` inside it.

| Key | Size (px) | Prototype line(s) | Consumer (checkpoint) |
|-----|-----------|-------------------|-----------------------|
| `landmark` | 28 | 53 (masthead crest) | `layout/Masthead.vue` (CP07) |
| `landmark` | 28, inside `transform:scale(.7)` | 440 (footer crest) | `layout/Footer.vue` (CP07) |
| `search` | 17 | 61 | `layout/Masthead.vue` (CP07) |
| `chev` | 15 | 81, 139, 328, 371, 421 | `layout/Ticker.vue` (CP07), news panel (CP09), inner header, link group, sidebar (CP10) |
| `arrow` | 16 | 111, 128, 209, 291, 356 | `home/MarketCard.vue`, `home/AuctionCard.vue` (CP08), module card, governor (CP09), highlight card (CP10) |
| `fb`, `x`, `yt` | 16 | 452, 453, 454 | `layout/Footer.vue` (CP07) |
| `trend` | 15 | 157 | policy rates header (CP09) |
| `bank` | 15 | 173 | reserve ratios header (CP09) |
| `phone` | 22 | 238 | CIPC banner (CP09) |
| `landmark`, `shield`, `globe`, `coins`, `card`, `trend`, `book`, `note` | 20 | 872, 874 (order = module order) | module cards (CP09) |
| `globe`, `file`, `note`, `shield`, `book` | 20 | 877, 878 (order = service order) | service cards (CP09) |
| `file` | 24 | 350 | highlight card (CP10) |
| `cal` | 15 | 905 (`calIcon`) | None. `calIcon` is built but never used in the markup. Keep the key so the data stays a faithful copy |

## Design source
- `02-Design/Bangladesh Bank.html` lines **519–538**: the `ICONS` map (18 path strings).
- Line **539**: the `svg(p, sz)` helper. It sets `width`/`height` = `sz || 22`, `viewBox '0 0 24 24'`, `fill 'none'`, `stroke 'currentColor'`, `strokeWidth 1.75`, `strokeLinecap 'round'` and `strokeLinejoin 'round'`.
- Lines **872–878** and **903–906**: which icon is used at which size (usage map above).

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| How to put the path markup into the SVG | `v-html` on the root `<svg>` with a trusted constant | The paths mix `<path>`, `<line>`, `<circle>`, `<rect>`, `<polygon>` and `<polyline>`. Parsing them into Vue nodes adds code and can change attribute order, and that risks a pixel change. The prototype also uses `innerHTML` (`dangerouslySetInnerHTML`) |
| Where the lint exception lives | `eslint.config.mjs` file override | The project rule is "no comments in code", so an inline `eslint-disable` comment is not allowed. The override is limited to one file |
| Accessibility default | Always `aria-hidden="true"` and `focusable="false"`, no `title` prop | Every icon in the prototype sits next to visible text or is a decorative crest. Icon-only links (footer social) get their name from `aria-label` on the `<a>` (CP07). This keeps the accessible name in one place |
| Wrapper element | None. `<svg>` is the root | The prototype's `<span style="display:inline-flex">` belongs to the parent and carries the parent's color, opacity and transform. If `BaseIcon` added its own span, the DOM would have one extra level and the inline-flex sizing would change |
| Type of `name` | `IconName = keyof typeof ICONS` | A typo such as `"chevron"` fails `nuxi typecheck` at build time instead of rendering an empty SVG |
| The unused `cal` icon | Keep it | The data stays a verbatim copy of the source, and the test can compare all 18 keys |

## Risks
| Risk | Mitigation |
|------|------------|
| A path string is retyped or "cleaned up" and one pixel changes | Step 6 test compares every string with the prototype file byte for byte |
| `v-html` is later fed non-constant data (XSS) | `name` is typed as `IconName`, so only keys of the constant map are possible. The test asserts that no path contains `<script`, `on…=` or `href` |
| Nuxt SSR and hydration produce different SVG markup | `npm run generate`, then open the page with the browser console showing 0 hydration warnings (test criteria) |
| Default size drift (a consumer forgets `size` and gets 22 instead of 15) | The usage map above lists the size for each place. CP07–CP10 test criteria check the rendered `width` attribute |
| `x` loses its inner `stroke-width="2"` | A unit test asserts that `ICONS.x` contains `stroke-width="2"` |

## Estimated effort
3 hours (1 h data and component, 1 h tests, 1 h visual QA and review)
