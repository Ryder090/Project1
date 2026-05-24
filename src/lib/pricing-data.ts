export interface ToolTier {
  id: string;
  name: string;
  price: number;
}

export interface ToolPricing {
  id: string;
  name: string;
  category: "Chat" | "Coding" | "API";
  tiers: ToolTier[];
}

export const PRICING_DATA: Record<string, ToolPricing> = {
  cursor: {
    id: "cursor",
    name: "Cursor",
    category: "Coding",
    tiers: [
      { id: "hobby", name: "Hobby", price: 0 },
      { id: "pro", name: "Pro", price: 20 },
      { id: "business", name: "Business", price: 40 },
      { id: "enterprise", name: "Enterprise", price: 100 }
    ]
  },
  github_copilot: {
    id: "github_copilot",
    name: "GitHub Copilot",
    category: "Coding",
    tiers: [
      { id: "individual", name: "Individual", price: 10 },
      { id: "business", name: "Business", price: 19 },
      { id: "enterprise", name: "Enterprise", price: 39 }
    ]
  },
  claude: {
    id: "claude",
    name: "Claude",
    category: "Chat",
    tiers: [
      { id: "free", name: "Free", price: 0 },
      { id: "pro", name: "Pro", price: 20 },
      { id: "max", name: "Max", price: 40 },
      { id: "team", name: "Team", price: 30 },
      { id: "enterprise", name: "Enterprise", price: 50 },
      { id: "api", name: "API Direct", price: 5 }
    ]
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Chat",
    tiers: [
      { id: "plus", name: "Plus", price: 20 },
      { id: "team", name: "Team", price: 30 },
      { id: "enterprise", name: "Enterprise", price: 60 },
      { id: "api", name: "API Direct", price: 5 }
    ]
  },
  anthropic_api: {
    id: "anthropic_api",
    name: "Anthropic API Direct",
    category: "API",
    tiers: [
      { id: "direct", name: "Direct", price: 25 } // Estimated
    ]
  },
  openai_api: {
    id: "openai_api",
    name: "OpenAI API Direct",
    category: "API",
    tiers: [
      { id: "direct", name: "Direct", price: 25 } // Estimated
    ]
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    category: "Chat",
    tiers: [
      { id: "pro", name: "Pro", price: 0 },
      { id: "ultra", name: "Ultra", price: 20 },
      { id: "api", name: "API", price: 10 }
    ]
  },
  v0: {
    id: "v0",
    name: "v0",
    category: "Coding",
    tiers: [
      { id: "free", name: "Free", price: 0 },
      { id: "premium", name: "Premium", price: 20 },
      { id: "enterprise", name: "Enterprise", price: 50 }
    ]
  }
};
