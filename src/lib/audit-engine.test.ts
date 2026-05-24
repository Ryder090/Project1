import { describe, it, expect } from "vitest";
import { runAuditEngine } from "./audit-engine";
import { AuditFormData } from "@/store/useAuditStore";

describe("runAuditEngine", () => {
  it("Test 1: should calculate correct savings when consolidating overlapping chat tools", () => {
    const formData: AuditFormData = {
      companyName: "Test Corp",
      employeeCount: 10,
      primaryUseCase: "mixed",
      tools: [
        { toolId: "chatgpt", tierId: "plus", licenses: 5, currentSpend: 100, usageFrequency: "daily" }, 
        { toolId: "claude", tierId: "pro", licenses: 2, currentSpend: 40, usageFrequency: "daily" }    
      ]
    };

    const result = runAuditEngine(formData);
    
    expect(result.totalCurrentSpend).toBe(140);
    expect(result.totalOptimizedSpend).toBe(100);
    expect(result.totalSavings).toBe(40);
    
    const keepRec = result.recommendations.find(r => r.action === "keep");
    expect(keepRec?.toolId).toBe("chatgpt");
    
    const cancelRec = result.recommendations.find(r => r.action === "consolidate");
    expect(cancelRec?.toolId).toBe("claude");
  });

  it("Test 2: applies downgrade rule correctly for single rarely used tools", () => {
    const formData: AuditFormData = {
      companyName: "Test Corp",
      employeeCount: 10,
      primaryUseCase: "mixed",
      tools: [
        { toolId: "chatgpt", tierId: "plus", licenses: 5, currentSpend: 100, usageFrequency: "rarely" }
      ]
    };

    const result = runAuditEngine(formData);
    expect(result.totalSavings).toBe(100);
    expect(result.recommendations[0].action).toBe("downgrade");
  });

  it("Test 3: detects wrong plan for usage (Team tier for <3 users)", () => {
    const formData: AuditFormData = {
      companyName: "Test Corp",
      employeeCount: 5,
      primaryUseCase: "mixed",
      tools: [
        { toolId: "claude", tierId: "team", licenses: 2, currentSpend: 60, usageFrequency: "daily" }
      ]
    };

    const result = runAuditEngine(formData);
    // Should downgrade to pro: 2 licenses * 20 = 40. Savings = 20.
    expect(result.totalOptimizedSpend).toBe(40);
    expect(result.totalSavings).toBe(20);
    expect(result.recommendations[0].action).toBe("downgrade");
  });

  it("Test 4: recommends credits for enterprise or high-spend retail accounts", () => {
    const formData: AuditFormData = {
      companyName: "Big Corp",
      employeeCount: 100,
      primaryUseCase: "coding",
      tools: [
        { toolId: "cursor", tierId: "enterprise", licenses: 10, currentSpend: 1000, usageFrequency: "daily" }
      ]
    };

    const result = runAuditEngine(formData);
    expect(result.recommendations[0].action).toBe("credits");
    expect(result.totalOptimizedSpend).toBe(750); // 25% savings via Credex
    expect(result.totalSavings).toBe(250);
  });

  it("Test 5: cancels engineering tools for pure writing/content teams", () => {
    const formData: AuditFormData = {
      companyName: "Copywriters Inc",
      employeeCount: 5,
      primaryUseCase: "writing",
      tools: [
        { toolId: "github_copilot", tierId: "business", licenses: 2, currentSpend: 38, usageFrequency: "daily" },
        { toolId: "claude", tierId: "pro", licenses: 2, currentSpend: 40, usageFrequency: "daily" }
      ]
    };

    const result = runAuditEngine(formData);
    const copilotRec = result.recommendations.find(r => r.toolId === "github_copilot");
    expect(copilotRec?.action).toBe("cancel");
    expect(result.totalSavings).toBe(38); // Cancels the copilot, keeps claude
  });
});
