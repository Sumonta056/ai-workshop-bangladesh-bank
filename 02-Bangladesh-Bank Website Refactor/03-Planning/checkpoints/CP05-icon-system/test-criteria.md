# CP05 — Icon system: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors (`npx nuxi typecheck` and `npx eslint .` both exit 0)
- [ ] `grep -rn "eslint-disable" app/` returns nothing (the `v-html` exception lives only in `eslint.config.mjs`)
- [ ] The `check-port.mjs` hook reports nothing for `app/components/base/BaseIcon.vue` and `app/data/icons.ts`

## Unit tests (Vitest)
| Test | Input | Expected result |
|------|-------|-----------------|
| `icons.spec` key set | `Object.keys(ICONS)` | Exactly `['landmark','shield','globe','coins','card','trend','book','note','bank','cal','arrow','chev','search','phone','file','fb','x','yt']`, in this order, length 18 |
| `icons.spec` verbatim copy | Each `key: '…'` extracted from `02-Design/Bangladesh Bank.html` lines 519–538 | `ICONS[key]` is strictly equal (`toBe`) to the extracted string for all 18 keys |
| `icons.spec` x stroke | `ICONS.x` | Contains `stroke-width="2"` |
| `icons.spec` safe markup | Every `ICONS[key]` | Does not match `/<script|\son\w+=|href=/i` |
| `icons.spec` constants | `ICON_DEFAULT_SIZE`, `ICON_STROKE_WIDTH` | `22` and `1.75` |
| `BaseIcon.spec` default size | `mount(BaseIcon, { props: { name: 'arrow' } })` | Root element is `svg`; `width="22"`, `height="22"` |
| `BaseIcon.spec` custom size | `{ name: 'chev', size: 15 }` | `width="15"`, `height="15"` |
| `BaseIcon.spec` fixed attributes | `{ name: 'search', size: 17 }` | `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"` |
| `BaseIcon.spec` decorative | `{ name: 'fb', size: 16 }` | `aria-hidden="true"` and `focusable="false"`; no `role`, no `<title>` |
| `BaseIcon.spec` inner markup | `{ name: 'arrow' }` | `wrapper.element.innerHTML === '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>'` |
| `BaseIcon.spec` no wrapper | `{ name: 'landmark', size: 28 }` | `wrapper.element.tagName === 'svg'` and `wrapper.element.parentElement` is the mount container (no extra span) |
| `BaseIcon.spec` all names | Mount once for each of the 18 keys | Each mount has at least 1 child element inside the `<svg>` |

## Visual QA (Chrome DevTools MCP vs prototype)
Setup: tab A opens `file://…/02-Design/Bangladesh Bank.html`; tab B opens `http://localhost:3000/` (served by `npx serve .output/public`) with the temporary preview row from plan step 9. Viewport 1280 × 900.
- [ ] Tab B shows 18 icons. `document.querySelectorAll('svg[viewBox="0 0 24 24"]').length` in the preview row is `18`
- [ ] Each preview icon has a computed `color` of `rgb(0, 106, 78)` (`#006A4E`) and a stroke equal to `currentColor`
- [ ] Masthead search icon in tab A (line 61) and `<BaseIcon name="search" :size="17" />` in tab B: both have a bounding box of 17 × 17 px (`getBoundingClientRect()`)
- [ ] `arrow` at 16 px, `chev` at 15 px and `landmark` at 28 px: the screenshot of tab B (zoomed to 400 %) matches tab A's line 111, 81 and 53 icons. Same stroke thickness, round caps, same geometry
- [ ] `x` icon: both diagonal strokes look thicker than `fb` and `yt` (inner `stroke-width="2"` beats the root `1.75`)
- [ ] Console has 0 errors and 0 warnings (no Vue hydration mismatch)

## Accessibility
- [ ] WCAG 1.1.1 Non-text Content: every rendered `<svg>` from `BaseIcon` has `aria-hidden="true"`. In the Chrome DevTools MCP accessibility snapshot (`take_snapshot`), no node with role `img` or `graphics-document` comes from the preview row
- [ ] WCAG 2.1.1 Keyboard: pressing `Tab` through the preview row moves focus to no icon (`focusable="false"`, no `tabindex`)
- [ ] WCAG 4.1.2 Name, Role, Value: `BaseIcon` adds no `role` and no accessible name, so a parent link (CP07 social links) keeps the single name from its `aria-label`

## Responsive
- [ ] 375 px, 768 px, 1280 px: the preview row shows each icon at its fixed `width`/`height` attribute size (22 px default). Icons do not scale with the viewport, and no icon is clipped (`getBoundingClientRect().width === 22`)
- [ ] 375 px: zoom the browser to 200 %. Icons stay sharp (vector), with no pixelation

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
