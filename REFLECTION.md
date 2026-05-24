# Reflection

### 1. The hardest bug you hit this week, and how you debugged it
The most annoying bug I hit was a hydration mismatch error thrown by `shadcn/ui` button components on the very first day. The console error was: `React does not recognize the asChild prop on a DOM element`. 
My first hypothesis was that I imported the Link component wrong or nested an `<a>` tag inside a button improperly. I tried wrapping it in different variants, but nothing worked. Then I dug into the `shadcn/ui` GitHub issues and realized that version 4.8 of their CLI had introduced an experimental `@base-ui` dependency that was fundamentally breaking the `asChild` prop propagation in Next.js 15. 
To fix it, I completely ripped out the new base-ui dependency from `button.tsx` and manually reverted it to use `@radix-ui/react-slot`. It immediately solved the hydration error.

### 2. A decision you reversed mid-week, and what made you reverse it
Mid-week, I had to completely scrap my plan to use an LLM for calculating the potential savings. 
Originally, I thought it would be really cool to just pass the user's JSON payload of tools to the Anthropic API and say "calculate the savings." But after building the first prototype, I realized it was a horrible idea. The LLM kept hallucinating basic math—sometimes it would say downgrading from $30 to $20 for 5 users saves $100 instead of $50.
I reversed the decision and built a deterministic, hardcoded rules engine (`audit-engine.ts`) instead. A financial audit tool has to be mathematically defensible; if a CFO sees bad math, the credibility is instantly destroyed. Now, the LLM is only used to write the 3-sentence summary at the end, which is what it's actually good at.

### 3. What you would build in week 2 if you had it
If I had another week, I'd build a "Benchmark Mode" feature. Right now, the tool tells you if your own stack is optimized internally. But what founders really want to know is: "Am I spending more per developer than other Series A startups?" 
I would aggregate the anonymized data from the Supabase `audits` table to calculate the average AI spend per engineer across different company sizes. Then, on the results page, I'd show a dial: "Your team spends $85/dev on AI. The top decile of startups spend $45/dev." That peer pressure is a massive driver for booking the Credex consultation.

### 4. How you used AI tools
I used Cursor with the `claude-3-5-sonnet` model as my primary daily driver. 
I used it heavily for boilerplate generation—specifically scaffolding out the Tailwind UI components, setting up the Zustand store persistence logic, and writing the basic Vitest test suite. It saved me hours of typing out standard React hooks.
However, I explicitly *did not* trust it to write the heuristic rules in `audit-engine.ts` or the business logic for the `ECONOMICS.md` and `GTM.md` files. I had to write those manually. 
At one point, I asked Cursor to write a regex to validate company emails, and it generated a pattern that blocked valid top-level domains like `.io` and `.co`. I caught it during manual testing and ended up just using standard HTML5 email validation instead to avoid dropping leads.

### 5. Self-rating on a 1–10 scale
**Discipline: 9/10** — I planned the architecture out completely on day 1 and shipped the code steadily over 5 days without needing to cram at the last minute.
**Code quality: 8/10** — The React components are clean and the Zustand state is well isolated, though I could have definitely extracted the engine rules into a more modular config file instead of a massive `if/else` block.
**Design sense: 8/10** — The UI looks like a premium, modern SaaS product (dark mode, glassmorphism, Framer Motion) rather than a generic Bootstrap template.
**Problem-solving: 9/10** — Quickly pivoting away from LLM math to deterministic logic showed I care more about the product working than using AI for the sake of it.
**Entrepreneurial thinking: 10/10** — I didn't just build a coding exercise. I built a genuine B2B lead-gen funnel engineered specifically to book high-value consultations for Credex.
