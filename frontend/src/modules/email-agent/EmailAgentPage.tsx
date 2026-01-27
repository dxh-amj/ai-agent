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
      <div className="w-full max-w-3xl mx-auto mb-8 px-4">
        <div className="flex justify-between items-start relative">
          {steps.map((s, index) => (
            <div key={s.id} className="relative flex flex-col items-center gap-3 flex-1">
              {/* Step Circle */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 border-2 bg-white dark:bg-slate-900 relative z-10",
                  step === s.id
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25 scale-110"
                    : s.id < step
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500"
                )}
              >
                {s.id < step ? (
                  <span className="material-symbols-outlined text-lg font-bold">check</span>
                ) : (
                  s.id
                )}
              </div>

              {/* Connection Line to Next Step */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-[50%] w-full h-0.5 transition-all duration-500",
                    s.id < step ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
                  )}
                  style={{ zIndex: 0 }}
                />
              )}

              {/* Step Label */}
              <div className="text-center">
                <div
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300 whitespace-nowrap",
                    step === s.id
                      ? "text-primary"
                      : s.id < step
                      ? "text-slate-900 dark:text-slate-200"
                      : "text-slate-400 dark:text-slate-600"
                  )}
                >
                  {s.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block whitespace-nowrap">
                  {s.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 min-h-[500px]">
          <div className="h-full">
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
