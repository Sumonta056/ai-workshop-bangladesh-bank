# Chapter 1: Introduction to CLAUDE.md

## Overview

This chapter is focused to create a simple application for doctor-patient management system using Next.js, Prisma, Ant Design, Tailwind CSS, and SQLite. The application will have features like authentication, dashboard with charts, and CRUD operations for doctors and patients. The implementation will follow a structured approach with a clear folder structure and database schema.

Our approach was to craete a plan and then execute it step by step, ensuring that we cover all the necessary aspects of the application development process. We will start with setting up the Next.js application, followed by configuring Tailwind CSS, and then move on to defining the Prisma schema and seeding the database. After that, we will implement the authentication system, create the necessary API routes, and finally build out the frontend components and pages.

Also this chapter introduces the fundamental concepts and best practices for working effectively with CLAUDE.md files. You will learn how to create well-structured prompts, optimize your AI interactions, and leverage CLAUDE.md across different architectural patterns.

## Prompts Used

### Project Prompt

Let's create a latest nextjs(16.2) project about Doctors and Patient management system. We will have 6 screens. Login, Signup, Dashboard, Doctors List, patient List and settings. The projects look and feel should be modern, polished. For database we will use local sqlite. User credentials could be hardcoded and default for ease of access. we should use tailwind/ant whichever fit best. All the data will come from hardcode moke or seed data. Dashboard should look modern with graphs and charts to give best feel for admin. Collapsible menus for flexibility. In settings we can keep some basic settings with light and dark mode. Now make a plan and we will review then implement.

## Problems Faced

Prisma 7 introduced breaking changes from Prisma 5/6, which caused issues with the setup and configuration of the database. We have used **context7 plugin** to resolve these issues and ensure that the application is set up correctly with the latest version of Prisma.


## What is CLAUDE.md?

**CLAUDE.md** is a guidance file that provides context and documentation for AI assistants (specifically Claude Code) working with a codebase. It's a repository-specific instruction file that helps AI understand the project structure, conventions, and requirements without cluttering code comments or general documentation.

### Problems It Solves

1. **Context Communication** — Communicates important project information to Claude Code efficiently and consistently
2. **Tech Stack Clarity** — Lists all libraries, frameworks, and versions so Claude understands the exact environment (e.g., "Next.js 16 with React 19 and TypeScript")
3. **Architecture Documentation** — Explains how the codebase is organized (routing, API structure, auth flow, database schema) enabling Claude to navigate and modify code correctly
4. **Prevents Hallucination** — By explicitly stating versions and how they work, it prevents Claude from suggesting outdated patterns or incompatible code
5. **Development Guidance** — Provides exact commands for development, building, testing, and database operations
6. **Workflow Efficiency** — Reduces back-and-forth questions by establishing credentials, environment variables, and project specifics upfront

## Architectural Patterns

We demonstrate CLAUDE.md implementation across two primary architectural paradigms:

### 1. Microservice Architecture
Discover how to distribute and manage CLAUDE.md files across independent microservices while maintaining consistency and avoiding duplication.

**[View Interactive Microservice Diagram](resources/microservice_claude_md_diagram.html)**

### 2. Monolithic Architecture  
Learn how to structure CLAUDE.md hierarchically within a large monolithic codebase, with clear patterns for auto-loading and on-demand file loading.

**[View Interactive Monolith Diagram](resources/monolith_claude_md_diagram.html)**

## Best Practices Guide

For comprehensive guidance on CLAUDE.md best practices, standards, and technical considerations, refer to:

📖 **[CLAUDE.md Best Practices Slide](resources/Claude_MD_Best_Practices_Slide.pdf)**

📖 **[CLAUDE.md Best Practices Guide](resources/Claude_MD_Best_Practices_Guide.pdf)**

## Key Concepts

Each pattern demonstrates:
- Effective organizational structure
- Clear separation of concerns
- Optimal prompt design for different contexts
- Integration patterns with development workflows


## References
📖 **[Writing a agood Claude.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)**

## References

- [PLAN.md](../../PLAN.md) - Project plan and implementation roadmap