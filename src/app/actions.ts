"use server";

import { AuditResult } from "@/lib/audit-engine";
import { generateAuditSummary } from "@/lib/ai-summary";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";
import { AuditFormData } from "@/store/useAuditStore";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

export async function saveAuditAndCaptureLead(
  email: string, 
  formData: AuditFormData, 
  results: AuditResult,
  ipAddress: string = "unknown"
) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ipAddress) || 0;
  
  if (userRequests >= MAX_REQUESTS) {
    return { success: false, error: "Rate limit exceeded. Please try again later." };
  }
  rateLimitMap.set(ipAddress, userRequests + 1);
  setTimeout(() => rateLimitMap.set(ipAddress, Math.max(0, (rateLimitMap.get(ipAddress) || 1) - 1)), RATE_LIMIT_WINDOW);

  try {
    const summary = await generateAuditSummary(formData.companyName, results);
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
        console.error("Supabase Error:", error.message);
      }
    }

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      await transporter.sendMail({
        from: `"AuditAI" <${process.env.GMAIL_USER}>`,
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
