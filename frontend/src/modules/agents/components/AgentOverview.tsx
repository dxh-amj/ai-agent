"use client";

import type { Agent } from "../types";

interface AgentOverviewProps {
  agent: Agent;
}

export const AgentOverview = ({ agent }: AgentOverviewProps) => {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto py-0">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">info</span>
            Agent Information
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Meet your <span className="text-primary">{agent.name}</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {agent.longDescription || agent.description}
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Key Capabilities
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {agent.capabilities.map((cap) => (
              <div
                key={cap}
                className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-primary shadow-sm border border-slate-100 dark:border-slate-700">
                  <span className="material-symbols-outlined text-xl">star</span>
                </div>
                <div className="flex items-center">
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {cap}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-primary shadow-sm border border-slate-100 dark:border-slate-700">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white mb-1">How it works</div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                This agent specialized in {agent.category.toLowerCase()} tasks. Currently supporting
                multiple integrations and context-aware operations to help scale your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
