"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { integrations } from "./data";

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-50 to-white" />

      {/* Radial Gradient Glow - subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,183,127,0.08),transparent_50%)]" />

      {/* Main Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-semibold tracking-tight text-slate-900 leading-[1.1] max-w-4xl mb-6">
          The Complete{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-500">
            AI Agent Platform
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-10">
          Build, deploy, and scale autonomous AI agents for your business. The unified workspace for
          your entire digital workforce.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-medium h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/register" className="flex items-center gap-2">
              Start for free
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-medium h-12 px-8 text-base rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/demo" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-slate-600">play_circle</span>
              Watch demo
            </Link>
          </Button>
        </div>

        {/* Integration Logos - Integrated into Hero with Marquee Animation */}
        <div className="w-full max-w-5xl overflow-hidden relative">
          <p className="text-sm text-slate-400 mb-8">
            Seamlessly connects with your favorite tools
          </p>

          <div className="relative">
            {/* Gradient Fades for seamless edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {[...integrations.slice(0, 6), ...integrations.slice(0, 6)].map(
                (integration, index) => (
                  <div
                    key={`${integration.name}-${index}`}
                    className="shrink-0 mx-8 lg:mx-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  >
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="h-8 w-auto object-contain"
                      title={integration.name}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
