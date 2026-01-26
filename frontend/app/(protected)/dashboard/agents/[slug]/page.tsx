"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

import { EmailAgentPage } from "@/modules/email-agent";
import { PageContainer } from "@/shared/components";
import { Button } from "@/shared/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { slug } = use(params);

  // Email Connector is the only active agent in dashboard for now
  if (slug === "email-connector") {
    return (
      <PageContainer
        title="Email Agent"
        description="Connect your account and let our AI agent handle your email communications."
      >
        <EmailAgentPage />
      </PageContainer>
    );
  }

  // All other agents show Coming Soon
  return (
    <PageContainer
      title="Agent Integration"
      description="This agent integration is currently under development."
    >
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-800 text-slate-400">
            <span className="material-symbols-outlined text-5xl">construction</span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Coming Soon
        </h1>

        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-10 leading-relaxed font-medium">
          We&apos;re working hard to bring this agent to your dashboard. Stay tuned for updates on
          new specialized AI integrations!
        </p>

        <Button
          onClick={() => router.push("/dashboard/agents")}
          variant="outline"
          className="rounded-2xl px-8 h-12 font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          <span className="material-symbols-outlined mr-2 text-base">arrow_back</span>
          Back to Marketplace
        </Button>
      </div>
    </PageContainer>
  );
};

export default Page;
