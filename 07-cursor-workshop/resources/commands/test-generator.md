# Testing Agent

## Purpose
Generate comprehensive test suites

## Steps
1. Analyze the code file
2. Identify all methods/functions
3. For each method, generate:
    - Unit test with Jest
    - Mock dependencies
    - Test happy path
    - Test error cases
    - Test edge cases
4. Generate E2E tests with Supertest (for controllers)
5. Ensure 80%+ code coverage

## Output
- tests/[filename].spec.ts
- Proper Jest/NestJS testing syntax
- All necessary mocks