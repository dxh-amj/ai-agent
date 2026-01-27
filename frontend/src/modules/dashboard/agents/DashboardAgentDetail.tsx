import {
  AgentChatPreview,
  AgentIntegrations,
  AgentOverview,
  DashboardAgentDetailSkeleton,
  DashboardAgentHero,
  useAgentDetail,
} from "@/modules/agents";

interface DashboardAgentDetailProps {
  slug: string;
}

export const DashboardAgentDetail = ({ slug }: DashboardAgentDetailProps) => {
  const { agent, isLoading } = useAgentDetail(slug);

  if (isLoading) {
    return <DashboardAgentDetailSkeleton />;
  }

  if (!agent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
          <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Agent Not Found</h3>
        <p className="text-slate-500 dark:text-slate-400">
          The agent you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Customized Dashboard Hero */}
      <DashboardAgentHero agent={agent} slug={slug} />

      {/* Live Preview */}
      <div className="">
        <AgentChatPreview agent={agent} />
      </div>

      {/* Reusing Public Overview Components inside the dashboard card */}
      <div className="">
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <AgentOverview agent={agent} />
        </section>

        <section>
          <AgentIntegrations />
        </section>
      </div>
    </div>
  );
};
