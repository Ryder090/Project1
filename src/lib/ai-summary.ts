import { AuditResult } from "./audit-engine";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAuditSummary(companyName: string, result: AuditResult): Promise<string> {
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const systemPrompt = `You are an expert SaaS financial auditor and fractional CFO.
Your goal is to take data representing a company's AI tool spend and write a concise, hard-hitting 3-sentence executive summary.
Focus on:
1. The total potential savings.
2. The primary recommendation (e.g., consolidating tools, buying credits via Credex).
3. The business impact (e.g., reducing fragmentation, standardizing workflows).
Do NOT be overly polite. Be direct, authoritative, and helpful.`;

      const userPrompt = `Company Name: ${companyName}
Total Current Spend: $${result.totalCurrentSpend}
Total Optimized Spend: $${result.totalOptimizedSpend}
Total Potential Savings: $${result.totalSavings}

Recommendations:
${result.recommendations.map(r => `- Action: ${r.action}\n- Tool: ${r.toolId}\n- Reason: ${r.reason}`).join('\n')}

Based on the above, write the 3-sentence summary.`;

      const aiResponse = await model.generateContent(systemPrompt + "\n\n" + userPrompt);
      
      const summaryText = aiResponse.response.text();
      if (summaryText) {
        return summaryText;
      }
    } catch (error) {
      console.error("Gemini API Error, falling back:", error);
    }
  }

  const totalTools = result.recommendations.length;
  const savingsPct = result.totalCurrentSpend > 0 
    ? Math.round((result.totalSavings / result.totalCurrentSpend) * 100)
    : 0;

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
