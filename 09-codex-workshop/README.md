# Codex Workshop

Welcome to the **Codex Workshop**. This folder is a starter boilerplate for learning how to set up, guide, and operate Codex on a real project.

## Overview

This workshop focuses on the practical pieces teams need before using Codex productively:

1. **Project instructions** with `AGENTS.md`
2. **Local setup** for Codex, Git, Node.js, and project tooling
3. **Workspace discipline** for planning, editing, testing, reviewing, and committing
4. **Reusable prompts and templates** for common engineering workflows
5. **Workshop lessons** that progress from basic setup to agentic development workflows

## Folder Structure

```text
09-codex-workshop/
├── AGENTS.md
├── README.md
├── setup/
│   ├── README.md
│   ├── checklist.md
│   ├── codex-cli.md
│   ├── git-workflow.md
│   └── project-instructions.md
├── lessons/
│   ├── chapter01_project-instructions/README.md
│   ├── chapter02_setup-and-sandboxing/README.md
│   ├── chapter03_plan-then-edit/README.md
│   ├── chapter04_code-review/README.md
│   ├── chapter05_testing-and-verification/README.md
│   ├── chapter06_working-with-existing-code/README.md
│   ├── chapter07_frontend-and-browser-qa/README.md
│   └── chapter08_shipping-workflow/README.md
└── resources/
    ├── README.md
    ├── prompts/
    │   ├── bug-investigation.md
    │   ├── code-review.md
    │   ├── implementation-plan.md
    │   └── project-overview.md
    └── templates/
        ├── AGENTS.basic.md
        └── task-brief.md
```

## Prerequisites

- Codex access through the Codex app or CLI
- Git
- A local code editor
- Node.js 20+ for JavaScript/TypeScript examples
- A GitHub account for branch and pull request exercises

## Getting Started

1. Read [setup/checklist.md](setup/checklist.md).
2. Review the starter project instructions in [AGENTS.md](AGENTS.md).
3. Start with [Chapter 1](lessons/chapter01_project-instructions/README.md).
4. Use [resources/prompts](resources/prompts) and [resources/templates](resources/templates) during exercises.

## Workshop Goals

By the end of this workshop, participants should be able to:

- Write useful `AGENTS.md` instructions for a project
- Ask Codex for scoped plans before implementation
- Let Codex inspect, edit, and verify code safely
- Use Codex for code review and debugging
- Keep commits, branches, and pull requests intentional
- Avoid common agent mistakes such as broad refactors, unverified changes, and unclear prompts
