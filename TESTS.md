# Testing Strategy

For this MVP, our testing philosophy is pragmatic and risk-focused. We don't have 100% test coverage across React components, but we ensure the core value proposition (the audit engine math) works flawlessly.

## Automated Tests

We use Vitest to run our testing suite. We have written 5 automated tests specifically covering the `audit-engine.ts` logic.

| Filename | Test Description | What it covers |
|----------|-----------------|-----------------|
| `src/lib/audit-engine.test.ts` | Test 1: should calculate correct savings when consolidating overlapping chat tools | Verifies that if a user has ChatGPT and Claude, the engine recommends keeping the one with higher spend and canceling the other to eliminate fragmentation. |
| `src/lib/audit-engine.test.ts` | Test 2: applies downgrade rule correctly for single rarely used tools | Verifies the usage heuristics. If a user has a $100 tool but uses it "rarely", it recommends a downgrade to a free/shared tier. |
| `src/lib/audit-engine.test.ts` | Test 3: detects wrong plan for usage (Team tier for <3 users) | Verifies seat-based tier heuristics. If a team is on a 'Team' plan with only 2 seats, it correctly suggests downgrading to individual 'Pro' plans to save money. |
| `src/lib/audit-engine.test.ts` | Test 4: recommends credits for enterprise or high-spend retail accounts | Verifies the core Credex value prop. If a user spends >$500/mo or is on an Enterprise plan, it flags the spend for secondary market credit sourcing. |
| `src/lib/audit-engine.test.ts` | Test 5: cancels engineering tools for pure writing/content teams | Verifies the `primaryUseCase` checks. If a copywriting agency is paying for GitHub Copilot, it correctly flags it as a complete waste of capital and recommends cancellation. |

## Running Tests
To run the automated tests locally:
```bash
npm run test
```

## CI/CD
These tests run automatically on every PR to `main` via GitHub Actions (`.github/workflows/ci.yml`).
