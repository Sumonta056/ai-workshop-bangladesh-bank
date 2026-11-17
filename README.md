# AI Workshop — Bangladesh Bank ICT Professionals

![Workshop Banner](image.png)

**Slides (HTML, 104 slides):** [`Practical AI for ICT Professionals.html`](Practical%20AI%20for%20ICT%20Professionals.html) — open it in a browser.
**Slides (Google Slides):** [AI Workshop Presentation](https://docs.google.com/presentation/d/1tBhYldQMoB3AF6eL0WOoKfQORcw_NufeMqcWgAwo8Ps/edit?usp=sharing)
**Live demo site:** [sumonta056.github.io/ai-workshop-bangladesh-bank](https://sumonta056.github.io/ai-workshop-bangladesh-bank/)

---

## Overview

This repository holds the slides, demos and hands-on material for the **Practical AI for ICT Professionals** workshop at Bangladesh Bank. The workshop starts with what AI is, then moves to prompting, AI tools, an agentic refactor of the bank website, AI in DevOps, an AI chatbot, cost, and security guardrails.

---

## Workshop Agenda

| # | Part | Slides | What we cover |
|---|------|--------|---------------|
| 1 | Foundations | 1–8 | What AI is, how a model predicts the next word, human vs AI, where humans still win, what AI is good and bad for |
| 2 | The power of prompting | 9–18 | Bad prompt vs good prompt (with real answers), the five things that matter, a production system prompt, HTML output, speaking prompts with Wispr Flow |
| 3 | AI tools, frameworks and platforms | 19–27 | Tool vs model vs platform, how a model is made and trained, benchmarks, which model is best, how the bank can use AI safely (including its own GPUs) |
| 4 | Claude and developer tools | 28–54 | Claude Desktop (Motion, Slides, Dashboard, ClickUp), Claude Code, skills, agents, MCP, Orca, Claude Code vs Codex, GPT vs Claude, Gemini and Antigravity, Cursor, OpenCode |
| 5 | Agentic refactoring case study | 55–71 | Can AI redesign the bank website? The eight-stage agentic lifecycle: find, design, plan, code, test, review, debug, deploy |
| 6 | AI monitoring and deployment | 72–82 | AI in every DevOps phase, deployment connectors, AWS and log checks by hand vs with Claude, 24/7 monitoring, Slack alerts, Claude opens a fix PR, AI security check-up |
| 7 | AI chatbot for the bank website | 83–86 | Prototype an idea with Claude, the chatbot demo, chatbot architecture |
| 8 | Cost, risk and guardrails | 87–102 | The future of team meetings, AI tool pricing, four guardrail demos: block file reads, block database writes, block pushes to `main`, block `.env` reads |
| 9 | Wrap-up | 103–104 | Ten golden rules to use AI efficiently, questions |

### Key notes from the slides

- **AI predicts.** A model picks the most likely next word from its training data. It is non-deterministic, so check its output.
- **A good prompt has five parts:** role, task, context, goal and output format. A vague prompt makes the model guess.
- **Skill vs agent.** A skill is a recipe that the AI loads when it needs it. An agent gets a goal, makes a plan and uses tools until the work is done.
- **MCP** (Model Context Protocol) connects an AI assistant to tools and data, such as AWS, Kubernetes, MongoDB or ClickUp.
- **The agent is fast. The human is in charge.** A human approves the plan, the review and the deployment.
- **Guardrails come from configuration, not trust.** Use deny rules in `.claude/settings.json`, read-only MCP servers and hooks.

---

## Repository Structure

```
.
├── Practical AI for ICT Professionals.html   # Main slide deck (104 slides)
├── image.png                                 # README banner
├── 00-Re-Design/                             # Deck PDF and demo assets
├── 02-Bangladesh-Bank Website Refactor/      # Agentic refactor case study (slides 57–71)
│   ├── 01-Finding/                           # Stage 1 — UX audit of the current site
│   ├── 02-Design/                            # Stage 2 — new design (source of truth)
│   ├── 03-Planning/                          # Stage 3 — architecture and checkpoints
│   ├── 04-Code/                              # Stage 4 — code stage output
│   ├── 05-Qa/                                # Stage 5 — test results
│   ├── 06-Review/                            # Stage 6 — code review output
│   ├── 08-Deploy/                            # Stage 8 — release notes and deploy
│   └── Bangladesh Bank New Website/          # Nuxt site deployed to GitHub Pages
├── 04-Bangladesh-Bank-ChatBot/               # Chatbot prompt and script (slides 83–86)
├── 05-claude-workshop-guardrail/             # Claude Code workshop and guardrail demos (slides 38–45, 90–102)
├── More Resources/                           # Earlier decks and workshops
└── .github/workflows/                        # Pages deploy and site monitor
```

### 00-Re-Design

| File | Purpose |
|------|---------|
| `Slide.pdf` | PDF export of the deck |
| `demo-cartoon-doodle.mp4` | Animated cartoon demo |
| `redis-cache.html` | Redis cache explainer (slide 17, "Why the HTML format?") |
| `prothomalo-security-report.html` | Sample AI security report |

### 02-Bangladesh-Bank Website Refactor

The case study from slides 57–71. Each numbered folder holds the prompt (`PROMPT.md`) and the output of one stage of the agentic lifecycle. `Bangladesh Bank New Website/` is the result: a Nuxt static site with English and Bangla content.

```bash
cd "02-Bangladesh-Bank Website Refactor/Bangladesh Bank New Website"
npm install
npm run dev        # http://localhost:3000
npx nuxt generate  # static output in .output/public/
```

### 04-Bangladesh-Bank-ChatBot

| File | Purpose |
|------|---------|
| `PROMPT.md` | System prompt for the bank help chatbot |
| `chatbot-script.js` | Chatbot script for the website demo |

### 05-claude-workshop-guardrail

A Claude Code workshop built on a Doctor-Patient app. It also holds the guardrail demos from slides 93–102.

| Item | Purpose |
|------|---------|
| `doctor-patient-app/` | Next.js demo app |
| `lessons/` | 12 chapters: project setup, skills, agents, agent tuneup, hooks, settings, MCP, combined features, commands, spec-driven development, frontend design, browser automation |
| `.claude/` | Settings, deny rules and hooks for the guardrail demos |
| `customer/`, `.env` | Demo files that the guardrails stop Claude from reading |
| `workshop-reference.html` | Quick reference for participants |

### More Resources

Earlier material that the main deck builds on:

| Folder | Content |
|--------|---------|
| `00-slides/` | Topic decks (PPTX) and demo reports for Codex, Cursor and Antigravity |
| `01-PROMPT/` | UI fix prompt |
| `05-claude-code-intro/` | Claude Code intro pages |
| `06-claude-workshop/`, `06-claude-workshop-no-guard/` | Claude Code workshop, with and without guardrails |
| `07-cursor-workshop/`, `10-cursor-workshop/` | Cursor workshops (Task Manager, NetDevOps demo) |
| `08-data-analysis/` | AI data analysis with a General Ledger sample |
| `09-codex-workshop/` | OpenAI Codex workshop, 8 chapters |
| `11-claude-networking-security/` | Networking and security demos with Claude Code |
| `others/` | Other resources |

---

## Deployment

- **`deploy-pages.yml`** builds `02-Bangladesh-Bank Website Refactor/Bangladesh Bank New Website/` and deploys it to GitHub Pages. It runs on a push to `main` that changes that folder. It stops on a high or critical `npm audit` finding.
- **`site-monitor.yml`** checks the main routes of the live site every hour and fails when a route does not return `200`.

The slide deck is not part of the Pages build.

---

## Workshop Facilitator

**Sumonta Saha Mridul** — [sumontasaha80@gmail.com](mailto:sumontasaha80@gmail.com)
