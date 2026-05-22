"use client";

import { useMemo } from "react";
import { useAuditStore } from "@/store/useAuditStore";
import { runAuditEngine } from "@/lib/audit-engine";
import { PRICING_DATA } from "@/lib/pricing-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";
import Link from "next/link";

export function ResultsStep({ onPrev }: { onPrev: () => void }) {
  const { formData, reset } = useAuditStore();
  
  const results = useMemo(() => {
    return runAuditEngine(formData);
  }, [formData]);

  const handleStartOver = () => {
    reset();
    window.location.reload(); // Simple way to reset state for MVP
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">Your Audit Results</h2>
        <p className="text-muted-foreground">
          Based on {formData.companyName}'s current usage of {formData.tools.length} AI tools.
        </p>
      </div>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-muted/20 border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${results.totalCurrentSpend}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Optimized Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">${results.totalOptimizedSpend}</div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-500 flex items-center gap-2">
              <TrendingDown className="h-4 w-4" /> Potential Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">${results.totalSavings}/mo</div>
            <p className="text-xs text-green-500/80 mt-1">That's ${results.totalSavings * 12}/year!</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Actionable Recommendations</h3>
        {results.recommendations.length === 0 ? (
          <p className="text-muted-foreground text-sm">Your stack looks fully optimized!</p>
        ) : (
          <div className="space-y-3">
            {results.recommendations.map((rec, idx) => {
              const tool = PRICING_DATA[rec.toolId];
              const isPositive = rec.action === "keep";
              
              return (
                <Card key={idx} className={`border-l-4 ${isPositive ? 'border-l-green-500' : 'border-l-amber-500'}`}>
                  <CardContent className="p-4 flex gap-4">
                    <div className="mt-1">
                      {isPositive ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{tool.name}</span>
                        <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted font-medium">
                          {rec.action}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      {rec.potentialSavings > 0 && (
                        <p className="text-sm font-medium text-green-500 mt-2">
                          Save ${rec.potentialSavings}/mo
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Call to Action for Phase 3 (Lead capture) */}
      <Card className="bg-primary/5 border-primary/20 mt-8">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="font-semibold text-lg">Want these results emailed to you?</h3>
          <p className="text-sm text-muted-foreground">
            Get a detailed PDF report and a step-by-step guide on how to migrate your team without losing productivity.
          </p>
          <Button className="w-full sm:w-auto">
            Email me the report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <div className="pt-4 flex justify-center gap-4">
        <Button variant="ghost" onClick={handleStartOver}>Start Over</Button>
      </div>
    </div>
  );
}
