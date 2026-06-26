# Chapter 4: Custom Commands

## Task 1: DB Commands

### Sub Task 1.1: Create commands File
- **Create** `.cursor/commands/db-optimizer.md`
- **Copy content from:** [`commands/db-optimizer.md`](../commands/db-optimizer.md)

### Sub Task 1.2: Go to Slow Query file
- **Go to test file:** [`backend/slow-query.ts`](../../backend/slow-query.ts)


### Sub Task 1.3: Run Command
- **Go to your command chat tab.**
- **Type:** "Run DB Optimizer command on @backend/slow-query.ts"
- **Verify:** Agent identifies N+1 pattern
- **Check:** Suggests using relations
- **Check:** Shows expected improvement

### Sub Task 1.4: Apply Suggestion
- Use suggested fix (TypeORM relations)
- **Verify:** N+1 eliminated

**DB Optimizer Command Working If:**
- Identifies slow queries
- Uses postgres MCP for analysis
- Suggests concrete fixes
- Estimates performance gain

---

## Task 2: Testing Command

### Sub Task 2.1: Create Command File
- **Create** `.cursor/commands/test-generator.md`
- **Copy content from:** [`commands/test-generator.md`](../commands/test-generator.md)

### Sub Task 2.2: Run Command on Service
- **Go to your command chat tab.**
- **Type:** "Run Testing Command on auth.service.ts"
- **Verify:** Generates test file
- **Check:** Includes describe blocks
- **Check:** Mocks repositories
- **Check:** Tests happy path and errors

### Sub Task 2.3: Run Generated Tests
- **Save generated test file**
- **Run:** `cd backend && npm test`
- **Verify:** Tests run (may need minor fixes)

**Testing Command Working If:**
- Generates comprehensive tests
- Proper Jest syntax
- Includes mocks and edge cases
- Tests actually run

