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
