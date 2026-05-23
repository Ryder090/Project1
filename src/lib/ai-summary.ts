import { AuditResult } from "./audit-engine";

/**
 * In a real production app, this would call OpenAI or Anthropic API.
 * For this MVP, we use structured logic to mock a believable AI summary
 * and provide a fallback if the AI service fails.
 */
export async function generateAuditSummary(companyName: string, result: AuditResult): Promise<string> {
  // Simulate network delay for AI generation
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const totalTools = result.recommendations.length;
  const savingsPct = result.totalCurrentSpend > 0 
    ? Math.round((result.totalSavings / result.totalCurrentSpend) * 100)
    : 0;

  // Fallback / Mock AI generated narrative
  let narrative = `Based on our analysis of ${companyName}'s SaaS spend across ${totalTools} AI tools, `;

  if (savingsPct > 20) {
    narrative += `we found significant fragmentation. You can reduce your monthly spend by ${savingsPct}% ($${result.totalSavings}) without impacting team productivity. `;
    
    const cuts = result.recommendations.filter(r => r.action === "cancel" || r.action === "consolidate");
    if (cuts.length > 0) {
      narrative += `We strongly recommend consolidating ${cuts[0].toolId.replace('_', ' ')} into your primary tooling ecosystem immediately.`;
    }
  } else if (savingsPct > 0) {
    narrative += `your team is generally well-optimized, but there is still room to save $${result.totalSavings} monthly by pruning inactive licenses or overlapping subscriptions.`;
  } else {
    narrative += `your AI tool stack is highly optimized! No redundant spending was detected. Keep monitoring usage as your team scales.`;
  }

  return narrative;
}
