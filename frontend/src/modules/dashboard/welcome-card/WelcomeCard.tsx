"use client";

import { useUserProfile } from "@/shared/api/userProfile";
import { Button } from "@/shared/ui/button";

import type { WelcomeData } from "@/services/dashboard";

interface WelcomeCardProps {
  data?: WelcomeData;
  isLoading: boolean;
}

export const WelcomeCard = ({ data, isLoading }: WelcomeCardProps) => {
  const { data: profile, isLoading: isProfileLoading } = useUserProfile();

  if (isLoading || isProfileLoading || !data) {
    return <div className="h-48 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />;
  }

  const fullName = profile ? `${profile.firstName} ${profile.lastName}`.trim() : "";

  return (
    <div className="relative overflow-hidden rounded-4xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 md:p-8 shadow-sm group">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-1000 animate-pulse" />
      <div className="absolute bottom-0 left-1/4 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-all duration-1000" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="material-symbols-outlined text-sm">stars</span>
            {data.plan} Plan
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Welcome back, <span className="text-primary">{fullName || data.userName}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm font-medium leading-relaxed">
              Your AI agents are currently handling{" "}
              <span className="text-slate-900 dark:text-white font-bold text-base">
                5 active channels
              </span>
              .
            </p>
          </div>

          <div className="w-full max-w-[280px] space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Plan Utilization
              </span>
              <span className="text-[10px] font-bold text-primary">4 / 10 Agents</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[40%]" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm self-start md:self-center shrink-0">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
          </div>
          <div className="flex flex-col">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
              Available Credits
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
                {data.credits.toLocaleString()}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-primary/10 text-primary -mt-1"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
