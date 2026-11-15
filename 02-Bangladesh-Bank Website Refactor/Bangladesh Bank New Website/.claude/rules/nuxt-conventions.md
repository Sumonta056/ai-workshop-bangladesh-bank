# Rule: Nuxt 4 conventions

- **srcDir is `app/`.** All `components/`, `pages/`, `layouts/`, `composables/`,
  `assets/`, `i18n/`, `data/` live under `app/`.
- **Auto-imports:** components in `app/components/**` and composables in
  `app/composables/**` are auto-imported — do not write manual imports for them.
  Plain data modules (`app/i18n/*`, `app/data/*`) are imported explicitly.
- **Components are nested by domain:** `base/`, `layout/`, `home/`, `inner/`.
  Nuxt flattens the name by path, so `home/MarketCard.vue` is `<HomeMarketCard>`.
  Use the auto-generated names in templates.
- **Pages are thin.** A page file composes section components and passes data; it
  holds no markup that belongs in a component.
- **One responsibility per file.** Keep files small. If a section has sub-items
  (cards, rows), extract the item into its own component.
- **TypeScript everywhere.** Locale content is typed via `app/i18n/types.ts` so
  `en` and `bn` cannot drift in shape.
- **Static only.** No server routes, no runtime data fetching, no plugins beyond
  config-level setup. Verify with `npm run generate`.
