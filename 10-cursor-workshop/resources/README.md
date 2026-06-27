# Cursor Workshop Resources

This folder contains all the resources needed for the Cursor AI workshop. Each chapter includes step-by-step instructions, while reusable content is centralized in dedicated folders to avoid duplication.

---

## 📁 Folder Structure

```
resources/
├── README.md                    # This file - resource index
│
├── chapter_1/instructions.md    # Core Features (Ask, Edit, Agent, Debug)
├── chapter_2/instructions.md    # Project Memory (.cursor/rules)
├── chapter_3/instructions.md    # MCP Servers
├── chapter_4/instructions.md    # Custom Commands
├── chapter_5/instructions.md    # Advanced Context (.cursorignore)
├── chapter_6/instructions.md    # AI Code Review
├── chapter_7/instructions.md    # Cursor Skills
├── chapter_8/instructions.md    # Cursor Browser
│
├── rules/                       # 📑 Cursor Rules Templates
│   ├── backend-general.mdc     # Backend NestJS/TypeORM rules
│   └── frontend-general.mdc    # Frontend Next.js rules
│
├── commands/                    # ⚡ Cursor Commands Templates
│   ├── db-optimizer.md         # Database optimization command
│   └── test-generator.md       # Test generation command
│
├── prompts/                     # 💬 Example Prompts
│   ├── agent_mode_entity.md    # Agent mode entity creation prompt
│   └── plan_mode_module.md     # Plan+Agent mode module prompt
│
└── mcp.json                     # 🔌 MCP Server Configuration
```

---

## 📚 Chapter Index

| Chapter | Topic | Key Concepts |
|---------|-------|--------------|
| [Chapter 1](./chapter_1/instructions.md) | Core Features | Ask, Inline Edit, Agent Mode, Debug |
| [Chapter 2](./chapter_2/instructions.md) | Project Memory | `.cursor/rules`, Rules for backend/frontend |
| [Chapter 3](./chapter_3/instructions.md) | MCP Servers | PostgreSQL MCP, Jira/Atlassian MCP |
| [Chapter 4](./chapter_4/instructions.md) | Custom Commands | DB Optimizer, Test Generator |
| [Chapter 5](./chapter_5/instructions.md) | Advanced Context | `.cursorignore`, Token optimization |
| [Chapter 6](./chapter_6/instructions.md) | AI Code Review | Review workflow, PR commands |
| [Chapter 7](./chapter_7/instructions.md) | Cursor Skills | Project/Personal skills, Best practices |
| [Chapter 8](./chapter_8/instructions.md) | Cursor Browser | Inspect tool, Visual editing, Hot reload |

---

## 🔗 Quick Links to Resources

### Rules (for Chapter 2)
- [`rules/backend-general.mdc`](./rules/backend-general.mdc) - NestJS + TypeORM conventions
- [`rules/frontend-general.mdc`](./rules/frontend-general.mdc) - Next.js 14 + Tailwind conventions

### Commands (for Chapter 4)
- [`commands/db-optimizer.md`](./commands/db-optimizer.md) - Find and optimize slow queries
- [`commands/test-generator.md`](./commands/test-generator.md) - Generate comprehensive test suites

### Prompts (for Chapter 1)
- [`prompts/agent_mode_entity.md`](./prompts/agent_mode_entity.md) - TypeORM entity creation
- [`prompts/plan_mode_module.md`](./prompts/plan_mode_module.md) - NestJS module scaffold

### MCP Configuration (for Chapter 3)
- [`mcp.json`](./mcp.json) - Sample MCP server configurations

---

## 🚀 Getting Started

1. Start with [Chapter 1](./chapter_1/instructions.md) for core features
2. Progress through chapters sequentially
3. Use the resource files as templates for your own configurations
