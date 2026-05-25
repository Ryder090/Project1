import { AuditFormData } from "@/store/useAuditStore";
import { PRICING_DATA } from "./pricing-data";

export interface AuditRecommendation {
  toolId: string;
  action: "keep" | "cancel" | "consolidate" | "downgrade" | "credits";
  reason: string;
  potentialSavings: number;
}

export interface AuditResult {
  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  totalSavings: number;
  recommendations: AuditRecommendation[];
}

export function runAuditEngine(data: AuditFormData): AuditResult {
  let totalCurrentSpend = 0;
  let totalOptimizedSpend = 0;
  const recommendations: AuditRecommendation[] = [];

  const chatTools = data.tools.filter(t => PRICING_DATA[t.toolId]?.category === "Chat");
  const codingTools = data.tools.filter(t => PRICING_DATA[t.toolId]?.category === "Coding");
  const apiTools = data.tools.filter(t => PRICING_DATA[t.toolId]?.category === "API");

  for (const tool of data.tools) {
    const def = PRICING_DATA[tool.toolId];
    if (!def) continue;

    // Handle stale localStorage state from earlier versions
    const currentSpend = tool.currentSpend !== undefined ? tool.currentSpend : (def.tiers[0]?.price * (tool.licenses || 1)) || 0;
    const tierId = tool.tierId || def.tiers[0]?.id;
    const licenses = tool.licenses || 1;

    totalCurrentSpend += currentSpend;

    let toolAction: AuditRecommendation["action"] = "keep";
    let reason = "Standard, optimized usage.";
    let optimizedSpend = currentSpend;

    if ((tierId === "team" || tierId === "business") && licenses < 3) {
      toolAction = "downgrade";
      reason = `${def.name} ${tierId} is overkill for ${licenses} users. Moving to Pro/Individual saves money with similar core capabilities.`;
      const cheaperTier = def.tiers.find(t => t.id === "pro" || t.id === "individual" || t.id === "premium");
      if (cheaperTier) {
        optimizedSpend = cheaperTier.price * licenses;
      }
    } 
    else if (tierId === "enterprise" || currentSpend >= 500) {
      toolAction = "credits";
      reason = `You are paying retail prices for ${def.name}. Sourcing unused credits through secondary markets can reduce this by 20-30%.`;
      optimizedSpend = currentSpend * 0.75;
    }
    else if (tool.usageFrequency === "rarely") {
      toolAction = "downgrade";
      reason = `Low usage frequency detected. Consider moving to a free tier or shared pool.`;
      optimizedSpend = 0;
    }

    if (def.category === "Chat" && chatTools.length > 1) {
      const highestChat = [...chatTools].sort((a, b) => b.currentSpend - a.currentSpend)[0];
      if (tool.toolId !== highestChat.toolId) {
        toolAction = "consolidate";
        reason = `Overlapping Chat tool detected. Standardizing on ${PRICING_DATA[highestChat.toolId].name} eliminates fragmented knowledge and saves costs.`;
        optimizedSpend = 0;
      }
    }

    if (def.category === "Coding" && codingTools.length > 1) {
      const highestCode = [...codingTools].sort((a, b) => b.currentSpend - a.currentSpend)[0];
      if (tool.toolId !== highestCode.toolId) {
        toolAction = "consolidate";
        reason = `Overlapping Coding assistant detected. Standardizing on ${PRICING_DATA[highestCode.toolId].name} improves codebase consistency.`;
        optimizedSpend = 0;
      }
    }

    if (data.primaryUseCase === "writing" && def.category === "Coding") {
      toolAction = "cancel";
      reason = `Your primary use case is content/writing, but you are paying for an engineering assistant (${def.name}).`;
      optimizedSpend = 0;
    }

    totalOptimizedSpend += optimizedSpend;
    const potentialSavings = currentSpend - optimizedSpend;

    recommendations.push({
      toolId: tool.toolId,
      action: toolAction,
      reason,
      potentialSavings: Math.max(0, potentialSavings)
    });
  }

  return {
    totalCurrentSpend,
    totalOptimizedSpend,
    totalSavings: Math.max(0, totalCurrentSpend - totalOptimizedSpend),
    recommendations
  };
}
