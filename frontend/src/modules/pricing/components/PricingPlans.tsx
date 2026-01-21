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
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 hover:border-primary/50 transition-colors">
          <h3 className="text-lg font-bold text-slate-900">{pricingPlans.starter.title}</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">$0</span>
            <span className="text-sm text-slate-500">/mo</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{pricingPlans.starter.description}</p>
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
            <span className="material-symbols-outlined text-primary">verified</span>
          </h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">
              ${pricingPlans.professional.prices[billingCycle]}
            </span>
            <span className="text-sm text-slate-500">/mo per user</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{pricingPlans.professional.description}</p>
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
          <h3 className="text-lg font-bold text-slate-900">{pricingPlans.enterprise.title}</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">Custom</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{pricingPlans.enterprise.description}</p>
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
  );
};
