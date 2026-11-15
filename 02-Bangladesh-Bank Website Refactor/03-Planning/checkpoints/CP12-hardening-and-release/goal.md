# CP12 — Production hardening and release: Goal

## Goal
`.output/public/` is a deployable static site (5 routes + `404.html`, per-route SEO meta, `robots.txt`, `sitemap.xml`, security and cache headers file), meets Lighthouse Accessibility ≥ 95, Performance ≥ 90, SEO ≥ 95 and Best Practices ≥ 95 on all 5 routes, a GitHub Actions workflow enforces lint, typecheck, Vitest, `generate` and the port check on every push, and the approved build is tagged `v1.0.0`.

## Why this checkpoint exists
After CP11 the site is correct, but only on a developer laptop. Without CP12 nothing stops a later commit from breaking the build or reintroducing design-tool syntax, search engines have no sitemap or descriptions, the static host serves no security headers, and there is no versioned artifact to deploy or roll back to. This checkpoint turns a working build into a release that the Definition of done can sign off.

## In scope
- `nuxt.config.ts` hardening: explicit prerender routes, `failOnError: true`, `runtimeConfig.public.siteUrl`, favicon and `theme-color`.
- Per-route SEO: `useSeoMeta` (title, description, Open Graph) and canonical link on all 5 routes, in both languages.
- `public/robots.txt` with sitemap reference and `public/sitemap.xml` with the 5 URLs.
- `app/error.vue` for the static 404 page, bilingual.
- Host headers file `public/_headers`: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS, cache rules.
- `package.json` scripts for every gate; `.github/workflows/ci.yml`.
- Release checks: `npm audit`, no source maps, no `console.*`, bundle-size budget, Lighthouse on 5 routes.
- `CHANGELOG.md` entry and annotated tag `v1.0.0` (only after explicit approval).

## Out of scope
- Choosing and configuring the production host and DNS (owner decision; this plan supplies a host-neutral `_headers` file and an nginx equivalent).
- Real targets for placeholder links (R2) — listed as "Known limitations" in the changelog.
- Self-hosting fonts (only if Lighthouse Performance < 90; needs `vet-before-install` approval first).
- Lighthouse CI (`@lhci/cli`) in the pipeline — optional, needs `vet-before-install` approval; v1.0.0 uses recorded manual Lighthouse runs.
- Any visual change.

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |
|-------|----------|------------------------------|
| None | — | The master plan maps no audit issue to CP12. CI keeps the CP07–CP11 fixes from regressing: the Vitest suites that assert `tel:` links, `aria-label`s, ticker pause and `<html lang>` run on every push. |

## Depends on
CP11

## Demo at the end
Push a branch: the GitHub Actions "CI" run shows green steps for install, lint, typecheck, test, generate, port check, route check and audit. Locally: `npm run generate && npx serve .output/public -l 3000`, then `curl -I http://localhost:3000/publications` returns 200 and `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/nope` returns 404 with the bilingual not-found page. `git tag -n v1.0.0` shows the release note.
