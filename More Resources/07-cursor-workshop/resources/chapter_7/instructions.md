# Chapter 7: Cursor Skills

## Task 1: Create Project-Level Skills

### Sub Task 1.1: Create Skills Directory Structure
- **Create** `.cursor/skills/` directory in project root


### Sub Task 1.2: Create Backend Development Skill
- **Create** `.cursor/skills/backend-development/` directory
- **Create** `SKILL.md` file with this content:
    ```markdown
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
    ```
- **Save file**

### Sub Task 1.3: Verify Backend Skill Works
- **Type:** "Create a tasks module"
- **Verify:**
    - Agent follows the module structure
    - Creates entities with proper decorators
    - Adds timestamps automatically
    - Uses class-validator in DTOs
    - Includes Swagger decorators in controller

### Sub Task 1.4: Create Frontend Development Skill
- **Create** `.cursor/skills/frontend-development/` directory
- **Create** `SKILL.md` file:
    ```markdown
    ---
    name: frontend-development
    description: Guides frontend development using Next.js 14 App Router, React Server Components, and Tailwind CSS. Use when creating components, pages, or working with client-side interactions.
    ---

    # Frontend Development

    ## Component Structure

    - Server components by default (no 'use client' unless needed)
    - Use 'use client' only for: hooks, event handlers, browser APIs
    - Named exports (no default exports)
    - Functional components only

    ## File Organization

    ```
    src/
    ├── app/              # Next.js App Router pages
    ├── components/       # Reusable components
    │   ├── ui/          # Base UI components
    │   └── features/    # Feature-specific components
    └── lib/             # Utilities and hooks
    ```

    ## Styling Standards

    - Use Tailwind CSS for all styling
    - Use utility classes, avoid custom CSS
    - Follow mobile-first responsive design
    - Use semantic HTML elements

    ## Component Pattern

    ```typescript
    'use client' // Only if needed

    import { useState } from 'react'

    export function ComponentName({ prop }: Props) {
      // Implementation
      return <div>...</div>
    }
    ```

    ## API Integration

    - Use fetch for server components
    - Use axios or fetch for client components
    - Handle loading and error states
    - Use TypeScript types for API responses
    ```
- **Save file**

### Sub Task 1.5: Verify Frontend Skill Works
- **Cmd+I** or **Ask**
- **Type:** "Create a TaskCard component"
- **Verify:**
    - Creates component in correct location
    - Uses proper Next.js 14 patterns
    - Includes Tailwind styling
    - Follows naming conventions

### Sub Task 1.6: Create Database Skill
- **Create** `.cursor/skills/database-operations/` directory
- **Create** `SKILL.md` file:
    ```markdown
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
    ```
- **Save file**

### Sub Task 1.7: Test Database Skill
- **Type:** "Create a migration to add a status field to tasks"
- **Verify:**
    - Generates proper migration file
    - Includes up and down methods
    - Uses correct TypeORM syntax

## Task 2: Create Personal Skills (Optional)

### Sub Task 2.1: Understand Personal vs Project Skills
- **Personal skills**: `~/.cursor/skills/` - Available across all projects
- **Project skills**: `.cursor/skills/` - Shared with repository
- **Never create** in `~/.cursor/skills-cursor/` (reserved for Cursor)

### Sub Task 2.2: Create Personal Git Skill (Example)
- **Create** `~/.cursor/skills/git-workflow/` directory
- **Create** `SKILL.md`:
    ```markdown
    ---
    name: git-workflow
    description: Generates conventional commit messages and manages git workflow. Use when committing changes, creating branches, or writing commit messages.
    ---

    # Git Workflow

    ## Commit Message Format

    Use conventional commits:
    - `feat:` for new features
    - `fix:` for bug fixes
    - `docs:` for documentation
    - `refactor:` for code refactoring
    - `test:` for tests
    - `chore:` for maintenance

    Format: `type(scope): description`

    Example: `feat(auth): add JWT token validation`
    ```
- **Note**: This skill will be available in all your projects

## Task 3: Skill Best Practices

### Sub Task 3.1: Skill Description Guidelines
- **Write in third person** (the description is injected into system prompt)
- **Be specific** - Include trigger terms
- **Include both WHAT and WHEN**
- **Max 1024 characters**

### Sub Task 3.2: Skill Content Guidelines
- **Keep SKILL.md under 500 lines**
- **Use progressive disclosure** - Put details in separate files
- **Be concise** - Only add context the agent doesn't already have
- **Use examples** - Show concrete patterns, not abstract concepts

### Sub Task 3.3: Verify Your Skills
- Check that skills are discoverable by asking relevant questions
- Test that skills provide correct guidance
- Ensure skills don't conflict with each other
- Verify file references work correctly

## Summary

You've learned to:
- ✅ Create project-level skills in `.cursor/skills/`
- ✅ Structure skills with proper YAML frontmatter
- ✅ Write effective skill descriptions
- ✅ Create reusable development patterns
- ✅ Understand personal vs project skills
