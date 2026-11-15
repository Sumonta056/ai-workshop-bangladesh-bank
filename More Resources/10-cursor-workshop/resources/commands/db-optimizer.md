# Database Optimizer Command

## Purpose
Find and optimize slow database queries

## Steps
1. Find all TypeORM queries in the project
2. For each query found:
    - Use postgres MCP to run EXPLAIN ANALYZE
    - Check execution time
3. Identify queries taking >100ms
4. Suggest optimizations:
    - Add indexes
    - Use eager loading instead of N+1
    - Optimize WHERE clauses
5. Generate TypeORM migration for indexes
6. Measure performance improvement

## Output Format
For each slow query:
- Location: file and line number
- Current performance: execution time
- Issue: what's wrong
- Solution: how to fix
- Expected improvement: estimated speedup