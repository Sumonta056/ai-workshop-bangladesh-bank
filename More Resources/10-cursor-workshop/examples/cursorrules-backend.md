# Backend .cursorrules Reference

Use this as a reference when completing the Hour 2 `.cursorrules` exercise in `backend/`.

The active project rules live in `.cursor/rules/backend-general.mdc` (Cursor Rules format with globs).

## Tech Stack

- NestJS 10, TypeScript 5
- TypeORM 0.3
- PostgreSQL 15
- Redis 7

## Module Structure

```
modules/[name]/
├── [name].module.ts
├── [name].controller.ts
├── [name].service.ts
├── entities/[name].entity.ts
└── dto/create-[name].dto.ts
```

## Code Standards

- Use @Injectable for services
- Use @Controller for controllers
- DTOs must use class-validator
- No `any` types
- Always add Swagger decorators
