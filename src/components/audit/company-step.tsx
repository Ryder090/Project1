"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuditStore } from "@/store/useAuditStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const companySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  employeeCount: z.number().min(1, "Must have at least 1 employee"),
  primaryUseCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export function CompanyStep({ onNext }: { onNext: () => void }) {
  const { formData, setCompanyDetails } = useAuditStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: formData.companyName,
      employeeCount: formData.employeeCount || 0,
      primaryUseCase: formData.primaryUseCase || "mixed",
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    setCompanyDetails(data.companyName, data.employeeCount, data.primaryUseCase);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Tell us about your team</h2>
        <p className="text-sm text-muted-foreground mb-6">
          We use this to establish baseline recommendations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input 
            id="companyName" 
            placeholder="Acme Corp" 
            {...register("companyName")} 
            className="max-w-md"
          />
          {errors.companyName && (
            <p className="text-sm text-destructive">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="employeeCount">Total Employees</Label>
          <Input 
            id="employeeCount" 
            type="number"
            placeholder="50" 
            {...register("employeeCount", { valueAsNumber: true })} 
            className="max-w-md"
          />
          {errors.employeeCount && (
            <p className="text-sm text-destructive">{errors.employeeCount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryUseCase">Primary AI Use Case</Label>
          <select
            id="primaryUseCase"
            {...register("primaryUseCase")}
            className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="mixed" className="bg-background text-foreground">Mixed / General</option>
            <option value="coding" className="bg-background text-foreground">Engineering & Coding</option>
            <option value="writing" className="bg-background text-foreground">Content & Copywriting</option>
            <option value="data" className="bg-background text-foreground">Data Analysis</option>
            <option value="research" className="bg-background text-foreground">Research</option>
          </select>
          {errors.primaryUseCase && (
            <p className="text-sm text-destructive">{errors.primaryUseCase.message}</p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" size="lg">Continue</Button>
      </div>
    </form>
  );
}
