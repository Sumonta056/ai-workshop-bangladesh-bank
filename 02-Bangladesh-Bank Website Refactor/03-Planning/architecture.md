# Architecture

A reusable blueprint for porting a single-file HTML design into a modular, static
Nuxt 4 site. The Bangladesh Bank site follows this pattern; replicate it for
similar "faithful HTML → Nuxt SSG" projects.

## Stack

- **Nuxt 4** with `srcDir = app/`.
- **Vue 3** `<script setup lang="ts">` SFCs.
- **SSG only** — `nitro: { preset: 'static' }`, `ssr: true`. Build with
  `npm run generate` → `.output/public/`. No backend, no server routes, no
  runtime fetching.
- **Scoped CSS + design tokens.** No CSS framework.

## Core principle

The original HTML is the **specification**. Everything (colors, spacing, fonts,
copy in every language, structure, hover/behavior) is transcribed verbatim.
Nuxt conventions yield to pixel fidelity when they conflict.

## Layered structure

```
app/
├─ app.vue                 # <NuxtLayout><NuxtPage/></NuxtLayout> — nothing else
├─ layouts/default.vue     # global chrome: utility bar, masthead, nav, ticker, footer + <slot/>
├─ pages/                  # one file per real route — thin, compose components only
├─ components/
│  ├─ base/                # primitives (BaseIcon, ImageSlot)
│  ├─ layout/              # site-wide chrome pieces
│  ├─ home/                # landing-page sections + their item components
│  └─ inner/               # shared inner-page system (see below)
├─ composables/            # auto-imported state/logic (useLocale, useNav)
├─ data/                   # static config modules (routes, icons) — imported explicitly
├─ i18n/                   # typed locale content (en.ts, bn.ts, types.ts)
└─ assets/css/             # tokens.css (design tokens) + base.css (resets/globals)
```

### Responsibility rules

- **Pages are thin.** A page composes section components and passes data; it
  holds no markup that belongs in a component. (See `app/pages/index.vue`.)
- **One responsibility per file.** A section with repeated items extracts the
  item into its own component — e.g. `home/NewsRates.vue` renders many
  `home/MarketCard.vue`.
- **Component naming follows path nesting.** Nuxt flattens by directory, so
  `home/MarketCard.vue` → `<HomeMarketCard>`, `inner/DataTable.vue` →
  `<InnerDataTable>`. Use the flattened name in templates.
- **Auto-imports:** everything in `components/**` and `composables/**` is
  auto-imported — no manual imports. Plain modules in `i18n/*` and `data/*` are
  imported explicitly (`import { en } from '~/i18n/en'`).

## Data-driven content (i18n)

All copy lives in `app/i18n/en.ts` and `bn.ts`, both satisfying the single
`LocaleContent` interface in `types.ts`. The shared type means the two locales
**cannot drift in shape** — adding a field forces both to provide it.

- `useLocale()` (`composables/useLocale.ts`) holds the active language in
  `useState` and exposes `L` (a `computed` of the current dict) plus `setLang`.
  Toggling language re-renders content with **no URL change**, mirroring the
  original SPA.
- Components stay dumb: they receive a typed slice of `L` as a prop and render
  it. See `MarketCard.vue` taking a `MarketCard` prop.

## Routing & navigation

- Each logical "view" from the original SPA becomes a **real route**. The
  mapping lives in `data/routes.ts` (`VIEW_ROUTES`).
- `useNav()` (`composables/useNav.ts`) builds the primary-nav items: labels from
  the current locale, `active` derived from `useRoute().path`. `to: null`
  reproduces original no-op links that render but don't navigate.

### The shared inner-page system

Multiple inner views (monetary-policy, financial-system, publications, services)
share **one** data-driven template, `inner/InnerPage.vue`. Each route file is a
one-liner:

```vue
<template><InnerPage view="mp" /></template>
```

`InnerPage` reads `L.pages[view]` and conditionally renders highlight card, link
groups, data tables, and sidebar from that data. Add an inner view by adding its
content to the locale `pages` map and a thin page file — no new layout code.

## Styling

- **Design tokens** in `assets/css/tokens.css` (`--bb-*`) hold the palette,
  fonts, and layout widths — exact values from the original. Use tokens for any
  repeated value; one-off exact values may be inline in scoped CSS.
- **Scoped `<style>` per component.** No global class leakage.
- The design tool's `style-hover="..."` attribute is converted to real scoped
  `:hover` rules with the exact source values.
- Transitions copy the source duration + easing exactly.
- Fonts: `var(--bb-font)` (Inter) for UI, `var(--bb-mono)` (JetBrains Mono) for
  numbers/rates, with `font-variant-numeric: tabular-nums` where the source uses
  it. Loaded via `<link>` in `nuxt.config.ts`.

## How to replicate for a new design

1. Scaffold Nuxt 4 with `srcDir: app/`, `ssr: true`, `nitro.preset: 'static'`.
2. Extract the palette/fonts/layout constants into `assets/css/tokens.css`.
3. Define `LocaleContent` in `i18n/types.ts`; transcribe content into per-locale
   dicts. Wire `useLocale()`.
4. Map each view to a route in `data/routes.ts`; wire `useNav()`.
5. Build global chrome in `layouts/default.vue`.
6. Port one section at a time into `components/<domain>/`, each a self-contained
   SFC: typed props + scoped CSS + tokens. Verify against the original before
   moving on.
7. Collapse repeated view shapes into one data-driven component (the
   `InnerPage` pattern).
8. Keep pages thin; verify the static build with `npm run generate`.
