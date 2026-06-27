# Bangladesh Bank — Prototype HTML → Nuxt 4 SSG Migration Plan

> Companion to `architecture.md`. Source of truth: `01-Bangldesh-Bank-Refactor-Design/Bangladesh Bank.html`
> (+ `support.js`, `image-slot.js` — design-tool runtime, **not** ported).

## 0. Guiding principles (non-negotiable)

1. **The HTML is the specification.** Every color, spacing value, font weight, copy string
   (en *and* bn), hover state, and transition is transcribed verbatim. Nuxt conventions
   yield to pixel fidelity.
2. **SSG only** — `ssr: true`, `nitro.preset: 'static'`. Build with `npm run generate` →
   `.output/public/`. No backend, no server routes, no runtime fetch.
3. **Preserve the prototype's data-driven pattern** — locale dict → typed props → dumb
   components. The prototype's view-model render function becomes `useLocale` + per-component props.
4. **One responsibility per file.** Repeated items extract into their own SFC.
5. **Incremental, verifiable steps.** Each checkpoint ends in a green build + visual diff
   against the original before the next begins.

## Prototype design pattern (the spec)

- Single design-tool export using a custom mini-template (`sc-for`, `sc-if`, `style-hover`,
  `{{ }}`) — a transcription source, not runtime code.
- **State:** `view` (`home` | `mp` | `fin` | `pub` | `svc`) + `lang` (`en` | `bn`). No URLs in
  the prototype; view switches are in-memory.
- **Content:** one `T = { en, bn }` dictionary; both share an identical shape including a nested
  `pages` map for the 4 inner views.
- **View-model:** a render function maps locale data + icons + click handlers into flat bindings.
  Repeated shapes (`marketCards`, `news`, `modules`, `services`, inner `groups`/`tables`) are
  list-driven.
- **Chrome:** utility bar → masthead → sticky nav → ticker → (home | inner) → footer.
- **Inner pages** = one shared template driven by `L.pages[view]` (highlight, link groups, data
  tables, sidebar) — the `InnerPage` pattern.

## Target structure (from architecture.md)

```
app/
├─ app.vue                      # <NuxtLayout><NuxtPage/></NuxtLayout>
├─ layouts/default.vue          # utility bar, masthead, nav, ticker, footer + <slot/>
├─ pages/                       # index.vue + mp/fin/pub/svc one-liners
├─ components/{base,layout,home,inner}/
├─ composables/                 # useLocale.ts, useNav.ts
├─ data/                        # routes.ts, icons.ts
├─ i18n/                        # en.ts, bn.ts, types.ts
└─ assets/css/                  # tokens.css, base.css
```

---

## The 12 Checkpoints

**Test/validate loop (every checkpoint):**
> **Build** → `npm run generate` succeeds → **Validate** (automated checks below) →
> **Vitest** unit/component suite green → **Live visual QA** via Chrome DevTools MCP
> (console clean, side-by-side diff vs `Bangladesh Bank.html`) → **Commit** on green.
> Never advance on red.

### CP1 — Scaffold + tooling baseline
- **Do:** Nuxt 4 init, `srcDir: app/`, `ssr: true`, `nitro.preset: 'static'`. TypeScript strict,
  ESLint + Prettier, Vitest + `@vue/test-utils` + `@nuxt/test-utils`. Load Inter + JetBrains Mono
  via `<link>` in `nuxt.config.ts` (same sources as prototype lines 11–15).
- **Validate:** `npm run generate` produces `.output/public/index.html`; lint + typecheck pass;
  one trivial Vitest passes.
- **Test loop:** smoke test that dev server boots and fonts resolve (DevTools MCP).
- **Exit:** empty app builds statically; CI runs the test command.

### CP2 — Design tokens + global base CSS
- **Do:** Extract palette (`#006A4E`, `#0A3D2C`, `#F42A41`, `#E4F1EC`, `#F4F6F8`, borders
  `#E0E4E8`, …), fonts, max-width `1240px`, gutters `40px` → `assets/css/tokens.css` (`--bb-*`).
  Port global resets (`box-sizing`, `::selection`, `a` reset) → `base.css`.
- **Validate:** no magic duplicates; a token sheet page renders each color/font.
- **Test:** snapshot test of the token sheet.
- **Exit:** every recurring value referenced from a token.

### CP3 — i18n contract (`types.ts` + en/bn dicts)
- **Do:** Define `LocaleContent` in `i18n/types.ts` covering **all** prototype keys (utility bar,
  masthead, nav map, ticker, marketCards, news, policyRates, reserves, auctions, modules,
  moreLinks, services, hotlines, usefulLinks, aboutLinks, footer, and
  `pages: { mp, fin, pub, svc }` with highlight/groups/tables/related). Transcribe `en.ts` and
  `bn.ts` verbatim from prototype lines ~519–853.
- **Validate:** both dicts satisfy `LocaleContent` (typecheck fails on drift); key-count parity test.
- **Test:** unit test — `Object.keys(en.pages)` deep-equals `Object.keys(bn.pages)` recursively.
- **Exit:** content layer complete and shape-locked. *(Highest-value early step.)*

### CP4 — `useLocale` composable
- **Do:** `useState`-backed active language, `L` computed of current dict, `setLang('en'|'bn')`.
  Mirrors `L = T[lang]` with no URL change.
