# Chapter 3: MCP Servers

## Setup MCP Configuration Location

## Task 1: Development MCPs

### Sub Task 1.1: PostgreSQL MCP
- **Add to MCP config (see [`mcp.json`](../mcp.json) for reference):**
    ```json
    "postgres": {
      "command": "npx",
      "args": ["-y", "enhanced-postgres-mcp-server", "postgresql://workshop:workshop123@localhost:5432/taskmanager_db"]
    }
    ```
- **Go to your agent chat tab.**
- **Type:** "Use postgres MCP to list all tables"
- **Verify:** Shows database tables (might be empty initially)
- **Create test table:** Create a table `test_table`. This should contain `id` as primary key and `name` as string with max 100 characters in length. Then insert value "test".
    ```sql
    CREATE TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(100));
    INSERT INTO test_table (name) VALUES ('test');
    ```
- **Go to your agent chat tab.**
- **Type:** "Use postgres MCP to SELECT * FROM test_table"
- **Verify:** Shows the test row
- **Drop table:** `DROP TABLE test_table;`


### Sub Task 1.2: Jira MCP
> **Prerequisite:** Create a free Jira account at [atlassian.com/software/jira/free](https://www.atlassian.com/software/jira/free). You may use your personal email.

- **Go to [Cursor MCP Directory](https://cursor.com/docs/context/mcp/directory)**
- **Search "Atlassian" and click "Add to Cursor"**
- **Open Cursor Settings** (Cmd + Shift + J on Mac)
- **Go to Tools & MCP**
- **Click Authenticate in Atlassian MCP** and follow the instructions.
- **Go to AI chat tab.**
- **Type:** "Use Atlassian MCP to create a new task - create admin module and add some description"
- **Verify:** Confirm the task is created in your Jira.

