# Architecture Overview

## Current Stack (Phase 2)
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **State Management:** Zustand (for multi-step form persistence)
- **Form Handling:** React Hook Form
- **Validation:** Zod

## Key Decisions

### State Management
We chose `zustand` with the `persist` middleware for the Audit Form. Since the form spans multiple routes/steps and holds complex nested arrays (the tools), React Context would be too boilerplate-heavy. Zustand allows us to easily hydrate state from local storage so users don't lose progress if they refresh.

### Audit Engine
The recommendation engine (`src/lib/audit-engine.ts`) is currently rule-based. This ensures deterministic, financially defensible results rather than relying on unpredictable LLM outputs for math.
- We group tools into `Chat` and `Coding` categories.
- Overlap detection identifies redundant spending.

### Future Considerations (Phase 3 & 4)
- We will integrate Supabase to persist these results on the backend so users can share links to their reports.
- We will add an AI layer to summarize the rule-based findings into a nice narrative.
