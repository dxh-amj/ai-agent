import Link from "next/link";

import { AgentAvatar } from "./AgentAvatar";

import type { Agent } from "../data";

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <Link
      href={`/dashboard/agents/${agent.slug}`}
      className="group relative flex flex-col h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1"
    >
      {/* Setup for a subtle colorful glow based on agent color */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03] bg-linear-to-br ${agent.color} pointer-events-none`}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-sm">
            <AgentAvatar agent={agent} size="md" />
          </div>
          <div
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border bg-white/50 backdrop-blur-sm ${agent.borderColor.replace(
              "/30",
              "/50"
            )} text-slate-500`}
          >
            {agent.category}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <span className="text-2xl font-bold text-slate-900">{agent.price}</span>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {agent.billingPeriod === "monthly" ? "/ month" : "one-time"}
          </span>
        </div>

        <div className="mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs font-medium text-slate-500">{agent.role}</p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
          {agent.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <div className="flex -space-x-1.5 overflow-hidden">
            {/* Mock avatars for "used by" or team feeling (optional visual flair) */}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
            View Plan
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
