import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuditFormData {
  companyName: string;
  employeeCount: number;
  primaryUseCase: "coding" | "writing" | "data" | "research" | "mixed";
  tools: {
    toolId: string;
    tierId: string;
    licenses: number;
    currentSpend: number;
    usageFrequency: "daily" | "weekly" | "monthly" | "rarely";
  }[];
}

interface AuditStore {
  formData: AuditFormData;
  setCompanyDetails: (name: string, count: number, useCase: AuditFormData["primaryUseCase"]) => void;
  addTool: (tool: AuditFormData["tools"][0]) => void;
  removeTool: (toolId: string) => void;
  updateTool: (toolId: string, updates: Partial<AuditFormData["tools"][0]>) => void;
  reset: () => void;
}

const initialState: AuditFormData = {
  companyName: "",
  employeeCount: 0,
  primaryUseCase: "mixed",
  tools: [],
};

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      formData: initialState,
      setCompanyDetails: (companyName, employeeCount, primaryUseCase) =>
        set((state) => ({ formData: { ...state.formData, companyName, employeeCount, primaryUseCase } })),
      addTool: (tool) =>
        set((state) => ({
          formData: { ...state.formData, tools: [...state.formData.tools, tool] },
        })),
      removeTool: (toolId) =>
        set((state) => ({
          formData: {
            ...state.formData,
            tools: state.formData.tools.filter((t) => t.toolId !== toolId),
          },
        })),
      updateTool: (toolId, updates) =>
        set((state) => ({
          formData: {
            ...state.formData,
            tools: state.formData.tools.map((t) =>
              t.toolId === toolId ? { ...t, ...updates } : t
            ),
          },
        })),
      reset: () => set({ formData: initialState }),
    }),
    {
      name: "audit-storage",
    }
  )
);
