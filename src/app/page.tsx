"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 flex flex-col items-center text-center px-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px] space-y-8 relative z-10"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Stop wasting startup capital
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Audit your startup's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">AI tool spend</span> in exactly two minutes.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto">
            Stop burning capital on unused, overlapping AI subscriptions. Uncover shadow IT and secure enterprise discounts without the massive seat minimums.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto transition-transform hover:scale-105 active:scale-95" asChild>
              <Link href="/audit">
                Start Free Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
              <Link href="#faq">
                Read FAQ
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Deterministic engine</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full border-y border-border/40 bg-muted/20 py-16 flex flex-col items-center px-4 text-center"
      >
        <div className="max-w-3xl space-y-6">
          <p className="text-xl md:text-2xl font-medium italic text-foreground/80">
            "We realized half our engineering team was expensing Cursor while the other half used Copilot. Consolidating saved us $14k/year."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">SJ</div>
            <div className="text-left">
              <p className="font-semibold text-sm">Sarah J.</p>
              <p className="text-xs text-muted-foreground">VP Eng at Acme Corp (Mocked)</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-20 max-w-3xl px-4 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">1. Is this actually free?</h3>
              <p className="text-muted-foreground">Yes. The audit is 100% free and runs entirely in your browser. We only ask for your email if you want to save the final report.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">2. How does Credex make money?</h3>
              <p className="text-muted-foreground">If the audit uncovers that you are overspending on retail SaaS plans, we offer a free consultation to migrate you to Credex's discounted enterprise credits. We make a small margin on the volume of credits sold.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">3. What tools do you audit?</h3>
              <p className="text-muted-foreground">Currently, we support Cursor, GitHub Copilot, Claude, ChatGPT, Gemini, v0, and the raw APIs for Anthropic and OpenAI.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">4. Is my data safe?</h3>
              <p className="text-muted-foreground">Absolutely. We do not require you to connect your bank account or upload CSVs. You simply select the tools you know you are paying for, and our deterministic engine calculates the math locally.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">5. Can I share the report with my CEO/CFO?</h3>
              <p className="text-muted-foreground">Yes! At the end of the audit, you'll receive a unique, anonymized public URL that you can drop directly into Slack or email to your finance team.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
