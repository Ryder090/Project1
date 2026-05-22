export interface ToolPricing {
  id: string;
  name: string;
  category: "Chat" | "Coding" | "API";
  basePrice: number; // Monthly price
  billingCycle: "monthly" | "yearly";
}

export const PRICING_DATA: Record<string, ToolPricing> = {
  chatgpt_plus: { id: "chatgpt_plus", name: "ChatGPT Plus", category: "Chat", basePrice: 20, billingCycle: "monthly" },
  chatgpt_team: { id: "chatgpt_team", name: "ChatGPT Team", category: "Chat", basePrice: 25, billingCycle: "monthly" }, // Billed annually, $30 monthly
  claude_pro: { id: "claude_pro", name: "Claude Pro", category: "Chat", basePrice: 20, billingCycle: "monthly" },
  cursor_pro: { id: "cursor_pro", name: "Cursor Pro", category: "Coding", basePrice: 20, billingCycle: "monthly" },
  github_copilot: { id: "github_copilot", name: "GitHub Copilot", category: "Coding", basePrice: 10, billingCycle: "monthly" },
  gemini_advanced: { id: "gemini_advanced", name: "Gemini Advanced", category: "Chat", basePrice: 20, billingCycle: "monthly" },
  v0: { id: "v0", name: "v0 Premium", category: "Coding", basePrice: 20, billingCycle: "monthly" }
};
