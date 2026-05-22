"use client";

import { useState } from "react";
import { useAuditStore } from "@/store/useAuditStore";
import { PRICING_DATA } from "@/lib/pricing-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

export function ToolsStep({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
  const { formData, addTool, removeTool, updateTool } = useAuditStore();
  const [selectedToolId, setSelectedToolId] = useState<string>("");

  const handleAddTool = () => {
    if (!selectedToolId) return;
    
    // Check if already added
    if (formData.tools.some(t => t.toolId === selectedToolId)) {
      alert("Tool already added.");
      return;
    }

    addTool({
      toolId: selectedToolId,
      licenses: 1,
      usageFrequency: "daily",
    });
    setSelectedToolId("");
  };

  const handleNext = () => {
    if (formData.tools.length === 0) {
      alert("Please add at least one tool to audit.");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Current AI Stack</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Add all the AI tools your team currently pays for.
        </p>
      </div>

      {/* Add New Tool */}
      <div className="flex gap-4 items-end">
        <div className="space-y-2 flex-1 max-w-sm">
          <Label>Select Tool</Label>
          <Select value={selectedToolId} onValueChange={setSelectedToolId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a tool..." />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PRICING_DATA).map(tool => (
                <SelectItem key={tool.id} value={tool.id}>
                  {tool.name} (${tool.basePrice}/mo)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={handleAddTool} variant="secondary">
          <Plus className="h-4 w-4 mr-2" /> Add Tool
        </Button>
      </div>

      {/* List Added Tools */}
      <div className="space-y-4 pt-4">
        {formData.tools.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-border rounded-lg text-muted-foreground text-sm">
            No tools added yet. Select one above.
          </div>
        ) : (
          formData.tools.map((tool) => {
            const toolData = PRICING_DATA[tool.toolId];
            return (
              <Card key={tool.toolId} className="bg-muted/30">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <h3 className="font-medium">{toolData?.name}</h3>
                    <p className="text-xs text-muted-foreground">{toolData?.category} Tool</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Licenses/Seats</Label>
                      <Input 
                        type="number" 
                        min={1} 
                        className="w-24 h-9"
                        value={tool.licenses}
                        onChange={(e) => updateTool(tool.toolId, { licenses: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Usage</Label>
                      <Select 
                        value={tool.usageFrequency} 
                        onValueChange={(val: any) => updateTool(tool.toolId, { usageFrequency: val })}
                      >
                        <SelectTrigger className="w-[120px] h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="rarely">Rarely</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="mt-5 text-muted-foreground hover:text-destructive"
                      onClick={() => removeTool(tool.toolId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <div className="pt-6 flex gap-4">
        <Button type="button" variant="outline" onClick={onPrev} size="lg">Back</Button>
        <Button type="button" onClick={handleNext} size="lg">Run Audit</Button>
      </div>
    </div>
  );
}
