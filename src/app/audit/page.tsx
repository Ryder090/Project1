"use client";

import { useState } from "react";
import { CompanyStep } from "@/components/audit/company-step";
import { ToolsStep } from "@/components/audit/tools-step";
import { ResultsStep } from "@/components/audit/results-step";

export default function AuditPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Spend Audit</h1>
        <p className="text-muted-foreground mt-2">
          Step {currentStep} of 3
        </p>
        
        {/* Simple Progress Bar */}
        <div className="w-full bg-secondary h-2 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card border border-border/40 rounded-xl p-6 md:p-8 shadow-sm">
        {currentStep === 1 && <CompanyStep onNext={nextStep} />}
        {currentStep === 2 && <ToolsStep onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <ResultsStep onPrev={prevStep} />}
      </div>
    </div>
  );
}
