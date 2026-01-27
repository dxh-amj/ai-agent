"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { ConnectAccountStep } from "./components/ConnectAccountStep";
import { EmailContextStep } from "./components/EmailContextStep";
import { SendEmailStep } from "./components/SendEmailStep";

export const EmailAgentPage = () => {
  const [step, setStep] = useState(1);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleAccountSelected = (accountId: string) => {
    setSelectedAccountId(accountId);
    setStep(2);
  };

  const handleContextNext = () => {
    setStep(3);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const steps = [
    { id: 1, label: "Connect Accounts", description: "Link your email" },
    { id: 2, label: "Configuration", description: "Define behavior" },
    { id: 3, label: "Test & Activate", description: "Verify and launch" },
  ];

  return (
    <div className="flex flex-col gap-8 min-h-[600px] dark:text-slate-200">
      {/* Horizontal Stepper */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 -translate-y-1/2 rounded-full" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 bg-page-background px-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 border-2",
                  step === s.id
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25 scale-110"
                    : s.id < step
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
                )}
              >
                {s.id < step ? (
                  <span className="material-symbols-outlined text-lg font-bold">check</span>
                ) : (
                  s.id
                )}
              </div>
              <div className="text-center">
                <div
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300",
                    step === s.id
                      ? "text-primary"
                      : s.id < step
                      ? "text-slate-900 dark:text-slate-200"
                      : "text-slate-400 dark:text-slate-600"
                  )}
                >
                  {s.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  {s.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[500px] p-1">
          <div className="h-full p-2 sm:p-8">
            {step === 1 && <ConnectAccountStep onNext={handleAccountSelected} />}
            {step === 2 && <EmailContextStep onNext={handleContextNext} onBack={handleBack} />}
            {step === 3 && selectedAccountId && (
              <SendEmailStep accountId={selectedAccountId} onBack={handleBack} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
