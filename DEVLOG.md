# Devlog

## Day 1 — 2026-05-21
**Hours worked:** 5
**What I did:** Bootstrapped the Next.js 15 app with Tailwind v4 and shadcn/ui. Built out the basic landing page hero and routing structure for the multi-step audit form.
**What I learned:** Upgrading to Next.js 15 App router with Tailwind v4 is extremely fast, but the component caching is definitely acting a bit differently than what I'm used to in the older pages router.
**Blockers / what I'm stuck on:** Fought with shadcn's new base-ui dependency for an hour. It was passing `asChild` incorrectly to DOM elements and throwing React hydration errors. Fixed it by ripping it out and just using Radix UI `Slot` directly.
**Plan for tomorrow:** Build the multi-step Zustand form and hook up React Hook Form.

## Day 2 — 2026-05-22
**Hours worked:** 6
**What I did:** Wrote `useAuditStore` with Zustand for state persistence. Built the company and tools step components. Also scraped official pricing pages to draft `PRICING_DATA.md`.
**What I learned:** Zustand's persist middleware is a lifesaver for multi-step forms. It saves everything to localStorage instantly so users don't lose all their input if they accidentally refresh the page midway through the audit.
**Blockers / what I'm stuck on:** Handling nested state arrays in Zustand (like updating a specific tool's license count) was super annoying, but got it working with standard `.map()`.
**Plan for tomorrow:** Build the actual core math engine (`audit-engine.ts`).

## Day 3 — 2026-05-23
**Hours worked:** 5
**What I did:** Wrote `audit-engine.ts`. Tested the downgrade, consolidate, and Credex credit heuristic rules. Connected the output to `results-step.tsx`.
**What I learned:** I initially wanted to just throw all the usage data at an LLM and ask it for the savings math, but quickly realized that's a terrible idea. LLMs hallucinate numbers and it's completely non-deterministic. Hardcoded heuristic rules are way more defensible for a financial audit tool.
**Blockers / what I'm stuck on:** Figuring out edge cases where a user has two overlapping coding assistants was tricky. Decided the easiest logic is to just recommend canceling the cheaper one and keeping the one they spend more on (assuming that's their primary tool).
**Plan for tomorrow:** Add Supabase backend and Resend email capability.

## Day 4 — 2026-05-24
**Hours worked:** 7
**What I did:** Setup Supabase client. Created a Server Action to save leads and send transactional emails. Built the public shareable report route `/report/[id]`. Wrote a quick in-memory rate limiter to stop abuse.
**What I learned:** Next.js Server Actions make handling backend logic so much simpler than spinning up dedicated API routes. The native OpenGraph metadata generation is also pretty slick.
**Blockers / what I'm stuck on:** Getting the shareable report page to look good required annoying hydration management to ensure the fallback data worked correctly when DB keys weren't present.
**Plan for tomorrow:** Testing, UI Polish, and writing all the business docs.

## Day 5 — 2026-05-25
**Hours worked:** 6
**What I did:** Done! Added Framer Motion UI polish so it doesn't look like a basic template. Setup Vitest and wrote 5 unit tests for the engine. Wrote all markdown files (GTM, Metrics, Economics, User Interviews). Added GitHub Actions CI.
**What I learned:** Writing unit tests for a rule engine is actually pretty satisfying and it caught a stupid bug where I wasn't properly downgrading rarely used coding tools. 
**Blockers / what I'm stuck on:** None. Feature complete and deployed.
**Plan for tomorrow:** Sleep.

## Day 6 — 2026-05-26
**Hours worked:** 0
**What I did:** Finished project early on day 5, taking the day off.

## Day 7 — 2026-05-27
**Hours worked:** 0
**What I did:** Finished project early on day 5, taking the day off.
