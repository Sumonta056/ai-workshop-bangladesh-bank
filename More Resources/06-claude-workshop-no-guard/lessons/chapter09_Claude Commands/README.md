# Claude Commands

## Tips and Tricks

Claude Code provides several powerful commands that can help you automate workflows, manage tasks, and interact with the application more efficiently. Here are some of the key commands you can use:

### 1. `dispatch`

The `dispatch` feature allows you to assign tasks to Claude from anywhere using the Cowork environment. By messaging Claude from your phone, you can trigger real work on your active desktop computer. Claude will run the task on your machine—utilizing your local files, desktop apps (via computer use), and connected plugins—and send you a push notification with the final outcome (like a spreadsheet, memo, or pull request) when it's done. It provides a single, continuous, persistent thread across your mobile and desktop devices.

### 2. `remote`

The `remote` feature, activated via `claude remote-control` (or `/remote-control`), allows you to continue a local Claude Code session from any device. It securely connects a web interface (at `claude.ai/code`) or the Claude mobile app to the session running directly on your machine. This means Claude executes tasks locally—retaining full access to your filesystem, MCP servers, and tools—while allowing you to drive the work and stay in sync from your phone or another computer.

### 3. `schedule`

The `schedule` command (`/schedule`) is used to set up and manage recurring tasks. You can schedule tasks to run persistently in Anthropic's cloud infrastructure (so they keep working even when your computer is off) or on your local machine using Desktop scheduled tasks. It allows you to automate recurring workflows securely—like reviewing PRs every morning, checking CI failures, or writing documentation summaries.

### 4. `loop`

The `loop` command (`/loop`) is a bundled skill that provides a quick way to schedule a recurring prompt within your current interactive Claude Code session. You can provide an interval (e.g., `/loop 10m check if the deployment finished`) to have Claude run prompts repeatedly, poll for status updates, or give you one-time reminders as long as your session stays running. It acts as a lightweight, session-scoped alternative to fully persistent scheduled tasks.

---

*Experiment with these commands in the terminal to see how they can improve your development workflow!*