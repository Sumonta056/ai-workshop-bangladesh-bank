# Git Workflow

## Standard Flow

```bash
git status --short --branch
git switch -c codex/my-workshop-task
git diff
git status --short
```

Only commit after reviewing the diff and receiving explicit approval.

## Branch Naming

Use a short branch name with the `codex/` prefix:

```text
codex/add-login-validation
codex/fix-dashboard-loading
codex/update-project-docs
```

## Review Before Commit

Ask Codex:

```text
Review the current diff for bugs, regressions, and missing tests.
```

Then inspect:

```bash
git diff
git status --short
```

## Commit Rule

Codex should not run `git commit`, `git push`, `git reset`, or destructive git operations unless the user explicitly asks for that action.
