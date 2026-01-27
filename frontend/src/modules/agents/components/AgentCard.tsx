import Link from "next/link";

import { AgentAvatar } from "./AgentAvatar";

import type { Agent } from "../types";

interface AgentCardProps {
  agent: Agent;
  isPublic?: boolean;
}

export const AgentCard = ({ agent, isPublic = false }: AgentCardProps) => {
  const href = isPublic ? `/agents/${agent.slug}` : `/dashboard/agents/${agent.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col h-full rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:-translate-y-1"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <AgentAvatar agent={agent} size="md" className="shrink-0" />
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300 truncate">
              {agent.name}
            </h3>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
              {agent.role}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-6">
          {agent.description}
        </p>

        <div className="mt-auto pt-5 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              {agent.price}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {agent.billingPeriod === "monthly" ? "/ mo" : "once"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform duration-300">
            Deploy
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
