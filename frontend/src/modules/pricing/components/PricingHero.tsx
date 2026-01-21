import type { Dispatch, SetStateAction } from "react";

interface PricingHeroProps {
  billingCycle: "monthly" | "annual";
  setBillingCycle: Dispatch<SetStateAction<"monthly" | "annual">>;
}

export const PricingHero = ({ billingCycle, setBillingCycle }: PricingHeroProps) => {
  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
        Transparent Pricing for Every Stage
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
        Scale your AI workforce without breaking the bank. Start for free, upgrade as you grow.
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
  );
};
