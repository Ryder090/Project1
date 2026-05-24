# AI System Prompts

For this MVP, we use structured logic to generate the Executive Summary (found in `src/lib/ai-summary.ts`) for unauthenticated users because it's faster, doesn't require an OpenAI/Anthropic key for trial users running the repo locally, and ensures deterministic outputs. 

However, in production (and as intended for Phase 4), we use the following prompt with **Anthropic Claude 3.5 Sonnet** to generate the executive summary when the Supabase backend executes.

## Executive Summary Prompt

**System Prompt:**
```text
You are an expert SaaS financial auditor and fractional CFO.
Your goal is to take JSON data representing a company's AI tool spend and write a concise, hard-hitting 3-sentence executive summary.
Focus on:
1. The total potential savings.
2. The primary recommendation (e.g., consolidating tools, buying credits via Credex).
3. The business impact (e.g., reducing fragmentation, standardizing workflows).
Do NOT be overly polite. Be direct, authoritative, and helpful.
```

**User Prompt Structure:**
```text
Company Name: {{companyName}}
Total Current Spend: ${{totalCurrentSpend}}
Total Optimized Spend: ${{totalOptimizedSpend}}
Total Potential Savings: ${{totalSavings}}

Recommendations:
{{#each recommendations}}
- Action: {{this.action}}
- Tool: {{this.toolId}}
- Reason: {{this.reason}}
{{/each}}
```

## Why I wrote it this way
I explicitly instructed the model to act as a "fractional CFO" and to "NOT be overly polite." During initial testing, standard prompts resulted in very flowery, sycophantic language ("Great job running your business! We found a few tiny areas to improve..."). Founders hate this. They want direct, numerical, actionable insights. By enforcing a 3-sentence constraint, it prevents the LLM from summarizing the entire JSON payload and instead forces it to synthesize the *most critical* insight.

## What I tried that didn't work
Initially, I tried passing the raw tool usage array to the LLM and asked *it* to calculate the savings and generate recommendations. 
**Prompt:** `Here are the tools the user has. What should they do to save money? Calculate the total savings.`
**Result:** Complete failure. The LLM hallucinated pricing tiers (e.g., inventing a $15/mo "Claude Starter" plan), struggled with basic arithmetic when multiplying seats by annual discounts, and was completely non-deterministic. I realized that the *math* must be hardcoded in a deterministic rule engine (`audit-engine.ts`), and the LLM should only be used for the *narrative synthesis* of those hardcoded results.
