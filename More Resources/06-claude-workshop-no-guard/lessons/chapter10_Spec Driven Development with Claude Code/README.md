# Spec-Driven Development with Claude Code

Build a feature for the Doctor-Patient app using the **Superpowers** plugin — an agentic framework that handles brainstorming, planning, and implementation automatically. You just provide a prompt describing what you want, and Superpowers drives the entire workflow.

## Setup

Install the Superpowers plugin in Claude Code by running these two commands:

```
/plugin marketplace add obra/superpowers-marketplace
```

```
/plugin install superpowers@superpowers-marketplace
```

## How It Works

1. You give Claude Code a **prompt** describing the feature you want.
2. Superpowers kicks in automatically — it **brainstorms** with you, asks clarifying questions, and presents a design for your approval.
3. Once approved, it creates a **task plan** with bite-sized implementation steps.
4. It **executes** each task, writes tests (TDD), and checks in with you at key milestones.
5. You review the final result.

You don't write specs or plans — **Superpowers generates them from your prompt** and seeks your approval before writing code.

## Exercise: Add Medicine Management

We will add a **Medicine Management** module to the clinic app — following the same pattern as the existing Doctors and Patients modules (listing page, detail view, add/edit forms, seed data).

### Run This Prompt in Claude Code (Medicine Management module)

```
Add a Medicine Management module to this clinic app. It should follow the exact same flow and patterns as the existing Doctors and Patients modules.

The Medicine model should have: name, generic name, category (e.g. Antibiotic, Painkiller, Antihypertensive, Antidiabetic, Vitamin), manufacturer, dosage form (Tablet, Capsule, Syrup, Injection, Cream), strength (e.g. "500mg", "10mg/5ml"), price, stock quantity, requires prescription (boolean), and status (Available, Out of Stock, Discontinued).

Add a "Medicines" link in the sidebar. The medicines listing page should show a searchable table with columns for name, category, dosage form, strength, stock quantity, and status. Include an "Add Medicine" button that opens a form page. Each medicine row should link to a detail page with all fields and an edit option.

Seed the database with 15-20 medicines like Amoxicillin, Ibuprofen, Metformin, Lisinopril, Cetirizine, Omeprazole, Paracetamol, Azithromycin, Vitamin D3, Insulin Glargine, Salbutamol Inhaler, Diclofenac Gel, Metoprolol, Atorvastatin, and Folic Acid — with realistic dosage forms, strengths, prices, and stock quantities. Follow the same seed pattern used for doctors and patients in seed.ts.

Use the existing tech stack and code patterns throughout.
```

### What to Expect

Superpowers will guide you through:

1. **Brainstorming** — It will ask clarifying questions like "Should medicines be linked to prescriptions?" or "Do you need stock alerts?" Answer based on what makes sense to you.
2. **Design Review** — It will present the database schema, API design, and UI layout for your approval before writing any code.
3. **Implementation** — It will create tasks and execute them: Prisma schema changes, API routes, seed data, and UI components.
4. **Testing** — It will write and run tests for the new functionality.

### After Implementation

- Run `pnpm exec prisma migrate dev` if prompted to apply schema changes.
- Run `pnpm exec prisma db seed` to populate medicine data.
- Start the app with `pnpm dev` and log in with `admin@clinic.com` / `password123`.
- Navigate to the new Medicines section in the sidebar.

## What You Learned

- How to install the Superpowers plugin in Claude Code
- How a single prompt drives an entire spec-driven development workflow
- How Superpowers handles brainstorming, planning, and implementation — you just approve and guide
