"use client";

import { useState } from "react";

import { FAQSection } from "./components/FAQSection";
import { PricingHero } from "./components/PricingHero";
import { PricingPlans } from "./components/PricingPlans";

export const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      {/* Header is now in the public layout */}
      <main className="flex flex-col items-center">
        <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        <PricingPlans billingCycle={billingCycle} />

        <FAQSection />
      </main>
    </div>
  );
};
