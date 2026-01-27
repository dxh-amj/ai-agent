"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { EmailAgentPage } from "@/modules/email-agent";
import { PageContainer } from "@/shared/components";
import { Button } from "@/shared/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const AgentFlowPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const router = useRouter();

  // Connect "email-only-agent" to the existing EmailAgentPage flow
  if (slug === "email-agent" || slug === "email-connector") {
    return (
      <PageContainer
        title="Email Agent Configuration"
        description="Configure your email agent steps."
      >
        <EmailAgentPage />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={`Agent Flow: ${slug}`}
      description="Configure your agent's conversation flow."
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <span className="material-symbols-outlined text-4xl text-primary">account_tree</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Flow Builder</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
          The visual flow builder for <strong>{slug}</strong> is currently under development. You
          will be able to customize conversation paths here soon.
        </p>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    </PageContainer>
  );
};

export default AgentFlowPage;
