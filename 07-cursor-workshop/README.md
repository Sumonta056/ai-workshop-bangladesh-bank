# Cursor AI Workshop - Task Manager Project
## NestJS + Next.js + TypeORM

## 🎯 Workshop Overview

This is the starter repository for the Cursor AI Workshop. You'll build a full-stack task management system while learning all Cursor features.

**What You'll Build:**
- Backend REST API with NestJS + TypeORM
- PostgreSQL database with TypeORM entities
- Redis caching layer
- Next.js 14 frontend with App Router

## 📋 Prerequisites

Before the workshop, ensure you have:

- ✅ **Cursor IDE** (latest version) - [Download here](https://cursor.sh)
- ✅ **Node.js 20+** - [Download here](https://nodejs.org)
- ✅ **Docker Desktop** - [Download here](https://docker.com)
- ✅ **Git** - [Download here](https://git-scm.com)
- ✅ **GitHub account**
- ✅ **Jira account** (free) - [Create here](https://www.atlassian.com/software/jira/free) - You may use your personal email

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd cursor-workshop
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Start Docker Services

```bash
# From project root
docker-compose up -d

# Verify containers are running
docker ps
```

You should see:
- `workshop-postgres` (PostgreSQL database)
- `workshop-redis` (Redis cache)
- `workshop-adminer` (Database UI)
- `workshop-redis-commander` (Redis UI)

### 4. Run Database Migrations

```bash
cd backend
npm run migration:run
npm run seed
```

### 5. Start Applications

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 6. Verify Everything Works

- **Backend API**: http://localhost:3000/api/health
  - Should return: `{"status": "ok", "timestamp": "..."}`

- **Frontend**: http://localhost:3001
  - Should see: "Cursor Workshop - Task Manager"

- **API Documentation**: http://localhost:3000/api/docs
  - Swagger UI with all endpoints

- **adminer**: http://localhost:8080
  - Email: `admin@workshop.local`
  - Password: `admin`

- **Redis Commander**: http://localhost:8081

## 📁 Project Structure

```
cursor-workshop-task-manager/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── main.ts         # Application entry point
│   │   ├── app.module.ts   # Root module
│   │   ├── config/         # Configuration files
│   │   │   ├── database.config.ts
│   │   │   └── redis.config.ts
│   │   ├── common/         # Shared utilities
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   └── modules/        # Feature modules (EMPTY - we'll build)
│   ├── test/               # E2E tests
│   ├── .cursorrules        # EMPTY - Hour 2 exercise
│   └── package.json
├── frontend/               # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   │   ├── page.tsx   # Home page
│   │   │   └── layout.tsx # Root layout
│   │   ├── components/    # React components (EMPTY - we'll build)
│   │   └── lib/          # Utilities and hooks
│   ├── .cursorrules       # EMPTY - Hour 2 exercise
│   └── package.json
├── docs/
│   ├── API_SPEC.md        # OpenAPI documentation
│   ├── ARCHITECTURE.md    # System design
│   └── SETUP.md           # Detailed setup guide
├── examples/
│   ├── cursorrules-backend.md   # Reference .cursorrules
│   └── cursorrules-frontend.md  # Reference .cursorrules
├── .cursor/
│   └── agents/            # Custom agent templates
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🏗️ Tech Stack

### Backend (NestJS)
- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **ORM**: TypeORM 0.3
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest

### Frontend (Next.js)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **State**: Zustand
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database UI**: adminer latest
- **Cache UI**: Redis Commander

## 🔧 Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default values work for local development. No changes needed for workshop.

## 🐛 Troubleshooting

### Docker Issues

**Containers not starting:**
```bash
docker-compose down -v
docker-compose up -d
```

**Port already in use:**
```bash
# Check what's using the port
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
lsof -i :3000  # Backend
lsof -i :3001  # Frontend

# Kill the process or change port in docker-compose.yml
```

### Database Issues

**TypeORM connection fails:**
```bash
cd backend
npm run migration:run
npm run seed
```

### Application Issues

**Backend won't start:**
```bash
cd backend
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

**Frontend won't start:**
```bash
cd frontend
rm -rf node_modules package-lock.json .next
npm install
```

## 📚 Available Scripts

### Backend
```bash
npm run start:dev      # Start in development mode with hot reload
npm run start:debug    # Start in debug mode
npm run build          # Build for production
npm run start:prod     # Start production build
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
npm run migration:generate -- <name>  # Generate migration
npm run migration:run  # Run migrations
npm run seed           # Seed database
npm run lint           # Run ESLint
```

### Frontend
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run type-check     # Check TypeScript types
```

## 📚 Resources

- **Cursor Documentation**: https://docs.cursor.com
- **NestJS Documentation**: https://docs.nestjs.com
- **Next.js Documentation**: https://nextjs.org/docs
- **TypeORM Documentation**: https://typeorm.io
- **Workshop Discord**: [Link will be shared]
- **MCP Servers**: https://github.com/modelcontextprotocol



## 📄 License

MIT License - Free to use for learning


---

**Ready to start? Open this project in Cursor and let's begin! 🚀**
