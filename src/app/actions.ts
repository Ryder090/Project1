"use server";

import { AuditResult } from "@/lib/audit-engine";
import { generateAuditSummary } from "@/lib/ai-summary";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { AuditFormData } from "@/store/useAuditStore";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

// Simple in-memory rate limiting for the MVP
// In production, use Upstash Redis or Vercel KV
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

export async function saveAuditAndCaptureLead(
  email: string, 
  formData: AuditFormData, 
  results: AuditResult,
  ipAddress: string = "unknown"
) {
  // 1. Rate Limiting Check
  const now = Date.now();
  const userRequests = rateLimitMap.get(ipAddress) || 0;
  
  if (userRequests >= MAX_REQUESTS) {
    return { success: false, error: "Rate limit exceeded. Please try again later." };
  }
  rateLimitMap.set(ipAddress, userRequests + 1);
  setTimeout(() => rateLimitMap.set(ipAddress, Math.max(0, (rateLimitMap.get(ipAddress) || 1) - 1)), RATE_LIMIT_WINDOW);

  try {
    // 2. Generate AI Summary
    const summary = await generateAuditSummary(formData.companyName, results);

    // 3. Save to Supabase
    // If the mock key is used, Supabase will fail to insert, so we gracefully handle it
    const reportId = crypto.randomUUID();
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase.from("audits").insert({
        id: reportId,
        email,
        company_name: formData.companyName,
        form_data: formData,
        results: results,
        ai_summary: summary,
        created_at: new Date().toISOString()
      });

      if (error) {
        console.error("Supabase Error (Expected if no real keys):", error.message);
      }
    }

    // 4. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'AuditAI <hello@auditai.com>',
        to: email,
        subject: `Your AI Spend Audit Report - ${formData.companyName}`,
        html: `<p>Hi there,</p>
               <p>Here is the summary of your AI tool spend audit:</p>
               <blockquote style="border-left: 4px solid #ccc; padding-left: 1rem;">${summary}</blockquote>
               <p>You can view your full interactive report here: <strong>https://auditai.com/report/${reportId}</strong></p>
               <p>Best,<br/>The AuditAI Team</p>`
      });
    }

    return { success: true, reportId, summary };
  } catch (error: any) {
    console.error("Action error:", error);
    return { success: false, error: error.message || "Failed to process audit." };
  }
}
