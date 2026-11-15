# PROMPT — Planning Phase: Bangladesh Bank Website Migration

## 1. Your role

Act as a senior software architect with 10 years of experience in Nuxt, Vue and front-end migrations.
Think in systems. Write so that a junior developer can follow every step.

**This is the PLANNING phase. Do NOT write application code.** Your job is to read the inputs and produce a plan, a set of checkpoint documents, an HTML presentation of the plan, and a short animated explainer video.

---

## 2. Inputs (read ALL of them before you plan)

| # | Input | Path (relative to `02-Bangladesh-Bank Website Refactor/`) | What it gives you |
|---|-------|-----------------------------------------------------------|-------------------|
| 1 | **New design (the prototype)** | `02-Design/Bangladesh Bank.html` | The visual and behavioral specification. Colors, spacing, fonts, copy (English + Bangla), hover states, layout. `support.js` and `image-slot.js` are design-tool runtime — read them, do not port them. |
| 2 | **UX audit report** | `01-Finding/Report/BB_UX_Audit_Report.html` | The 9 problems in the current live site (5 High, 3 Medium, 1 Low, 3 WCAG failures). The new site must fix each one. |
| 3 | **Architecture** | `03-Planning/docs/architecture.md` | The target folder structure, layer rules, i18n pattern, routing and styling rules. Follow it exactly. |
| 4 | **Target project** | `Bangladesh Bank New Website/` | The empty Nuxt project and its `.claude/` rules, agents and skills. Read `CLAUDE.md` and `.claude/rules/*` so the plan matches them. |

### Tech stack (locked — do not change)

- **Nuxt 4** with `srcDir: app/`
- **Vue 3** `<script setup lang="ts">` single-file components
- **TypeScript** strict mode
- **Static site generation (SSG) only** — `ssr: true`, `nitro.preset: 'static'`, build with `npm run generate`. No backend, no server routes, no runtime fetch.
- **Scoped CSS + design tokens** — no CSS framework
- **Two languages** — English (`en`) and Bangla (`bn`), typed dictionaries
- **Tests** — Vitest + `@vue/test-utils` for units, Chrome DevTools MCP for visual and browser checks

---

## 3. Rules for the plan

1. The prototype HTML is the specification. When a Nuxt convention conflicts with pixel fidelity, fidelity wins.
2. Keep the prototype's data-driven pattern: locale dictionary → typed props → simple components.
3. One responsibility per file. Extract repeated items into their own component.
4. Every audit issue from Input 2 must map to at least one checkpoint. Show this map.
5. Each checkpoint must end in a state that you can build, test and demo. Never move to the next checkpoint on a red result.
6. Every checkpoint uses the same loop: **Build → Validate → Unit test → Visual QA vs prototype → Commit on green.**
7. Write numbers, file paths and commands. Do not write vague text such as "make it nice" or "test well".

---

## 4. Required output (write everything into `03-Planning/`)

Create exactly this tree. Overwrite `docs/migration-plan.md` and `migration-plan.html` if they exist. Do **not** change `docs/architecture.md` or this `PROMPT.md`.

```
03-Planning/
├─ PROMPT.md                       ← this file (do not edit)
├─ docs/
│  ├─ architecture.md              ← input (do not edit)
│  └─ migration-plan.md            ← master plan (Section 5)
├─ migration-plan.html             ← presentation of the plan (Section 7)
├─ checkpoints/
│  ├─ CP01-<short-name>/
│  │  ├─ plan.md
│  │  ├─ goal.md
│  │  └─ test-criteria.md
│  ├─ CP02-<short-name>/ …
│  └─ CP12-<short-name>/ …
└─ video/
   └─ migration-explainer.html     ← 2.5-minute animated video (Section 8)
```

12 folders × 3 files = 36 checkpoint files. Use kebab-case for `<short-name>` (example: `CP01-scaffold-and-tooling`).

---

## 5. `docs/migration-plan.md` — the master plan

Include these sections in this order:

1. **Summary** — 5 lines or fewer: what we migrate, from what, to what, and why.
2. **Guiding principles** — from Section 3.
3. **Prototype analysis** — state model (`view`, `lang`), content dictionary shape, view-model, page chrome order, inner-page template.
4. **Target architecture** — the folder tree from `architecture.md` and one Mermaid diagram of the layers.
5. **Audit issue → checkpoint map** — a table: issue ID, severity, WCAG criterion, fixing checkpoint.
6. **The 12 checkpoints** — one row each: ID, name, goal in one sentence, depends on, folder link.
7. **The validation loop** — the common loop from Rule 6, with the exact commands.
8. **Risks and decisions** — each risk with its impact and its mitigation.
9. **Definition of done** for the full migration.

