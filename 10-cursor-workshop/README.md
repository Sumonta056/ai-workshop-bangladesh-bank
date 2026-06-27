# Cursor AI Workshop — Cursor Configuration

This workspace contains the **Cursor workflow, tools, and `.cursor` folder setup** for the Bangladesh Bank Cursor workshop. Copy or clone the application code from `07-cursor-workshop` when you are ready to run the full-stack exercises.

## What's Included

| Path | Purpose |
|------|---------|
| `.cursor/rules/` | Project rules (backend + frontend globs) |
| `.cursor/commands/` | Custom slash commands (DB optimizer, test generator) |
| `.cursor/skills/` | Project skills (backend, frontend, database) |
| `.cursor/mcp.json` | MCP server configuration (PostgreSQL, Atlassian) |
| `.cursor/agents/` | Placeholder for custom agent templates |
| `resources/` | Chapter-by-chapter workshop instructions |
| `examples/` | Reference `.cursorrules` content for Hour 2 exercise |
| `.cursorignore` | Excludes `resources/` from indexing |

## Quick Setup

1. **Open this folder in Cursor IDE**
2. **Enable MCP servers:** Cursor Settings → Tools & MCP → confirm `.cursor/mcp.json` is loaded
3. **Start Docker** (for PostgreSQL MCP): copy `docker-compose.yml` from `07-cursor-workshop` and run `docker-compose up -d`
4. **Authenticate Atlassian MCP:** Settings → Tools & MCP → Authenticate on the Atlassian server (requires free Jira account)
5. **Follow chapters:** Start with [`resources/chapter_1/instructions.md`](resources/chapter_1/instructions.md)

## Cursor Folder Structure

```
.cursor/
├── mcp.json
├── rules/
│   ├── backend-general.mdc
│   └── frontend-general.mdc
├── commands/
│   ├── db-optimizer.md
│   └── test-generator.md
├── skills/
│   ├── backend-development/SKILL.md
│   ├── frontend-development/SKILL.md
│   └── database-operations/SKILL.md
└── agents/
    └── README.md
```

## Workshop Chapters

| Chapter | Topic | Config touched |
|---------|-------|----------------|
| 1 | Core Features | prompts in `resources/prompts/` |
| 2 | Project Memory | `.cursor/rules/` |
| 3 | MCP Servers | `.cursor/mcp.json` |
| 4 | Custom Commands | `.cursor/commands/` |
| 5 | Advanced Context | `.cursorignore` |
| 6 | AI Code Review | Agent review workflow |
| 7 | Cursor Skills | `.cursor/skills/` |
| 8 | Cursor Browser | Built-in browser (`Cmd+Shift+B`) |

## Manual Steps

- **Application code:** This folder does not include `backend/` or `frontend/`. Copy them from `07-cursor-workshop` before running app exercises.
- **PostgreSQL MCP:** Requires Docker Postgres running on `localhost:5432` with credentials from `07-cursor-workshop/.env.example`.
- **Atlassian MCP:** Requires OAuth authentication in Cursor Settings (no API key in the config file).
- **Hour 2 `.cursorrules`:** Create empty `backend/.cursorrules` and `frontend/.cursorrules` during the exercise; use `examples/` as reference.

## Resources

- [Cursor Documentation](https://docs.cursor.com)
- [Cursor MCP Directory](https://cursor.com/docs/context/mcp/directory)
- [cursor.directory](https://cursor.directory) — community rules
