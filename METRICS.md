# Product Metrics

### The North Star Metric
**Identified Savings Volume (Monthly)**: The total dollar amount of savings our audit engine surfaces to users each month. 
Why? Because AuditAI is fundamentally a lead-generation engine for Credex. If we aren't finding massive piles of wasted money for our users, they have zero reason to book a consultation with the sales team. Tracking daily active users (DAU) is a vanity metric for a tool like this—a VP of Engineering might only use this tool once a year during budget season. We care about the *value* of the leads, not the frequency of the visits.

### The 3 Input Metrics
To drive up that North Star, I'd track these three input metrics:
1. **Audit Completion Rate:** The percentage of users who start the form vs finish it. If this drops below 60%, the form is too long or the pricing data inputs are too confusing.
2. **Email Capture Conversion Rate:** The percentage of completed audits where the user actually hands over their email to get the full report. This measures how compelling our "teaser" UI is.
3. **High-Value Lead Ratio:** The percentage of completed audits that flag >$500 in savings. If this number is too low, our GTM strategy is broken because we are driving traffic from indie hackers and solo devs instead of our target B2B buyers.

### What I'd instrument first
I'd immediately set up PostHog and track the funnel:
`Landed on Page` -> `Started Audit` -> `Completed Audit` -> `Entered Email` -> `Booked Consultation`.
I'd also capture the `companySize` parameter as a user property in PostHog so we can segment the funnel and see if our drop-off is higher for Enterprise users vs Seed stage.

### The Pivot Trigger
If the **High-Value Lead Ratio** stays under 5% for two consecutive weeks despite 1,000+ top-of-funnel visitors, it means the product is fundamentally flawed as a lead-gen tool for Credex. It would mean that either startups aren't actually overspending on AI tools as much as we hypothesized, or our engine isn't aggressive enough at finding savings. That's the trigger to pivot the engine logic or kill the project.