### Suggested checkpoint sequence (adjust only if your analysis shows a better order — then explain why)

| CP | Name |
|----|------|
| 01 | Scaffold and tooling baseline |
| 02 | Design tokens and global base CSS |
| 03 | i18n contract (`types.ts`, `en.ts`, `bn.ts`) |
| 04 | `useLocale` composable and language switch |
| 05 | Icon system (`data/icons.ts`, `BaseIcon`) |
| 06 | Routes and `useNav` |
| 07 | Layout chrome (utility bar, masthead, nav, ticker, footer) |
| 08 | Home — market data row |
| 09 | Home — remaining sections |
| 10 | Shared inner-page system (`InnerPage.vue`) and 4 inner pages |
| 11 | Full QA pass — visual, behavior, accessibility, responsive |
| 12 | Production hardening and release |

---

## 6. The 3 files in each checkpoint folder

Use these templates. Keep the headings exactly as written so that all 12 folders look the same.

### `goal.md` — WHY and WHAT

```markdown
# CPxx — <Name>: Goal

## Goal
<One sentence: the state of the project at the end of this checkpoint.>

## Why this checkpoint exists
<2–4 sentences. What breaks or gets harder if we skip it.>

## In scope
- …

## Out of scope
- …

## Audit issues addressed
| Issue | Severity | How this checkpoint fixes it |

## Depends on
CPxx, CPyy (or "none")

## Demo at the end
<What you can show in the browser or terminal when this checkpoint is done.>
```

### `plan.md` — HOW

```markdown
# CPxx — <Name>: Plan

## Files to create or change
| File | Action | Responsibility |

## Steps
1. …  (one action per step, in order)

## Design source
<Exact section / line range in `Bangladesh Bank.html` that this checkpoint ports.>

## Decisions
| Decision | Choice | Reason |

## Risks
| Risk | Mitigation |

## Estimated effort
<hours>
```

### `test-criteria.md` — HOW WE KNOW IT WORKS

```markdown
# CPxx — <Name>: Test Criteria

## Build
- [ ] `npm run generate` exits 0
- [ ] No TypeScript errors, no lint errors

## Unit tests (Vitest)
| Test | Input | Expected result |

## Visual QA (Chrome DevTools MCP vs prototype)
- [ ] <Exact element, exact value — e.g. "nav background is #0B5D3B">
- [ ] Console has 0 errors and 0 warnings

## Accessibility
- [ ] <Specific WCAG check, with criterion number>

## Responsive
- [ ] 375 px, 768 px, 1280 px — <what to check>

## Exit gate
All boxes above are checked. If one box fails: fix, re-run the full loop, then commit.
```

---

## 7. `migration-plan.html` — the presentation page

Make one self-contained HTML file that I can open in a browser and show on a projector.

- **No external dependencies** except Google Fonts. Inline all CSS and JS.
- **Use the Bangladesh Bank colors** from the prototype's design tokens.
- **Sections:**
  1. Hero — project name, from → to, the 4 inputs as cards.
  2. Architecture — the layer diagram as inline SVG.
  3. Timeline — 12 checkpoints as a horizontal or vertical timeline. Click a checkpoint to expand its goal, plan steps and test criteria.
  4. Audit issue map — the table from Section 5.5, with severity badges.
  5. Validation loop — an animated loop diagram (Build → Validate → Test → Visual QA → Commit).
  6. Risks and decisions.
- Support light and dark mode. Make it readable on a phone (no horizontal scroll).

---

## 8. `video/migration-explainer.html` — the 2.5-minute animated video

Make one self-contained HTML file that plays like a video. I will screen-record it.

- **Length:** 150 seconds, auto-play, then stop on the last frame.
- **Pace:** fast. Elements enter in 0.3–0.5 s. Nothing stays still for more than 3 s. No empty pauses between scenes.
- **Controls:** Play/Pause button, Restart button, a progress bar and a scene label.
- **Format:** 16:9 stage, centered, scales to the window.
- **Technology:** plain HTML, CSS animations and vanilla JavaScript only. No libraries, no install, no external files.
- **Style:** clean motion graphics — shapes slide, fade and connect. Large text, one idea per beat. Bangladesh Bank colors.
- **Captions:** each scene shows a short caption at the bottom, so the video works with no sound. The caption explains, it does not only name the scene.

### Storyboard (follow these timings)

