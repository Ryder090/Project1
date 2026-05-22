import { AuditFormData } from "@/store/useAuditStore";
import { PRICING_DATA } from "./pricing-data";

export interface AuditRecommendation {
  toolId: string;
  action: "keep" | "consolidate" | "downgrade" | "cancel";
  reason: string;
  potentialSavings: number; // Monthly
}

export interface AuditResult {
  totalCurrentSpend: number; // Monthly
  totalOptimizedSpend: number; // Monthly
  totalSavings: number; // Monthly
  recommendations: AuditRecommendation[];
}

export function runAuditEngine(formData: AuditFormData): AuditResult {
  let totalCurrentSpend = 0;
  let totalOptimizedSpend = 0;
  const recommendations: AuditRecommendation[] = [];

  // Group tools by category
  const chatTools = formData.tools.filter(t => PRICING_DATA[t.toolId]?.category === "Chat");
  const codingTools = formData.tools.filter(t => PRICING_DATA[t.toolId]?.category === "Coding");

  // Basic Rule 1: Consolidate Chat Tools
  // If a company has multiple chat tools (e.g. ChatGPT + Claude), recommend consolidating to one.
  if (chatTools.length > 1) {
    // Keep the one with the most licenses or the first one as primary
    const sortedChat = [...chatTools].sort((a, b) => b.licenses - a.licenses);
    const primary = sortedChat[0];
    
    chatTools.forEach(tool => {
      const price = PRICING_DATA[tool.toolId]?.basePrice || 0;
      const spend = price * tool.licenses;
      totalCurrentSpend += spend;

      if (tool.toolId === primary.toolId) {
        totalOptimizedSpend += spend;
        recommendations.push({
          toolId: tool.toolId,
          action: "keep",
          reason: "Primary chat tool based on license volume.",
          potentialSavings: 0,
        });
      } else {
        // Recommend canceling others
        recommendations.push({
          toolId: tool.toolId,
          action: "consolidate",
          reason: `Consolidate chat usage to ${PRICING_DATA[primary.toolId].name} to reduce overlapping subscriptions.`,
          potentialSavings: spend,
        });
      }
    });
  } else if (chatTools.length === 1) {
    const tool = chatTools[0];
    const price = PRICING_DATA[tool.toolId]?.basePrice || 0;
    const spend = price * tool.licenses;
    totalCurrentSpend += spend;
    totalOptimizedSpend += spend;
    
    // Check usage frequency
    if (tool.usageFrequency === "rarely") {
      recommendations.push({
        toolId: tool.toolId,
        action: "downgrade",
        reason: "Low usage detected. Consider downgrading to a free tier or sharing team seats if applicable.",
        potentialSavings: spend * 0.5, // Arbitrary 50% savings estimation
      });
      totalOptimizedSpend -= spend * 0.5;
    } else {
      recommendations.push({
        toolId: tool.toolId,
        action: "keep",
        reason: "Healthy usage of primary chat tool.",
        potentialSavings: 0,
      });
    }
  }

  // Basic Rule 2: Coding tool overlap (e.g. Cursor + Copilot)
  if (codingTools.length > 1) {
    const sortedCoding = [...codingTools].sort((a, b) => b.licenses - a.licenses);
    const primary = sortedCoding[0];
    
    codingTools.forEach(tool => {
      const price = PRICING_DATA[tool.toolId]?.basePrice || 0;
      const spend = price * tool.licenses;
      totalCurrentSpend += spend;

      if (tool.toolId === primary.toolId) {
        totalOptimizedSpend += spend;
        recommendations.push({
          toolId: tool.toolId,
          action: "keep",
          reason: "Primary coding assistant.",
          potentialSavings: 0,
        });
      } else {
        recommendations.push({
          toolId: tool.toolId,
          action: "cancel",
          reason: `High overlap with ${PRICING_DATA[primary.toolId].name}. Teams rarely need multiple AI coding assistants per developer.`,
          potentialSavings: spend,
        });
      }
    });
  } else if (codingTools.length === 1) {
    const tool = codingTools[0];
    const price = PRICING_DATA[tool.toolId]?.basePrice || 0;
    const spend = price * tool.licenses;
    totalCurrentSpend += spend;
    totalOptimizedSpend += spend;
    
    recommendations.push({
      toolId: tool.toolId,
      action: "keep",
      reason: "Standard developer tooling.",
      potentialSavings: 0,
    });
  }

  // Basic Rule 3: Any other tools (APIs, etc) - keeping it simple for MVP
  const otherTools = formData.tools.filter(t => !["Chat", "Coding"].includes(PRICING_DATA[t.toolId]?.category || ""));
  otherTools.forEach(tool => {
    const price = PRICING_DATA[tool.toolId]?.basePrice || 0;
    const spend = price * tool.licenses;
    totalCurrentSpend += spend;
    totalOptimizedSpend += spend;
  });

  const totalSavings = totalCurrentSpend - totalOptimizedSpend;

  return {
    totalCurrentSpend,
    totalOptimizedSpend,
    totalSavings,
    recommendations,
  };
}
