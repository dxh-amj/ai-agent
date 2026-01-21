import Link from "next/link";

import { Button } from "@/shared/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Light background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_60%)]" />

      {/* Decorative borders with diagonal pattern */}
      <div className="absolute left-0 top-0 bottom-0 w-12 overflow-hidden hidden lg:block">
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-4 -rotate-45 origin-top-left border-b border-emerald-500/10"
              style={{ marginLeft: "-50%" }}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-12 overflow-hidden hidden lg:block">
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-4 -rotate-45 origin-top-left border-b border-emerald-500/10"
              style={{ marginLeft: "-50%" }}
            />
          ))}
        </div>
      </div>

      {/* Futuristic pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16 185 129) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-600">Ready to Launch</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
          Launch Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
            AI Workforce
          </span>
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          Join thousands of businesses automating operations with intelligent AI agents that work
          together seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 h-12 px-8"
          >
            <Link href="/auth/register">
              Start Free Trial
              <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-100 h-12 px-8"
          >
            <span className="material-symbols-outlined mr-2 text-lg">calendar_month</span>
            Book a Demo
          </Button>
        </div>

        <p className="text-sm text-slate-500 mt-6">
          No credit card required · 14-day free trial · Cancel anytime
        </p>
      </div>
    </section>
  );
}