- **Validate:** toggling re-renders without navigation.
- **Test:** `setLang('bn')` flips `L` to Bangla; default `en`.
- **Exit:** language state centralized and tested.

### CP5 — Icon system (`data/icons.ts` + `BaseIcon`)
- **Do:** Transcribe `ICONS` path map (lines 519–637) → `data/icons.ts`. Build
  `components/base/BaseIcon.vue` reproducing `svg(name, size)` (viewBox, size, currentColor).
- **Validate:** each icon renders at its prototype size; color inherits.
- **Test:** snapshot rendering all icons.
- **Exit:** `<BaseIcon name="landmark" :size="28" />` reusable everywhere.

### CP6 — Routing + `useNav`
- **Do:** `data/routes.ts` (`VIEW_ROUTES`: home→`/`, mp→`/monetary-policy`,
  fin→`/financial-system`, pub→`/publications`, svc→`/services`). `useNav()` builds nav items:
  labels from `L.nav`, `active` from `useRoute().path`, `to: null` for prototype no-op links
  (`about`, `fx`, `gsec`, `pay`). Create thin page files.
- **Validate:** each route resolves and statically generates; no-op nav items render but don't navigate.
- **Test:** `useNav` active-state per path; `nuxi generate` emits one HTML file per route.
- **Exit:** SPA views are real routes; deep-linkable.

### CP7 — Layout chrome (`layouts/default.vue`)
- **Do:** Port utility bar, masthead (crest, search box, lang toggle → `setLang`), sticky primary
  nav (`useNav` + `BaseIcon`), notice ticker, footer. Each piece → `components/layout/` SFC
  (`LayoutUtilityBar`, `LayoutMasthead`, `LayoutPrimaryNav`, `LayoutTicker`, `LayoutFooter`).
  `style-hover` → scoped `:hover` rules with exact source values.
- **Validate:** chrome pixel-matches original across both languages; sticky nav intact.
- **Test:** mount test for `LayoutPrimaryNav` (active underline `#006A4E`); lang toggle style-swap test.
- **Exit:** every route shows identical header/footer.

### CP8 — Home: market data row
- **Do:** Section rendering `home/MarketCard.vue` from `marketCards` (single vs dual variants,
  `font-variant-numeric: tabular-nums slashed-zero`) + upcoming-auctions card from `auctions`.
- **Validate:** 4-col grid, 16px gap, green top border, mono numerals match.
- **Test:** `MarketCard` props test for single/dual rendering.
- **Exit:** top of home page verified.

### CP9 — Home: remaining sections
- **Do:** Port news list, policy rates, reserves, modules grid (`modules` + icon/onClick → routes),
  services, hotlines, useful/about links. Each repeated shape → its own `home/` component.
- **Validate:** full home diffs clean in both languages; module/service cards navigate correctly.
- **Test:** snapshot of full `index.vue`; click-through test module→route.
- **Exit:** home view complete.

### CP10 — Shared inner-page system (`inner/InnerPage.vue`)
- **Do:** Data-driven inner template: breadcrumb, eyebrow+title+lead, conditional highlight card,
  `inner/LinkGroup.vue` (groups), `inner/DataTable.vue` (head + rows, mono right-aligned values),
  sidebar (`sideRates` + `related`). Each page file is a one-liner: `<InnerPage view="mp" />`.
- **Validate:** all four inner routes render from `L.pages[view]`; adding a view needs only locale
  data + a thin page.
- **Test:** `InnerPage` mounts each `view`, asserts highlight/groups/tables conditionals;
  `DataTable` row/column count test.
- **Exit:** inner-page system done; 4 inner views verified.

### CP11 — Full QA pass (visual + behavioral + a11y + responsive)
- **Do:** Review every route × every language. Verify transitions (durations/easing exact), hover
  states, sticky positioning, focus states, tab order, alt/aria on icons + search, responsive
  `max-vw` clamps.
- **Validate:** Chrome DevTools MCP — console clean, no layout shift, Lighthouse a11y check.
- **Test:** add component tests for gaps; fix and re-run full Vitest suite + `nuxi generate`.
- **Exit:** zero visual/behavioral deltas from prototype.

### CP12 — Production hardening + release
- **Do:** SEO meta/OG/`lang` per route, favicon/crest, 404 page, robots/sitemap, font preload,
  asset hashing check, bundle-size review. CI runs lint + typecheck + test + `generate` on every
  push. README run/build docs.
- **Validate:** Lighthouse (perf/SEO/a11y/best-practices) on generated output; CI green end-to-end.
- **Test:** full suite + `nuxi generate` in CI; serve `.output/public` and smoke-test all routes.
- **Exit:** deployable `.output/public/`; pipeline enforces quality gates.

---

## Risks & decisions to lock before CP3

- **Bangla content fidelity** — bn dict must be transcribed character-exact; budget a review pass.
- **`to: null` nav links** — confirm these stay non-navigating (faithful) vs. becoming stubs.
- **`image-slot.js` / `support.js`** — design-tool runtime, **not** ported; all icons/images become
  `BaseIcon` / static assets.

## Tooling decisions (locked)

- **Test loop:** Vitest (unit/component) + Chrome DevTools MCP (live visual/behavioral QA) at every
  checkpoint, gated by `nuxi generate`.
- **Build target:** TBD — scaffolding deferred until explicitly requested.
