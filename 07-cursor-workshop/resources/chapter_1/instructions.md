# Chapter 1: Core Features - Ask, Inline Edit, Agent, Plan & Debug

## Task 1: Ask

### Sub Task 1.1: Basic Question
- **Open Cursor**
- **Go to your agent chat tab.**
- **Type:** "Give me an overview of the project. Identify key components and project structure."
- **Verify:** It responds with project details.
- **Type:** "What are the best practices for NestJs?"
- **Verify:** Gets comprehensive answer with decorators, DTOs, etc. 
- **Note**: For general questions use Gemini as we have pro subscription there. Also Antigravity is quite good.

### Sub Task 1.2: With @Files Context
- **Go to your agent chat tab.**
- **Type:** `@backend/src/app.controller.ts` or just `@app.controller.ts`. Explain this code. (See [`backend/src/app.controller.ts`](../../backend/src/app.controller.ts))
- **Verify:** AI references the actual file content
- **Check:** Mentions @Controller, @Get, health endpoint

### Sub Task 1.3: With Semantic Context
- **Go to your agent chat tab.**
- **Type:** "Find all TypeORM configurations"
- **Verify:** Searches entire project
- **Check:** Finds [`database.config.ts`](../../backend/src/config/database.config.ts)

### Sub Task 1.4: With @Docs Context
- **Go to your agent chat tab.**
- **Type":** "@Docs NestJS Was nestjs best practices used in this project"
- **Verify:** Accesses external NestJS documentation
- **Type:** "@Docs NestJS Guards explain how they work"
- **Check:** Gets accurate Guard explanation
- **For regular question, use gemini:** 


### Sub Task 1.5: Model Comparison
- **Previous prompt with GPT-5.2, Claude Sonnet 4.5, Claude Haiku, Grok Code** (change in dropdown and run parallely)
- **Verify:** Can switch models
- **Note:** Response time and quality differences

### Sub Task 1.6: Chat Summarize
- Continue some more chat in Sub Task: 1.4 chat window
- Then call `/summarize` from chat window
- **Verify**: Chat context has shortened.

---

## Task 2: Inline Edit

### Sub Task 2.1: Add Documentation
- **Open [`backend/src/app.service.ts`](../../backend/src/app.service.ts)**
- **Select entire `getHealth()` function**
- **Press Cmd+K**
- **Type:** "Add comprehensive JSDoc documentation"
- **Verify:** Adds proper JSDoc above function

### Sub Task 2.2: Add Validation
- **Go to test file:** [`backend/src/test-dto.ts`](../../backend/src/test-dto.ts)
- **Select the class**
- **Cmd+K**
- **Type:** "Add class-validator decorators"
- **Verify:** Adds @IsString(), @IsNumber(), etc.

### Sub Task 2.3: Accept Word-by-Word (Tab)
- **Verify that you have partial accepts enabled in cursor settings "Tab" section**
- **Open [`backend/src/app.service.ts`](../../backend/src/app.service.ts)**
- **Write a comment end of getHealth() function:** `//add a getReadiness()`
- **Instead of Tab, press Cmd+→ repeatedly**
- **Verify:** Can accept changes word-by-word
- **Check:** Can stop mid-change if needed

**Inline Edit Working If:**
- All edits apply correctly
- Can accept with Tab or word-by-word

---

## Task 3: Agent & (Plan+Agent) mode (Cmd+I)

### Sub Task 3.1: (Agent Mode only) Create Simple Entity
- **Press Cmd+I**
- **Use the prompt from:** [`prompts/agent_mode_entity.md`](../prompts/agent_mode_entity.md)
- **Verify:** Shows file preview before accepting
- **Check:** Uses @Entity, @Column, @PrimaryGeneratedColumn
- **Accept changes**

### Sub Task 3.2: (Agent + Plan mode) Create Module Structure
- **Cmd+I**
- **Use the prompt from:** [`prompts/plan_mode_module.md`](../prompts/plan_mode_module.md)
- **Verify:** Creates all files
- **Check:** Proper imports and dependencies
- **Check:** DTOs use class-validator
- **Review all files before accepting**

---

## Task 4: Debug Mode Showcase

### Sub Task 4.1: Locate the Code
- **Open [`backend/src/app.service.ts`](../../backend/src/app.service.ts)** and find the `calculateUserMetrics` method.
    - Note the external API calls and the aggregation logic.
- **Open [`backend/src/app.controller.ts`](../../backend/src/app.controller.ts)** and find the `getMetrics` endpoint.

### Sub Task 4.2: Trigger the Bug
- **Run the application:** `npm run start:dev` (in backend folder, if you haven't already)
- **Visit:** `http://localhost:3000/api/metrics/1`
- **Verify:** Browser/Client shows 500 Internal Server Error.

### Sub Task 4.3: Debug with AI
- **In the terminal where error occurred:**
- **Click "Debug with AI"** button (if visible next to error)
- **OR Copy stack trace** → Open Chat (Cmd+L) → Type "Fix this"
- **Verify:** AI identifies property access issue (`p.titel` vs `p.title`).
- **Verify:** AI suggests the correct fix.
---