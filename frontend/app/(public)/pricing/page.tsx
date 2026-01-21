"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

const pricingPlans = {
  starter: {
    title: "Starter",
    price: 0,
    description: "Perfect for individuals exploring AI agents.",
    features: [
      "1 AI Agent",
      "Basic Workflows",
      "Community Support",
      "Standard latency",
    ],
    ctaLabel: "Start Free Trial",
  },
  professional: {
    title: "Professional",
    prices: { monthly: 59, annual: 49 },
    description: "For small teams scaling their operations.",
    features: [
      "5 AI Agents",
      "Advanced Logic & Branching",
      "API Access",
      "Priority Support (24h)",
    ],
    ctaLabel: "Upgrade Now",
    includesPrefix: "Everything in Starter, plus:",
    isPopular: true,
  },
  enterprise: {
    title: "Enterprise",
    price: "Custom",
    description: "For organizations requiring scale & security.",
    features: [
      "Unlimited Agents",
      "SSO & SAML",
      "Dedicated Success Manager",
      "Custom SLAs",
    ],
    ctaLabel: "Contact Sales",
    includesPrefix: "Everything in Pro, plus:",
  },
};

const faqs = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Yes, absolutely. Changes take effect at the end of your current billing cycle.",
  },
  {
    q: "Is my data used to train your public models?",
    a: "No. We have a strict zero-retention policy. Your data is never used to train our base models.",
  },
  {
    q: "Do you offer discounts for non-profits?",
    a: "Yes! Contact our sales team with proof of non-profit status to receive 20% off.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );
  const [teamSize, setTeamSize] = useState(12);
  const [avgSalary, setAvgSalary] = useState(85000);
  const [timeSaved, setTimeSaved] = useState(20);

  const savings = useMemo(
    () => teamSize * avgSalary * (timeSaved / 100),
    [teamSize, avgSalary, timeSaved]
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">
                smart_toy
              </span>
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
            <Link
              href="/pricing"
              className="text-sm font-medium text-primary transition-colors"
            >
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
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary-dark"
            >
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center">
        {/* Hero */}
        <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Transparent Pricing for Every Stage
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Scale your AI workforce without breaking the bank. Start for free,
            upgrade as you grow.
          </p>
          {/* Toggle */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl relative">
            <div
              className={`w-1/2 h-full absolute top-0 rounded-lg bg-white shadow-sm transition-all duration-300 ${
                billingCycle === "monthly" ? "left-0" : "left-1/2"
              }`}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
                billingCycle === "monthly" ? "text-primary" : "text-slate-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                billingCycle === "annual" ? "text-primary" : "text-slate-500"
              }`}
            >
              Annual
              <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Save 20%
              </span>
            </button>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-bold text-slate-900">
                {pricingPlans.starter.title}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">$0</span>
                <span className="text-sm text-slate-500">/mo</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {pricingPlans.starter.description}
              </p>
              <Button
                variant="outline"
                className="w-full mt-6 mb-8 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                {pricingPlans.starter.ctaLabel}
              </Button>
              <div className="space-y-4">
                {pricingPlans.starter.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      check_circle
                    </span>
                    <span className="text-sm text-slate-600">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional */}
            <div className="flex flex-col rounded-2xl border-2 border-primary bg-white p-8 shadow-xl shadow-primary/10 transform scale-105 z-10 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-white text-xs font-extrabold uppercase tracking-wider">
                  Most Popular
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                {pricingPlans.professional.title}
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">
                  ${pricingPlans.professional.prices[billingCycle]}
                </span>
                <span className="text-sm text-slate-500">/mo per user</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {pricingPlans.professional.description}
              </p>
              <Button className="w-full mt-6 mb-8 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25">
                {pricingPlans.professional.ctaLabel}
              </Button>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm text-slate-900 font-medium">
                    {pricingPlans.professional.includesPrefix}
                  </span>
                </div>
                {pricingPlans.professional.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      check_circle
                    </span>
                    <span className="text-sm text-slate-600">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-bold text-slate-900">
                {pricingPlans.enterprise.title}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">
                  Custom
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {pricingPlans.enterprise.description}
              </p>
              <Button
                variant="outline"
                className="w-full mt-6 mb-8 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                {pricingPlans.enterprise.ctaLabel}
              </Button>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm text-slate-900 font-medium">
                    {pricingPlans.enterprise.includesPrefix}
                  </span>
                </div>
                {pricingPlans.enterprise.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      check_circle
                    </span>
                    <span className="text-sm text-slate-600">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl bg-slate-900 p-8 md:p-12 shadow-2xl overflow-hidden relative">
            <div
              className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#10b77f 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-white">
                  Calculate your ROI
                </h2>
                <p className="text-slate-400">
                  See how much your team can save by automating workflows with
                  AI agents.
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-slate-300">
                      Team Size
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      {teamSize}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-slate-300">
                      Avg. Annual Salary
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      ${avgSalary.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30000"
                    max="200000"
                    step="5000"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-slate-300">
                      Time Saved (%)
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      {timeSaved}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={timeSaved}
                    onChange={(e) => setTimeSaved(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center md:items-start bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">
                  Estimated Annual Savings
                </p>
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-400 mb-6">
                  {formatCurrency(savings)}
                </div>
                <Button className="w-full md:w-auto bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/30">
                  Start Saving Today
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 pb-24">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl bg-slate-50 border border-slate-100 p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900">
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  <span className="material-symbols-outlined shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500">
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
