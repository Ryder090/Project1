# User Interviews

I reached out to three founders/engineering leads in my network over Slack and Discord to validate the core premise of this tool. 

### Interview 1: "T.M.", CTO at a Seed-stage B2B SaaS
**Role & Stage:** Technical Co-founder, 12-person team (Seed)
**Context:** Chatted over Slack. I asked how they track their AI tool spend.

**Quotes:**
- "Honestly we don't track it well. I think we pay for Copilot for the engineers and ChatGPT for everyone else."
- "Wait, half the team just expensed Cursor last month. Are we still paying for Copilot? I need to check Rippling."
- "If a tool just scanned my GitHub org and told me who actually used their Copilot license in the last 30 days, I'd pay for that instantly."

**Most surprising thing:** He literally didn't know if they were double-paying for Copilot and Cursor across his engineering team until I asked the question.
**What it changed:** It validated the "Consolidation" logic in my engine. I made sure the engine specifically flags overlapping coding assistants as the primary recommendation.

### Interview 2: Sarah (Anonymous), VP Eng
**Role & Stage:** VP Engineering, ~40 person team (Series A)
**Context:** Cold DM on X (Twitter). She replied while waiting for a flight.

**Quotes:**
- "We just upgraded everyone to Claude Team plan because people complained about rate limits on the free tier."
- "To be honest, the biggest waste is probably our non-technical staff. Marketing asked for ChatGPT Enterprise but I guarantee they use it once a week."
- "I don't have time to do a granular audit of $30/mo subscriptions. If it's under $1k a month of waste, I don't really care right now."

**Most surprising thing:** Her threshold for caring was way higher than I expected. She explicitly said she wouldn't bother fixing it unless it was >$1,000/mo.
**What it changed:** This directly influenced my results page UI. I set the threshold for the Credex "Consultation CTA" to only trigger for >$500 in savings. Anything under that gets the "You're spending well" fallback, because busy executives won't take a sales call to save $80.

### Interview 3: "Alex", Solo Indie Hacker
**Role & Stage:** Solo Founder (Bootstrapped, ~$5k MRR)
**Context:** Indie hackers Discord server voice channel.

**Quotes:**
- "I subscribe to basically everything. Claude, ChatGPT, Cursor, v0. It's like $100 a month but it replaces a junior dev."
- "I tried using API keys directly in typingmind to save money but it was annoying to manage."
- "I don't think I'm overspending, AI is my highest ROI expense."

**Most surprising thing:** He views AI spend as incredibly cheap compared to the output, to the point where he *wants* to over-provision.
**What it changed:** It made me realize this tool is strictly for B2B teams of 10+ people. Solo devs or tiny 2-person teams aren't the target audience because the raw dollar waste isn't painful enough. I updated my `GTM.md` to exclusively target companies with >10 employees.
