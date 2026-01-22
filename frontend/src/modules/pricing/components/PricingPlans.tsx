import { motion } from "framer-motion";

// Workaround for framer-motion v10 type compatibility with React 19
const MotionDiv = motion.div as any;

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

const pricingPlans = {
  starter: {
    title: "Starter",
    price: 0,
    description: "Perfect for individuals exploring AI agents.",
    features: ["1 AI Agent", "Basic Workflows", "Community Support", "Standard latency"],
    ctaLabel: "Start Free Trial",
  },
  professional: {
    title: "Professional",
    prices: { monthly: 59, annual: 49 },
    description: "For small teams scaling their operations.",
    features: ["5 AI Agents", "Advanced Logic & Branching", "API Access", "Priority Support (24h)"],
    ctaLabel: "Upgrade Now",
    includesPrefix: "Everything in Starter, plus:",
    isPopular: true,
  },
  enterprise: {
    title: "Enterprise",
    price: "Custom",
    description: "For organizations requiring scale & security.",
    features: ["Unlimited Agents", "SSO & SAML", "Dedicated Success Manager", "Custom SLAs"],
    ctaLabel: "Contact Sales",
    includesPrefix: "Everything in Pro, plus:",
  },
};

interface PricingPlansProps {
  billingCycle: "monthly" | "annual";
}

export const PricingPlans = ({ billingCycle }: PricingPlansProps) => {
  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-slate-900">{pricingPlans.starter.title}</h3>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-5xl font-black text-slate-900 tracking-tight">$0</span>
            <span className="text-base text-slate-500 font-medium">/mo</span>
          </div>
          <p className="mt-4 text-base text-slate-600">{pricingPlans.starter.description}</p>
          <Button
            variant="outline"
            className="w-full mt-8 mb-8 h-12 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:text-primary transition-colors hover:border-primary/20"
          >
            {pricingPlans.starter.ctaLabel}
          </Button>
          <div className="space-y-5">
            {pricingPlans.starter.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3.5">
                <span className="material-symbols-outlined text-emerald-500 text-[22px] shrink-0">
                  check_circle
                </span>
                <span className="text-sm text-slate-600 leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Professional */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col rounded-3xl border-2 border-primary bg-white p-8 shadow-2xl shadow-primary/15 transform md:-mt-8 md:mb-4 z-10 relative"
        >
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0 px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
              Most Popular
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between">
            {pricingPlans.professional.title}
            <span className="material-symbols-outlined text-primary fill-1">verified</span>
          </h3>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              ${pricingPlans.professional.prices[billingCycle]}
            </span>
            <span className="text-base text-slate-500 font-medium">/mo per user</span>
          </div>
          <p className="mt-4 text-base text-slate-600">{pricingPlans.professional.description}</p>
          <Button className="w-full mt-8 mb-8 h-12 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            {pricingPlans.professional.ctaLabel}
          </Button>
          <div className="space-y-5">
            <div className="flex items-start gap-3.5">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                check_circle
              </span>
              <span className="text-sm text-slate-900 font-bold leading-snug">
                {pricingPlans.professional.includesPrefix}
              </span>
            </div>
            {pricingPlans.professional.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3.5">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                  check_circle
                </span>
                <span className="text-sm text-slate-700 font-medium leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Enterprise */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-slate-900">{pricingPlans.enterprise.title}</h3>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-5xl font-black text-slate-900 tracking-tight">Custom</span>
          </div>
          <p className="mt-4 text-base text-slate-600">{pricingPlans.enterprise.description}</p>
          <Button
            variant="outline"
            className="w-full mt-8 mb-8 h-12 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:text-primary transition-colors hover:border-primary/20"
          >
            {pricingPlans.enterprise.ctaLabel}
          </Button>
          <div className="space-y-5">
            <div className="flex items-start gap-3.5">
              <span className="material-symbols-outlined text-emerald-500 text-[22px] shrink-0">
                check_circle
              </span>
              <span className="text-sm text-slate-900 font-bold leading-snug">
                {pricingPlans.enterprise.includesPrefix}
              </span>
            </div>
            {pricingPlans.enterprise.features.map((feat) => (
              <div key={feat} className="flex items-start gap-3.5">
                <span className="material-symbols-outlined text-emerald-500 text-[22px] shrink-0">
                  check_circle
                </span>
                <span className="text-sm text-slate-600 leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
