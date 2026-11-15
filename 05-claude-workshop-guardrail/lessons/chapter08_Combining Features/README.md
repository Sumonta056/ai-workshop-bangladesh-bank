# Chapter 8: Combining Features

In this chapter we combine everything we've learnt into one workflow using the **doctor-patient-app** project.

## What Already Exists

Our project already has these from previous chapters:

| Feature | File | From Chapter |
|---------|------|-------------|
| **Agent** | `.claude/agents/code-quality-auditor.md` | Ch 3 |
| **Skill** | `.claude/skills/code-reviewer/SKILL.md` | Ch 4 |
| **Hook** | `.claude/settings.json` (Prettier on save) | Ch 5 |
| **Command** | `.claude/commands/analyze.md` | Ch 4 |
| **CLAUDE.md** | `CLAUDE.md` + `AGENTS.md` | Ch 1 |

We don't need to recreate any of these. We need **one new command** that ties them together, plus a **verifier skill** that confirms everything actually works.

---

## The Idea

Create a `/build-feature` command that orchestrates the existing pieces, and a `/verify-feature` skill that confirms the build actually works:

```
You type:  /build-feature "Add prescription management"

What happens:

  Step 1 → CLAUDE.md provides project context (automatic)
  Step 2 → Command plans the feature
  Step 3 → Claude implements the code
  Step 4 → Hook auto-formats every file on save (automatic)
  Step 5 → code-quality-auditor agent reviews (existing agent)
  Step 6 → /code-reviewer skill does deep bug review (existing skill)
  Step 7 → /verify-feature skill builds & checks the app (NEW)
  Step 8 → Summary → ready to commit
```

---

## 2 New Files Needed

### File 1: `/build-feature` Command

Create: `doctor-patient-app/.claude/commands/build-feature.md`

```markdown
---
description: Plan, implement, and review a new feature end-to-end
---

## Feature Request
$ARGUMENTS

## Instructions

Follow these steps in order:

### Step 1: Plan
Read the prisma schema at `prisma/schema.prisma`, existing API routes in
`src/app/api/`, and pages in `src/app/(authenticated)/`.
Create a short plan (max 5 bullet points) for this feature.
Ask me to confirm before proceeding.

### Step 2: Implement
After I confirm, implement following these patterns:
- Prisma model changes in `prisma/schema.prisma`
- API routes in `src/app/api/{resource}/route.ts`
- UI page in `src/app/(authenticated)/{resource}/page.tsx`
- Reuse existing Ant Design components and layout patterns
- Prettier hook will auto-format each file on save — do not format manually

### Step 3: Quality Review
After implementation, launch the `code-quality-auditor` agent to review
all changed files for correctness, security, and best practices.

### Step 4: Deep Bug Review
Run the `/code-reviewer` skill on the most critical changed files
(API routes and database logic).

### Step 5: Verify
Run the `/verify-feature` skill to confirm the project builds successfully,
the Prisma client is in sync, and no TypeScript compilation errors remain.
If verification fails, fix the issues before proceeding.

### Step 6: Summary
Show a short summary:
- Files created/modified
- Review findings from both the agent and skill
- Verification result (build pass/fail)
- What to test manually
```

---

### File 2: `/verify-feature` Skill

Create: `doctor-patient-app/.claude/skills/verify-feature/SKILL.md`

```markdown
---
description: Verify that the project builds, Prisma is in sync, and there are no errors
---

# Verify Feature

Run these checks in order. Stop on the first failure and report what broke.

## Step 1: Regenerate Prisma Client
Run `npx prisma generate` to ensure the generated client matches the schema.
If this fails, report the Prisma error.

## Step 2: Sync Database
Run `npx prisma db push` to apply any pending schema changes.
If this fails, report the migration error.

## Step 3: Build the Project
Run `npx next build` to compile the full application.
If this fails, extract the first error from the build output and report it.

## Step 4: Report
If all steps pass, output:
- Prisma: OK
- Database: OK
- Build: OK (with the route summary from the build output)

If any step fails, output which step failed and the error message
so the caller can fix it before proceeding.
```

---

## How Each Feature Plays Its Role

```
/build-feature "Add prescriptions"
        │
        ▼
┌──────────────────────────────────────┐
│  CLAUDE.md (automatic)               │
│  Loads project context:              │
│  Next.js, Prisma, Ant Design, etc.  │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  /build-feature command              │
│  Orchestrates the entire flow        │
│  Step 1: Plan → Step 2: Build → ...  │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Implementation                      │
│  Claude writes code ──┐              │
│                       │              │
│            ┌──────────▼────────────┐ │
│            │  Hook fires (Ch 5)    │ │
│            │  Prettier auto-formats│ │
│            │  every saved file     │ │
│            └───────────────────────┘ │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Reviews                             │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ code-quality-auditor (Agent)   │  │
│  │ From Ch 3 — checks patterns,  │  │
│  │ architecture, error handling   │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ /code-reviewer (Skill)         │  │
│  │ From Ch 4 — deep bug hunting,  │  │
│  │ security, logic errors         │  │
│  └────────────────────────────────┘  │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Verification (NEW)                  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ /verify-feature (Skill)        │  │
│  │ Ch 8 — regenerates Prisma,     │  │
│  │ syncs DB, runs next build      │  │
│  └────────────────────────────────┘  │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Summary + Ready to commit           │
└──────────────────────────────────────┘
```

---

## Live Demo Script

### What you type:
```
/build-feature Add a prescriptions page where doctors can
create and view prescriptions for their patients
```

### What the audience sees:

**1. Plan appears** (CLAUDE.md context loaded automatically)
```
Plan:
1. Add Prescription model to prisma/schema.prisma
2. Create GET/POST API routes at src/app/api/prescriptions/
3. Create prescriptions page at src/app/(authenticated)/prescriptions/
4. Add nav link in the sidebar layout
5. Review with agent + skill
```

**2. You say "go ahead"** → Claude implements

**3. Prettier hook fires** on each file save (visible in terminal output)

**4. Agent reviews**
```
code-quality-auditor: "2 findings — missing try/catch
in POST route, add loading state to table"
```

**5. Skill reviews**
```
/code-reviewer: "No critical bugs. Medium: validate
prescription dosage field is not empty before insert"
```

**6. Verification runs**
```
/verify-feature:
  Prisma: OK
  Database: OK
  Build: OK — 18 routes compiled
```

**7. Summary shown** → ready to commit

---

## What Makes This Powerful

| Without combining | With `/build-feature` |
|---|---|
| Manually check project conventions | CLAUDE.md provides them automatically |
| Manually run Prettier after each edit | Hook formats on every save |
| Manually ask for code review | Agent runs automatically in the flow |
| Manually check for bugs | Skill does deep review automatically |
| Manually run build to check for errors | `/verify-feature` skill builds and checks automatically |
| 6 separate steps, easy to forget one | 1 command, nothing missed |

---

## Key Takeaway

> You don't need new tools. **The command orchestrates what you already built.** CLAUDE.md guides, hooks enforce, agents and skills review, and the verifier confirms it all compiles — all triggered by one command.
