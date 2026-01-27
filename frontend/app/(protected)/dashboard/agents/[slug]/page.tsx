"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { DashboardAgentDetail } from "@/modules/agents";
import { PageContainer } from "@/shared/components";
import { Button } from "@/shared/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { slug } = use(params);

  return (
    <PageContainer title="Agent Details" description="Manage and configure your AI agent.">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/agents")}
          className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white pl-0 gap-2"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Marketplace
        </Button>
      </div>

      <DashboardAgentDetail slug={slug} />
    </PageContainer>
  );
};

export default Page;
