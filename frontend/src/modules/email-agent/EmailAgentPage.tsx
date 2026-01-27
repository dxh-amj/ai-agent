"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { AgentOverviewStep } from "./components/AgentOverviewStep";
import { ConnectAccountStep } from "./components/ConnectAccountStep";
import { EmailContextStep } from "./components/EmailContextStep";
import { SendEmailStep } from "./components/SendEmailStep";

const INITIAL_STEP = 1;
const OVERVIEW_STEP = 1;
const CONNECT_STEP = 2;
const CONTEXT_STEP = 3;
const RUN_STEP = 4;

export const EmailAgentPage = () => {
  const [step, setStep] = useState(INITIAL_STEP);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleOverviewNext = () => {
    setStep(CONNECT_STEP);
  };

  const handleAccountSelected = (accountId: string) => {
    setSelectedAccountId(accountId);
    setStep(CONTEXT_STEP);
  };

  const handleContextNext = () => {
    setStep(RUN_STEP);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(INITIAL_STEP, prev - 1));
  };

  const steps = [
    { id: OVERVIEW_STEP, label: "Overview", description: "Learn about agent" },
    { id: CONNECT_STEP, label: "Connect", description: "Link your accounts" },
    { id: CONTEXT_STEP, label: "Context", description: "Define agent behavior" },
    { id: RUN_STEP, label: "Run", description: "Execute capabilities" },
  ];

  return (
    <div className="flex flex-col gap-8 min-h-[600px] dark:text-slate-200">
      {/* Horizontal Stepper */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 -translate-y-1/2 rounded-full" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} // eslint-disable-line no-magic-numbers
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
          <div className="h-full p-2 sm:p-6">
            {step === OVERVIEW_STEP && <AgentOverviewStep onNext={handleOverviewNext} />}
            {step === CONNECT_STEP && <ConnectAccountStep onNext={handleAccountSelected} />}
            {step === CONTEXT_STEP && (
              <EmailContextStep onNext={handleContextNext} onBack={handleBack} />
            )}
            {step === RUN_STEP && selectedAccountId && (
              <SendEmailStep accountId={selectedAccountId} onBack={handleBack} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
