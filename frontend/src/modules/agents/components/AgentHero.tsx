import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

import type { Agent } from "../data";

interface AgentHeroProps {
  agent: Agent;
}

export const AgentHero = ({ agent }: AgentHeroProps) => {
  return (
    <div className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="flex">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200 pb-16 pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="flex flex-col items-center text-center">
              {/* Icon with animated gradient background */}
              <div className="relative mb-8 group">
                <div
                  className={`absolute inset-0 rounded-2xl bg-linear-to-br ${agent.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
                />
                <div
                  className={`relative inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br ${agent.color} shadow-2xl shadow-primary/30 text-white animate-fade-in-up group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="material-symbols-outlined text-5xl">{agent.icon}</span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {agent.category} • Active
              </div>

              {/* Title */}
              <h1 className="mb-4 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl animate-fade-in-up [animation-delay:100ms]">
                {agent.name}
              </h1>

              {/* Role */}
              <p className="mb-8 text-2xl font-medium text-primary animate-fade-in-up [animation-delay:200ms]">
                {agent.role}
              </p>

              {/* Description */}
              <p className="mb-10 max-w-3xl text-xl text-slate-600 leading-relaxed animate-fade-in-up [animation-delay:300ms]">
                {agent.longDescription}
              </p>

              {/* Tags */}
              {agent.tags && agent.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-12 justify-center animate-fade-in-up [animation-delay:350ms]">
                  {agent.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-white text-sm font-medium text-slate-700 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:400ms]">
                <Button
                  size="lg"
                  className="px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all"
                  asChild
                >
                  <Link href="/auth/register">
                    <span className="material-symbols-outlined text-base mr-2">play_arrow</span>
                    Deploy {agent.name}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 border-slate-300 hover:bg-slate-50 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-base mr-2">description</span>
                  View Documentation
                </Button>
              </div>
            </div>
          </div>

          {/* Background Gradients */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-linear-to-b ${agent.bgColor} to-transparent opacity-40 blur-3xl pointer-events-none -z-10`}
          />
        </div>

        <DecorativeStripesRight />
      </div>
    </div>
  );
};
