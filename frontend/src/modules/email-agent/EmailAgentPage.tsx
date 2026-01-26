"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { AgentOverviewStep } from "./components/AgentOverviewStep";
import { ConnectAccountStep } from "./components/ConnectAccountStep";
import { EmailContextStep } from "./components/EmailContextStep";
import { SendEmailStep } from "./components/SendEmailStep";

export const EmailAgentPage = () => {
  const [step, setStep] = useState(1);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleOverviewNext = () => {
    setStep(2);
  };

  const handleAccountSelected = (accountId: string) => {
    setSelectedAccountId(accountId);
    setStep(3);
  };

  const handleContextNext = () => {
    setStep(4);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const steps = [
    { id: 1, label: "Overview", description: "Learn about agent" },
    { id: 2, label: "Connect", description: "Link your accounts" },
    { id: 3, label: "Context", description: "Define agent behavior" },
    { id: 4, label: "Run", description: "Execute capabilities" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] dark:text-slate-200">
      {/* Side Control Panel */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 shadow-sm sticky top-6">
          <nav className="space-y-1">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  if (s.id < step) setStep(s.id);
                }}
                disabled={s.id > step}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                  step === s.id
                    ? "bg-primary/5 dark:bg-primary/10 text-primary ring-1 ring-primary/10 dark:ring-primary/20"
                    : s.id < step
                    ? "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    : "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                    step === s.id
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : s.id < step
                      ? "bg-primary text-white shadow-sm"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                  )}
                >
                  {s.id < step ? (
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  ) : (
                    s.id
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{s.label}</div>
                  <div className="text-[10px] opacity-80 font-medium">{s.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[500px] p-1">
          <div className="h-full p-2 sm:p-6">
            {step === 1 && <AgentOverviewStep onNext={handleOverviewNext} />}
            {step === 2 && <ConnectAccountStep onNext={handleAccountSelected} />}
            {step === 3 && <EmailContextStep onNext={handleContextNext} onBack={handleBack} />}
            {step === 4 && selectedAccountId && (
              <SendEmailStep accountId={selectedAccountId} onBack={handleBack} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
