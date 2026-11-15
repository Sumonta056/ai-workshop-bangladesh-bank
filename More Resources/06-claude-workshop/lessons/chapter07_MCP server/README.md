# MCP Server (Model Context Protocol)

## What Is MCP?

MCP (Model Context Protocol) is an open standard that lets Claude connect to external tools, data sources, and services — extending what Claude can do beyond its built-in capabilities.

Think of MCP servers as **plugins for Claude**: each server exposes a set of tools that Claude can call, just like any built-in tool (Read, Write, Bash, etc.).

MCP servers are configured in a `.mcp.json` file at the project root. Claude Code reads this file on startup and connects to all listed servers.

### Project Structure

```
claude-workshop/
├── .mcp.json              ← MCP server config (project-level)
├── .memory/
│   └── memory_doctor_patient.jsonl  ← Knowledge graph data
├── .claude/
│   └── settings.json
└── doctor-patient-app/
    └── src/
```

You can also configure MCP globally in `~/.claude/settings.json` for servers you want available in every project.

---

## Hands-On: Add the Memory MCP Server

The Memory server gives Claude a **persistent knowledge graph** — Claude can store and recall facts across conversations using entities, relations, and observations.

### Step 1: Create `.mcp.json` in your project root

Ask Claude to do this for you:

```
Create a .mcp.json file in the project root with the memory MCP server configured.
Use npx to run @modelcontextprotocol/server-memory and store the memory file at .memory/memory_doctor_patient.jsonl
```

Or create it manually:

```json
{
  "mcpServers": {
    "memory": {
      "command": "sh",
      "args": [
        "-c",
        "MEMORY_FILE_PATH=\"$(pwd)/.memory/memory_doctor_patient.jsonl\" npx -y @modelcontextprotocol/server-memory"
      ]
    }
  }
}
```

> **Why `sh -c` with inline env?** This approach sets `MEMORY_FILE_PATH` as an absolute path using `$(pwd)`, ensuring the memory file is always created in the correct project directory regardless of where Claude Code is launched from. The `.memory/` subdirectory keeps the project root clean.

### Step 2: Create the `.memory/` directory and update `.gitignore`

The memory file stores your personal knowledge graph — you don't want to commit it:

```bash
mkdir -p .memory
```

Add to your `.gitignore`:

```
# MCP Memory server data
memory_doctor_patient.jsonl
.memory/
```

### Step 3: Restart Claude Code

MCP servers are loaded at startup. Restart Claude Code to pick up the new configuration.

### Step 4: Verify it's connected

In Claude Code, run:

```
/mcp
```

You should see `memory` listed as a connected server with its available tools.

---

## Using the Memory Server

Once connected, Claude can use the memory tools automatically. You can also ask explicitly:

```
Remember that our Doctor-Patient app uses cookie-based auth with default credentials admin@clinic.com / password123.
```

```
What do you know about our project's database models?
```

```
Store the fact that the SQLite database file (dev.db) lives in the project root, not inside prisma/.
```

Claude will use `create_entities`, `add_observations`, `search_nodes`, and `read_graph` under the hood to persist and retrieve this information.

---

## Exercise: Explore MCP Capabilities

Try these prompts after setting up the memory server:

**1. Store project context:**
```
Use memory MCP to save the project context — this is a Doctor-Patient Management System built with Next.js 16, Prisma 7, SQLite, and Ant Design 6.
```

**2. Recall stored knowledge:**
```
What do you remember about our tech stack?
```

**3. Build a knowledge graph:**
```
Create entities for our four database models: User, Doctor, Patient, and Appointment.
Add observations about what each one stores and how they relate to each other.
```

**4. Check what's stored:**
```
Show me everything stored in the memory knowledge graph.
```

**5. Search the graph:**
```
Search the memory graph for anything related to "Doctor".
```

---

# Practice MCP Server Configuration

### Use this settings to configure mcp server for context7 to get latest documents and information.

## **context7**

```

{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

### Verify context7

After restarting Claude Code, try these prompts:

```
What is the latest way to define routes in Next.js App Router?
```

```
Show me how to use Prisma's findMany with pagination and filtering.
```

```
How do I configure Ant Design's theme token in v5+?
```

You should see Claude fetching live documentation via `context7` tools like `resolve-library-id` and `query-docs` before answering.

---

## **sequential-thinking**

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

No API key or environment variables needed.

### Verify sequential-thinking

After restarting Claude Code, try these prompts:

```
Think step by step about how to design a role-based access control system for our Doctor-Patient app where admins can manage doctors, doctors can view their patients, and patients can only see their own records.
```

```
Break down the tradeoffs between using JWT tokens vs session cookies for authentication in a Next.js app.
```

You should see Claude using `sequentialthinking` tool calls to reason through the problem in structured steps before giving a final answer.

---

## References

- [MCP Documentation](https://modelcontextprotocol.io)
- [Claude Code MCP Guide](https://docs.anthropic.com/en/claude-code/mcp)
- [MCP Server Registry](https://github.com/modelcontextprotocol/servers)
