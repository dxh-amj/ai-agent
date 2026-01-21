"use client";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { FAQSection } from "./components/FAQSection";
import { PricingHero } from "./components/PricingHero";
import { PricingPlans } from "./components/PricingPlans";
import { ROICalculator } from "./components/ROICalculator";

export const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              AI Workforce Hub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              Product
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-primary transition-colors">
              Pricing
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              asChild
              className="hidden sm:flex text-slate-600 hover:text-slate-900"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-primary text-white hover:bg-primary-dark">
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center">
        <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        <PricingPlans billingCycle={billingCycle} />
        <ROICalculator />
        <FAQSection />
      </main>
    </div>
  );
};
