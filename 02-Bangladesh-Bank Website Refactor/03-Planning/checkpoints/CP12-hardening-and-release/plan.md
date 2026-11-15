# CP12 — Production hardening and release: Plan

Paths are relative to `Bangladesh Bank New Website/`, except `.github/` which sits at the repository root (`ai-workshop-bangladesh-bank/.github/`) and uses `working-directory`.

## Files to create or change
| File | Action | Responsibility |
|------|--------|----------------|
| `nuxt.config.ts` | Change | Prerender list, `failOnError`, `runtimeConfig.public.siteUrl`, favicon link, `theme-color` meta. |
| `app/layouts/default.vue` | Change | `useSeoMeta` defaults (`ogSiteName`, `ogType: 'website'`, `ogLocale` `en_US` / `bn_BD` from `lang`) and canonical `<link>` built from `siteUrl + route.path`. |
| `app/pages/index.vue` | Change | `useSeoMeta({ title: L.bankName, description: L.metaDescription })`. |
| `app/components/inner/InnerPage.vue` | Change | `useSeoMeta({ title: page.title · L.bankName, description: page.lead })` replaces the CP10 `useHead` title. |
| `app/error.vue` | Create | Static 404 inside the default layout: `<h1>` `L.notFoundTitle`, `NuxtLink to="/"` `L.notFoundBack`; same tokens as the inner header (#E4F1EC band, #006A4E heading 26 px). |
| `app/i18n/types.ts`, `en.ts`, `bn.ts` | Change | Add `metaDescription`, `notFoundTitle`, `notFoundBack`. Text approved by the owner; Bangla reviewed by the native speaker (R1). |
| `public/robots.txt` | Change | Keep `User-Agent: *` / `Disallow:`; add `Sitemap: <SITE_URL>/sitemap.xml`. |
| `public/sitemap.xml` | Create | 5 `<url><loc>` entries for `/`, `/monetary-policy`, `/financial-system`, `/publications`, `/services`. |
| `public/_headers` | Create | Security and cache headers (Netlify / Cloudflare Pages format); `../08-Deploy/nginx-headers.conf` holds the nginx equivalent. |
| `package.json` | Change (scripts only, no dependency changes) | Add missing scripts: `lint`, `typecheck`, `test`, `check:port`, `check:routes`, `ci`. |
| `.github/workflows/ci.yml` | Create | Runs every gate on `push` and `pull_request`. |
| `CHANGELOG.md` | Create | `## v1.0.0` — features, audit fixes 1–9, D3/D4 visual exceptions, known limitations (R2 placeholder links). |
| `../05-Qa/CP12-release-report.md` | Create | Lighthouse scores (5 routes × desktop/mobile), bundle sizes, `npm audit` output, header check. |

Config snippets (short, as allowed):

`nuxt.config.ts` additions (`siteUrl` is filled by `NUXT_PUBLIC_SITE_URL` at generate time):

```ts
runtimeConfig: { public: { siteUrl: '' } },
nitro: {
  preset: 'static',
  prerender: {
    routes: ['/', '/monetary-policy', '/financial-system', '/publications', '/services'],
    crawlLinks: true,
    failOnError: true,
  },
},
```

```json
"scripts": {
  "lint": "eslint .",
  "typecheck": "nuxi typecheck",
  "test": "vitest run",
  "check:port": "! grep -rnE 'sc-for|sc-if|style-hover|<image-slot|onClick=\"\\{\\{' app/",
  "check:routes": "test -f .output/public/index.html && test -f .output/public/monetary-policy/index.html && test -f .output/public/financial-system/index.html && test -f .output/public/publications/index.html && test -f .output/public/services/index.html && test -f .output/public/404.html",
  "ci": "npm run lint && npm run typecheck && npm run test && npm run check:port && npm run generate && npm run check:routes"
}
```

`public/_headers`:

```text
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://rsms.me https://fonts.googleapis.com; font-src 'self' https://rsms.me https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Cache-Control: no-cache
/_nuxt/*
  Cache-Control: public, max-age=31536000, immutable
```

CI job steps (`.github/workflows/ci.yml`, `defaults.run.working-directory: "02-Bangladesh-Bank Website Refactor/Bangladesh Bank New Website"`): checkout → setup Node (version from `.nvmrc`, npm cache) → `npm ci` → `npm run lint` → `npm run typecheck` → `npm run test` → `npm run check:port` → `NUXT_PUBLIC_SITE_URL=${{ vars.SITE_URL }} npm run generate` → `npm run check:routes` → `npm audit --omit=dev --audit-level=high` → upload `.output/public` as artifact `site-${{ github.sha }}` (retention 30 days).

## Steps
1. Create branch `cp12-hardening-and-release` from the CP11 green commit.
2. Ask the owner for 3 inputs and record answers in `../08-Deploy/release-inputs.md`: production `SITE_URL`, hosting target (Netlify / Cloudflare Pages / nginx), approved `metaDescription` text in en and bn.
3. Load the `vet-before-install` skill for each GitHub Action the workflow will use (`actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`); show the licence and security report; wait for approval. Do not add the workflow before approval.
4. Add the `nuxt.config.ts` additions (snippet above), the favicon `<link rel="icon" href="/favicon.ico">` and `<meta name="theme-color" content="#006A4E">`.
5. Add `metaDescription`, `notFoundTitle`, `notFoundBack` to `types.ts`, `en.ts`, `bn.ts`; run the key-parity test.
6. Add `useSeoMeta` to `index.vue`, `InnerPage.vue` and defaults plus the canonical link to `layouts/default.vue`.
7. Create `app/error.vue`; run `npm run generate` and confirm `.output/public/404.html` contains `notFoundTitle` in English.
8. Update `public/robots.txt`, create `public/sitemap.xml` with `SITE_URL` from step 2.
9. Create `public/_headers` (or `../08-Deploy/nginx-headers.conf` with `add_header` lines for the same 5 headers if the host is nginx).
10. Add the 6 scripts to `package.json`; run `npm run ci` locally until it exits 0.
11. Release hygiene checks: `find .output/public -name "*.map"` prints nothing; `grep -rn "console\." app/` prints nothing; `npm audit --omit=dev --audit-level=high` exits 0.
12. Bundle budget: `find .output/public/_nuxt -name "*.js" -exec cat {} + | gzip -c | wc -c` ≤ 153600 bytes (150 KB); `wc -c .output/public/index.html` ≤ 102400 bytes (100 KB). Record values.
13. Serve the build (`npx serve .output/public -l 3000`) and run Lighthouse with Chrome DevTools MCP `lighthouse_audit` on all 5 routes, desktop and mobile. Targets: Accessibility ≥ 95, Performance ≥ 90, SEO ≥ 95, Best Practices ≥ 95. If Performance < 90 only because of font requests, propose self-hosting Inter and JetBrains Mono (both SIL OFL 1.1) through `vet-before-install` and wait for approval.
14. Add `.github/workflows/ci.yml` (steps listed above), push the branch only after approval, and confirm the run is green.
15. Write `CHANGELOG.md` `v1.0.0` and `../05-Qa/CP12-release-report.md`.
16. Walk the master Definition of done (migration-plan.md Section 9) and tick each line with evidence in the release report.
17. Ask for explicit approval, then commit `chore(release): CP12 production hardening`, run `npm version 1.0.0 --no-git-tag-version`, and create `git tag -a v1.0.0 -m "Bangladesh Bank website v1.0.0"`. Push the branch and tag only after a separate explicit approval.

## Design source
No new porting. Values reused from `02-Design/Bangladesh Bank.html`:
- Lines 11–15 — font links (rsms.me Inter, Google Fonts JetBrains Mono 400/500/700, `display=swap`) that the CSP must allow.
- Line 49 — masthead `#006A4E` used as `theme-color`.
- Lines 324–337 — inner header band (#E4F1EC, #C5E0D6, `<h1>` 26 px #006A4E) reused by `error.vue`.
- Lines 545 / 700 — `bankName` en/bn used as home `<title>`.
- Lines 638–695 / 793–850 — `pages.*.lead` used as inner-route meta descriptions.

## Decisions
| Decision | Choice | Reason |
|----------|--------|--------|
| Headers delivery | `public/_headers` file (+ nginx equivalent) instead of `<meta http-equiv>` | `frame-ancestors`, HSTS and cache headers do not work from a meta tag; static output has no server code. |
| CSP `script-src 'unsafe-inline'` | Accepted for v1.0.0 | Nuxt SSG inlines the payload and hydration script; hash-based CSP needs a build step per release. Revisit in a later phase. |
| Meta description source | Inner routes use `page.lead`; home uses new key `metaDescription` | Inner leads are prototype copy (no new text); only one new string needs approval. |
| Site URL | `runtimeConfig.public.siteUrl` from `NUXT_PUBLIC_SITE_URL` at generate time | Same build config for staging and production; no hard-coded domain. |
| Lighthouse in CI | Not in v1.0.0; manual runs recorded in the release report | `@lhci/cli` is a new dependency that needs `vet-before-install`; the Definition of done requires lint, typecheck, Vitest and `generate` in CI, which this covers. |
| Fonts | Keep CDN links from the prototype | Fidelity and no download; self-host only if Performance < 90 and after vetting. |
| Version and tag | `1.0.0`, annotated tag `v1.0.0` | First production release of the migration; commit, tag and push each need explicit approval. |

## Risks
| Risk | Mitigation |
|------|------------|
| CSP blocks the Inter or JetBrains Mono stylesheet/font | CSP allows `https://rsms.me`, `https://fonts.googleapis.com`, `https://fonts.gstatic.com`; check console for "Refused to load" on all 5 routes after deploy to staging. |
| `crawlLinks` finds placeholder `<a>` without `href` and fails | Placeholder links have no `href`, so the crawler skips them; `failOnError: true` surfaces any real broken link. |
| `SITE_URL` unknown at release time | Step 2 blocks on it; staging can use a temporary URL, and `sitemap.xml` is regenerated before the production tag. |
| GitHub Action versions change behavior | Pin to the major tags vetted in step 3; record the commit SHA of each in the release report. |
| `npm audit` reports a high vulnerability in a transitive dependency | Report it to the owner with the advisory link; upgrading a dependency is a new vetting cycle, not a silent fix. |
| Rollback needed after deploy | Each CI run uploads `site-<sha>` for 30 days; redeploy the previous artifact. |

## Estimated effort
8 hours (3 h config, SEO and 404, 2 h CI and vetting, 2 h Lighthouse and release checks, 1 h changelog and report).
