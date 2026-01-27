import { useRouter } from "next/navigation";

import { Button } from "@/shared/ui/button";

import { AgentAvatar } from "./AgentAvatar";

import type { Agent } from "@/modules/landing/data";

interface DashboardAgentHeroProps {
  agent: Agent;
  slug: string;
}

export const DashboardAgentHero = ({ agent, slug }: DashboardAgentHeroProps) => {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Icon with animated gradient background */}
          <div className="mb-6">
            <AgentAvatar agent={agent} size="lg" className="animate-fade-in-up" />
          </div>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {agent.category} • Ready to Deploy
          </div>

          {/* Title */}
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl animate-fade-in-up [animation-delay:100ms]">
            {agent.name}
          </h1>

          {/* Role */}
          <p className="mb-6 text-xl font-medium text-primary animate-fade-in-up [animation-delay:200ms]">
            {agent.role}
          </p>

          {/* Description */}
          <p className="mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed animate-fade-in-up [animation-delay:300ms]">
            {agent.longDescription}
          </p>

          {/* CTA Buttons - Dashboard Specific */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:400ms]">
            <Button
              size="lg"
              className="px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all font-bold gap-2"
              onClick={() => router.push("#buy-license")} // Placeholder action
            >
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
              Buy License
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold gap-2"
              onClick={() => router.push(`/dashboard/agents/${slug}/flow`)}
            >
              <span className="material-symbols-outlined text-xl">account_tree</span>
              Go to Flow
            </Button>
          </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b ${agent.bgColor} to-transparent opacity-30 dark:opacity-10 blur-3xl pointer-events-none -z-10`}
      />
    </div>
  );
};
