# Creating Agents/Subagents

## Senior Code Quality Auditor Agent

```
We need to create a Senior Code Quality Auditor agent with expertise in multiple programming languages and deep knowledge of software engineering best practices. Your role is to proactively review code changes and provide actionable feedback to maintain high code quality standards.
```

**Prompt to trigger this agent:**
```
@code-quality-auditor Review the API route handlers in doctor-patient-app/src/app/api/ (auth, doctors, patients, stats) and the React components in doctor-patient-app/src/components/ for code quality issues, anti-patterns, and adherence to Next.js best practices. Focus on maintainability, readability, and performance.
```

**Running Sub-agent:**
```
Spawan 3 sub-agents to check code quality for doctor-patient-app/src.
```

## Code Documentation Specialist Agent

```
We need to create a comprehensive code documentation specialist agent with expertise in generating clear, maintainable documentation across multiple programming languages and frameworks. Your primary responsibility is to ensure all code is thoroughly documented with clear comments, docstrings, and documentation that enhances code understanding and maintainability.
```

**Prompt to trigger this agent:**
```
@doc-specialist Generate comprehensive documentation for the utility modules in doctor-patient-app/src/lib/ (auth.ts, prisma.ts, theme.tsx) and the middleware in doctor-patient-app/src/middleware.ts. Add JSDoc comments for all exported functions, interfaces, and type definitions.
```

## Unit Test Generation Specialist Agent

```
We need to create an expert unit test generation specialist agent with deep knowledge of testing frameworks, best practices, and comprehensive test coverage strategies. Your primary responsibility is to analyze existing code and generate high-quality, maintainable unit tests that thoroughly validate functionality.
```

**Prompt to trigger this agent:**
```
@test-generator Analyze the API route handlers in doctor-patient-app/src/app/api/doctors/route.ts and doctor-patient-app/src/app/api/patients/route.ts and generate comprehensive unit tests covering GET, POST, PUT, and DELETE operations with edge cases, error handling, and mocking for Prisma database calls.
```

## Security Reviewer Agent

```
We need to create a vigilant security reviewer agent with expertise in identifying vulnerabilities and security risks across multiple programming languages and frameworks. Your primary responsibility is to proactively analyze code for potential security flaws, recommend security best practices, and ensure all code adheres to established security standards and compliance requirements.
```

**Prompt to trigger this agent:**
```
@security-reviewer Scan the doctor-patient-app codebase for security vulnerabilities — especially the auth flow in src/app/api/auth/ (plain-text password comparison in login/route.ts), session handling in src/lib/auth.ts, the middleware in src/middleware.ts, and the Prisma models in prisma/schema.prisma. Check for injection flaws, insecure session storage, missing input validation, and OWASP Top 10 risks. Provide remediation recommendations.
```

## Running Parallel Sub-Agents

You can spawn multiple agents simultaneously to work on independent tasks in parallel, dramatically speeding up your workflow.

**Prompt to run parallel agents:**
```
I need you to run the following agents in parallel:

1. @code-quality-auditor — Review the API routes in doctor-patient-app/src/app/api/ (doctors/route.ts, patients/route.ts, stats/route.ts) for code quality issues, missing error handling, and anti-patterns.
2. @security-reviewer — Scan the auth flow in doctor-patient-app/src/app/api/auth/ and session management in doctor-patient-app/src/lib/auth.ts for security vulnerabilities including plain-text passwords, insecure cookies, and missing input validation.
3. @test-generator — Generate unit tests for the API route handlers in doctor-patient-app/src/app/api/doctors/route.ts and doctor-patient-app/src/app/api/patients/route.ts covering all CRUD operations.

Run all three agents at the same time since they are independent of each other. Summarize the combined findings when all agents complete.
```

**When to use parallel agents:**
- Tasks are independent and don't depend on each other's output
- You want to analyze the same codebase from multiple perspectives simultaneously
- You need to speed up large review or generation tasks by dividing the work

**Prompt for parallel exploration across different directories:**
```
Run these agents in parallel:

1. Use an Explore agent to search doctor-patient-app/src/app/ for all pages that fetch data using useEffect and identify missing loading/error states.
2. Use an Explore agent to search doctor-patient-app/src/app/api/ for all route handlers that are missing input validation or error handling.
3. Use an Explore agent to search doctor-patient-app/src/components/ for all components and check if any have accessibility issues (missing ARIA labels, alt text, etc.).

Combine the results and give me a single improvement plan.
```

**Prompt for parallel code review + documentation generation:**
```
Run these two agents in parallel since they are independent:

1. @code-quality-auditor — Review the recent changes on this branch compared to main. Focus on bugs, logic errors, and maintainability in the doctor-patient-app API routes and React components.
2. @doc-specialist — Generate JSDoc documentation for all exported functions in doctor-patient-app/src/lib/auth.ts, doctor-patient-app/src/lib/prisma.ts, and doctor-patient-app/src/middleware.ts.

When both are done, show me the review findings first, then the generated documentation.
```

> **Tip:** Always specify that agents should run "in parallel" or "at the same time" in your prompt. Claude Code will only parallelize agent calls when you explicitly request it.

## Questions
```
1. Why do you need to create custom agents instead of using a single generalist agent for all tasks? What are the key benefits of having specialized agents for different roles and responsibilities?
```
```
2. How do custom agents help in managing context and improving response quality compared to using a single generalist agent for all interactions?
```
```
3. In what ways can custom agents enhance collaboration and efficiency within a development team, especially when working on complex projects with multiple areas of expertise required?
```

## Key Reasons for Creating Custom Agents

### Context Isolation and Management

Standard sessions have a 200K-token context window that can quickly become "polluted" with verbose tool outputs and long conversation histories, degrading response quality. Custom agents operate in their own isolated context windows, returning only a concise final result to the main session and keeping the primary thread clean.

### Specialized Expertise

You can define a persistent persona with a dedicated system prompt and detailed instructions for specific domains, such as a security reviewer, UI auditor, or performance analyzer. These specialized prompts often lead to more accurate and expert-level results than a generalist model.

### Fine-Grained Permission Control

Custom agents allow you to enforce the principle of least privilege. For example, you can create a "researcher" agent with strictly read-only tools to prevent accidental code modifications during analysis, while keeping full editing capabilities for an "implementer" agent.

### Parallel Execution

Claude Code can spawn up to 10 concurrent agents to work on different parts of a problem simultaneously. This dramatically speeds up read-heavy tasks like searching for all instances of a function across a massive codebase or auditing multiple files at once.

### Automatic Task Delegation

By providing a clear description in an agent's configuration, Claude can automatically route tasks to the most appropriate specialist without you needing to invoke it manually.

### Reusability and Sharing

Custom agents are defined in simple Markdown files (.agent.md). You can save them at the project level (.claude/agents/) to share standard workflows with your team via version control, or at the user level (~/.claude/agents/) for your own use across all your projects.
