import { motion } from "framer-motion";

// Workaround for framer-motion v10 type compatibility with React 19
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MotionDiv = motion.div as React.ComponentType<any>;

import { Button } from "@/shared/ui";

import type { Dispatch, SetStateAction } from "react";

interface PricingHeroProps {
  billingCycle: "monthly" | "annual";
  setBillingCycle: Dispatch<SetStateAction<"monthly" | "annual">>;
}

export const PricingHero = ({ billingCycle, setBillingCycle }: PricingHeroProps) => {
  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
        Transparent Pricing for <span className="text-primary">Every Stage</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12">
        Scale your AI workforce without breaking the bank. Start for free, upgrade as you grow.
      </p>

      {/* Toggle */}
      <div className="flex justify-center items-center mb-12">
        <div className="bg-slate-100 p-1.5 rounded-full inline-flex relative">
          <Button
            variant="ghost"
            onClick={() => setBillingCycle("monthly")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 hover:bg-transparent ${
              billingCycle === "monthly" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Monthly
            {billingCycle === "monthly" && (
              <MotionDiv
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setBillingCycle("annual")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center gap-2 hover:bg-transparent ${
              billingCycle === "annual" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Annual
            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
              save 20%
            </span>
            {billingCycle === "annual" && (
              <MotionDiv
                layoutId="active-pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};
