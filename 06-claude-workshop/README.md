# Claude Code Workshop

Welcome to the **Claude Code Workshop**! This repository is designed to help you explore, learn, and master Claude Code through a hands-on, end-to-end project.

## 🚀 Overview

This workspace contains two main parts:
1. **The Workshop Lessons (`/lessons`)**: Step-by-step guides covering various advanced features of Claude Code.
2. **The Example App (`/doctor-patient-app`)**: A full-stack Next.js application used as the practical playground for the workshop lessons.

---

## 🏥 The Doctor-Patient Management System

The core application we use throughout the workshop is a modern Doctor-Patient Management System.

### Tech Stack
- **Framework:** Next.js 16.x (App Router, TypeScript, Turbopack)
- **UI & Styling:** Ant Design 6.x + Tailwind CSS 4.x
- **Database:** SQLite via Prisma 7.x (`@prisma/adapter-libsql`)
- **Visualizations:** Recharts 3.x
- **Authentication:** Cookie-based auth

### Features
- 6 Primary Screens (Dashboard, Doctors, Patients, Appointments, Settings, Auth)
- Collapsible Sidebar with Dark/Light Mode support
- Pre-configured Seed Data (Default credentials for easy access)

---

## 📚 Workshop Modules

The workshop is divided into specialized segments that progressively introduce Claude Code's capabilities.

### Segment 01
1. **CLAUDE.md Patterns** - Understanding project context files and architectural guidelines.
2. **Full-Stack App Operations** - Manipulating the Doctor-Patient system using Claude Code.
3. **Claude Skills** - Creating reusable skill folders with templates and validation.
4. **Custom Agents** - Authoring specialized subagents (`.agent.md`) for code review, docs, tests, and security.
5. **Agent Tuneup** - Managing effort levels, background execution, and isolation.
6. **Claude Hooks** - Using `PreToolUse` and `PostToolUse` for auto-formatting and command blocking.
7. **Claude Settings** - Managing environment variables and global configurations.
8. **MCP Server Integration** - Using Model Context Protocol servers for agent orchestration.
9. **Combining Features** - End-to-end orchestration of multiple Claude Code features.
10. **Claude Commands** - Crafting custom commands (remote operations, loops, built-in skills).

### Segment 02
11. **Spec-Driven Development** - Guiding development entirely through detailed specifications.
12. **Frontend Design with Claude Code** - Iterative UI/UX design workflows.
13. **Claude Code Test Automation** - Automating testing strategies with AI.

---

## 🛠️ Getting Started

Before diving into the specific steps, make sure to explore the [CHECKLIST.md](CHECKLIST.md) file to track your progress and get this project up and running!

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) package manager
- Claude Code CLI installed

### Setup the App

#### Environment Setup

The project includes a `.env.example` file at `doctor-patient-app/.env.example` with default SQLite configuration:

```env
DATABASE_URL="file:./dev.db"
```

Rename `.env.example` to `.env` before running the app.

No additional environment setup is required for local development.

If you are on Windows and encounter a PowerShell `ExecutionPolicy` issue, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

#### Setup Commands After Cloning

```bash
# 1. Navigate to project directory
cd doctor-patient-app

# 2. Install dependencies
pnpm install

# 3. Generate Prisma client
pnpm exec prisma generate

# 4. Run database migrations
pnpm exec prisma migrate dev

# 5. Seed the database (optional - for sample data)
pnpm exec prisma db seed

# 6. Start development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Exploring the Lessons
Navigate to the `/lessons` directory and open the respective `README.md` and `INSTRUCTIONS.md` files for each chapter to start your Claude Code learning journey!