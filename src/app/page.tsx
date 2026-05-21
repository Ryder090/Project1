import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 flex flex-col items-center text-center px-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[800px] space-y-8 relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Stop wasting startup capital
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Audit your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">AI Tool Spend</span> in minutes.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto">
            Startups overspend on ChatGPT, Claude, and Copilot by up to 40%. Find out how much you could save with our free audit engine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
              <Link href="/audit">
                Start Free Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
              <Link href="#features">
                How it works
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
              <span>Results in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Logos - Placeholder for now */}
      <section className="w-full border-y border-border/40 bg-muted/20 py-12 flex flex-col items-center">
        <p className="text-sm font-medium text-muted-foreground mb-6">SUPPORTING TEAMS USING</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
          <div className="text-xl font-bold font-mono">ChatGPT</div>
          <div className="text-xl font-bold font-mono">Claude</div>
          <div className="text-xl font-bold font-mono">Cursor</div>
          <div className="text-xl font-bold font-mono">GitHub Copilot</div>
          <div className="text-xl font-bold font-mono">Windsurf</div>
        </div>
      </section>
    </div>
  );
}
