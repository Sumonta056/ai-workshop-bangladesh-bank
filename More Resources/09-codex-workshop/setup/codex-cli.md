# Codex Setup Notes

## Access

Use the Codex environment provided for the workshop. This may be the Codex desktop app, Codex CLI, or an approved hosted workspace.

## First Commands to Try

Ask Codex:

```text
Give me a brief overview of this project.
```

Then ask:

```text
Inspect the repository and tell me the main build, test, and development commands.
```

## Good Operating Pattern

Use this loop for most tasks:

1. Ask for a project-aware plan.
2. Review the affected files and expected behavior.
3. Approve the implementation.
4. Let Codex edit.
5. Ask Codex to run focused verification.
6. Review the diff.

## Notes for Instructors

- Keep the first exercise read-only.
- Make the second exercise documentation-only.
- Move to code edits after participants understand planning and verification.
- Do not start with commits or pull requests; introduce them after diff review.
