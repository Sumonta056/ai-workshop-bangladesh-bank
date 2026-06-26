# Prerequisites for the Workshop

## System Requirements

| Requirement     | Minimum Version | Recommended | Latest | Notes                       |
| --------------- | --------------- | ----------- | ------ | --------------------------- |
| **Node.js**     | 18.18.0         | 24.x (LTS)  | 25.8.2 | Required by Next.js 16.x    |
| **npm**         | 9.x             | 10.x        | 11.x   | Comes with Node.js          |
| **pnpm**        | 8.x             | 10.x        | 10.x   | Package manager used        |
| **Claude Code** | Latest          | Latest      | Latest | AI-powered coding assistant |

## Installation

### 1. Install Node.js and npm

**macOS (using Homebrew):**

```bash
brew install node@24
```

**Windows (using winget):**

```bash
winget install OpenJS.NodeJS.LTS
```

**Linux (using nvm - recommended):**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 24
```

**Verify installation:**

```bash
node --version  # Should be >= 18.18.0 (LTS 24.14.1 recommended)
npm --version   # Should be >= 9.x
```

### 2. Install pnpm

**Using npm (recommended for Windows):**

```bash
npm install -g pnpm@latest-10
```

**Using Corepack:**

```bash
npm install --global corepack@latest
corepack enable pnpm
```

**macOS (using Homebrew):**

```bash
brew install pnpm
```

**Linux/macOS (standalone script):**

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**Verify installation:**

```bash
pnpm --version  # Should be >= 10.x
```

### 3. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

**Verify installation:**

```bash
claude --version
```

> Note: Claude Code requires an Anthropic API key. Set it up by running `claude` and following the authentication prompts.

## Environment Setup

The project includes a `.env.example` file at `doctor-patient-app/.env.example` with default SQLite configuration:

```
DATABASE_URL="file:./dev.db"
```

Rename `.env.example` to `.env` before running the app.

No additional environment setup required for local development.

If you are on Windows and encounter a PowerShell `ExecutionPolicy` issue, run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

## Setup Commands After Cloning

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

The app will be available at [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Runtime**: React 19
- **Database**: SQLite via Prisma ORM 7.5
- **UI**: Ant Design 6.x + Tailwind CSS 4.x
- **Language**: TypeScript 5.x
- **Charts**: Recharts 3.x

## Available Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

## Database Scripts

If you encounter any database synchronization issues or need to cleanly apply migrations and reseed data, you can use the provided reset scripts. 

**Important:** These scripts are expected to be run from the root `CLAUDE-WORKSHOP` directory.

**macOS / Linux:**
```bash
chmod +x doctor-patient-app/scripts/reset-db.sh
./doctor-patient-app/scripts/reset-db.sh
```

**Windows:**
```cmd
.\doctor-patient-app\scripts\reset-db.bat
```

## Troubleshooting

### Prisma client not found

```bash
pnpm exec prisma generate
```

### Database issues

```bash
# Reset database and re-run migrations
pnpm exec prisma migrate reset
```

### Port 3000 already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on different port
pnpm dev -- -p 3001
```
