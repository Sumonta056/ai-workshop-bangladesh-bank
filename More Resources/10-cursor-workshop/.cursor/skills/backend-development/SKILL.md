---
name: backend-development
description: Guides backend development following NestJS best practices, TypeORM patterns, and project conventions. Use when creating backend modules, services, controllers, or working with database entities.
---

# Backend Development

## Module Creation Pattern

When creating a new module, follow this structure:

```
modules/[name]/
├── [name].module.ts
├── [name].controller.ts
├── [name].service.ts
├── entities/
│   └── [name].entity.ts
└── dto/
    ├── create-[name].dto.ts
    └── update-[name].dto.ts
```

## Entity Standards

- Use TypeORM decorators: `@Entity()`, `@PrimaryGeneratedColumn()`, `@Column()`
- Always include `createdAt` and `updatedAt` timestamps
- Use `@CreateDateColumn()` and `@UpdateDateColumn()`
- Add indexes for frequently queried fields

## DTO Standards

- Use `class-validator` decorators: `@IsString()`, `@IsOptional()`, `@IsEmail()`, etc.
- Use `class-transformer` for transformations
- Create separate DTOs for create and update operations
- Never use `any` type

## Service Pattern

```typescript
@Injectable()
export class NameService {
  constructor(
    @InjectRepository(Entity)
    private repository: Repository<Entity>,
  ) {}

  async create(dto: CreateDto): Promise<Entity> {
    // Implementation
  }
}
```

## Controller Pattern

- Use Swagger decorators: `@ApiTags()`, `@ApiOperation()`, `@ApiResponse()`
- Use proper HTTP status codes
- Include error handling with try-catch blocks
