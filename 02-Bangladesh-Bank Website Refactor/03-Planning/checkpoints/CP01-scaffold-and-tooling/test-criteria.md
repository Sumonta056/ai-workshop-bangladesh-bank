# CP01 — Scaffold and tooling baseline: Test Criteria

Run every command inside `Bangladesh Bank New Website/`.

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npm run typecheck` exits 0, `npm run lint` exits 0)
- [ ] `.output/public/index.html` exists
- [ ] `.output/server/` does not exist (static preset only)
- [ ] `grep -rn "01-Bangldesh-Bank-Refactor-Design" .` (excluding `node_modules`) prints 0 lines
- [ ] `package.json` → `scripts` contains `lint`, `typecheck`, `test`, `generate`
- [ ] Every new dev dependency has an approved `vet-before-install` report

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| Static rendering on | `nuxt.config.ts` read as text | Contains `ssr: true` and `preset: 'static'` |
| No server routes | File system check | `server/` and `app/server/` do not exist |
| No design-tool syntax (R3) | Every `*.vue` and `*.ts` file under `app/` | 0 matches for `/<sc-(for\|if)\b/`, `/style-hover\s*=/`, `/hint-placeholder-/`, `/onClick\s*=\s*"\{\{/` |
| No design runtime ported | File list under `app/` and `public/` | No file named `support.js` or `image-slot.js` |

`npm run test` reports 4 passed, 0 failed.

## Visual QA (Chrome DevTools MCP vs prototype)
Open a new tab with `new_page` on `http://localhost:3000/` (served by `npx serve .output/public`).
- [ ] Page returns HTTP 200 for `/`
- [ ] Network: `https://rsms.me/inter/inter.css` returns 200 (prototype line 12)
- [ ] Network: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap` returns 200 (prototype line 15)
- [ ] `document.characterSet` is `UTF-8` (prototype line 4)
- [ ] Console has 0 errors and 0 warnings
- [ ] Close the tab with `close_page`

## Accessibility
- [ ] WCAG 3.1.1 Language of Page: `.output/public/index.html` has `<html lang="en"`
- [ ] WCAG 1.4.4 Resize Text: the viewport meta is exactly `width=device-width, initial-scale=1` (no `maximum-scale`, no `user-scalable=no`)

## Responsive
- [ ] 375 px, 768 px, 1280 px — N/A — no UI yet. Only check that the viewport meta tag above is present in the generated HTML.

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