| Time | Scene | What the viewer sees |
|------|-------|----------------------|
| 0:00–0:06 | 1. Title | "Bangladesh Bank — Website Migration Plan". Logo-style mark animates in. |
| 0:06–0:16 | 2. The problem | The old site. The 9 audit issues drop in fast as badges (5 High, 3 Medium, 1 Low, 3 WCAG failures). |
| 0:16–0:24 | 3. The inputs | 4 cards fly in: New Design, Audit Report, Architecture, Tech Stack. They merge into one "Plan" box. |
| 0:24–0:42 | 4. Tech stack | Package cards snap into a grid, grouped as **Framework**, **Quality** and **Delivery**. Each card shows the package and one line on *why*. Framework: Nuxt 4 (static site generation), Vue 3 (components), TypeScript strict + vue-tsc (types), scoped CSS + design tokens (styling). Quality: Vitest + @vue/test-utils + @nuxt/test-utils + happy-dom (unit tests), @nuxt/eslint (lint), Chrome DevTools MCP (visual QA vs prototype). Delivery: `nuxt generate` → `.output/public/`, serve (local preview), GitHub Actions (CI). Then a "Not used" strip: no CSS framework, no backend, no i18n library — each with a 3-word reason. |
| 0:42–1:07 | 5. Architecture explained | The layer diagram builds bottom-up. Each layer lights up with a one-line explanation: tokens (every color and size in one file) → i18n (typed English + Bangla content) → composables (`useLocale`, `useNav`: shared state) → base components (`BaseIcon`) → domain components (`layout/`, `home/`, `inner/`) → layout (chrome on every page) → pages (thin, one per route) → static HTML. Then a data-flow beat: a dot travels `en.ts` → `useLocale().L` → component prop → rendered text. A language toggle flips EN → BN and the text changes while the URL stays the same. |
| 1:07–1:32 | 6. The 12 checkpoints | A road with 12 stops. A marker moves fast from CP01 to CP12 (about 2 s per stop) and shows each name. Parallel lanes split after CP01 and after CP07. Audit badges turn green at the checkpoint that fixes them. |
| 1:32–1:50 | 7. Deep dive — CP03 i18n contract | Zoom into the CP03 stop. Show: **Goal** (all content typed, English and Bangla can never drift), **Files** (`types.ts`, `en.ts`, `bn.ts`), **Steps** (3 short beats: define `LocaleContent` → transcribe from the prototype `T` dictionary → add parity tests), **Test** (a test reads `T` from the prototype and compares every value; a one-character error turns it red), **Exit gate** (typecheck + parity test green). |
| 1:50–2:10 | 8. Deep dive — CP07 layout chrome | Zoom into the CP07 stop. Show the page chrome assembling: utility bar → masthead → sticky nav → ticker → footer, each labelled with its component name. Then 4 before/after flips for the audit fixes: #1 hidden nav → sticky nav + skip link, #3 moving ticker → pause control, #7 unlabeled icons → `aria-label`, #9 low-contrast search → 4.67:1. End with the test list (unit, visual QA at 1280 px, WCAG checks) and "4 issues fixed". |
| 2:10–2:22 | 9. The loop | Build → Validate → Test → Visual QA → Commit spins as a circle. "Never advance on red." |
| 2:22–2:30 | 10. Outcome | "Fast. Accessible. Bilingual. Static." Final frame with the folder tree of this output. |

---

## 9. How to work

1. Read all 4 inputs. Write down the facts you extract (colors, sections, routes, audit issues) before you plan.
2. Write `docs/migration-plan.md` first. It is the single source of truth.
3. Generate the 12 checkpoint folders from the master plan. Use parallel subagents if available (for example 3 agents × 4 checkpoints). Every subagent gets the master plan and the 3 templates from Section 6.
4. Build `migration-plan.html` from the master plan and the checkpoint files.
5. Build `video/migration-explainer.html` from the storyboard in Section 8.
6. Run the self-check in Section 10.

---

## 10. Self-check before you say "done"

- [ ] `checkpoints/` contains exactly 12 folders, `CP01-…` to `CP12-…`.
- [ ] Each folder contains exactly `plan.md`, `goal.md`, `test-criteria.md`, and each uses the template headings.
- [ ] All 9 audit issues appear in the issue map, and each maps to a checkpoint.
- [ ] No file contains application code. Commands, file paths and short config snippets are allowed.
- [ ] `migration-plan.html` opens in Chrome with 0 console errors and works at 375 px width.
- [ ] `video/migration-explainer.html` plays for 150 seconds (±5 s) and all 10 scenes appear.
- [ ] `docs/architecture.md` and `PROMPT.md` are unchanged.

When all boxes pass, print the final folder tree and a 5-line summary.
