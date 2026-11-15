---
name: database-operations
description: Handles database migrations, seeding, and TypeORM operations. Use when creating migrations, seeding data, or working with database schema changes.
---

# Database Operations

## Migration Commands

```bash
# Generate migration
npm run migration:generate -- src/database/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

## Migration Pattern

- Always use descriptive names
- Include both up and down methods
- Test migrations in both directions
- Never modify existing migrations (create new ones)

## Seeding Pattern

- Use TypeORM's DataSource for seeding
- Clear existing data before seeding
- Use transactions for data integrity
- Seed in dependency order (users before tasks)

## Entity Relationships

- Use `@ManyToOne()` and `@OneToMany()` decorators
- Always set `onDelete: 'CASCADE'` or `onDelete: 'SET NULL'` explicitly
- Use `@JoinColumn()` for foreign keys
- Add indexes for foreign key columns
