import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { AgentAvatar } from "./AgentAvatar";

import type { Agent } from "../data";

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-2 transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/50">
      {/* Gradient border effect on hover */}
      <div
        className={`absolute inset-0 rounded-3xl bg-linear-to-br ${agent.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none`}
      />

      <div className="relative flex flex-col h-full rounded-2xl bg-white p-6 z-10">
        <div className="flex items-start justify-between mb-6">
          <AgentAvatar agent={agent} size="md" />

          {/* Status indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-slate-600">Active</span>
          </div>
        </div>

        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-slate-900 group-hover:to-slate-700 transition-all">
            {agent.name}
          </h3>
          <p className="text-sm font-medium text-primary mt-1">{agent.role}</p>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-slate-600 line-clamp-2">
          {agent.description}
        </p>

        {/* Tags */}
        {agent.tags && agent.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {agent.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-slate-50 text-xs font-medium text-slate-600 border border-slate-100 group-hover:border-slate-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-slate-50">
          <Link href={`/agents/${agent.slug}`} className="block">
            <Button
              variant="ghost"
              className="w-full justify-between group/btn hover:bg-slate-50 hover:text-primary"
            >
              <span className="font-medium">View Capabilities</span>
              <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover/btn:translate-x-1">
                arrow_forward
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
