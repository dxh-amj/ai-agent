"use client";

import { useRouter } from "next/navigation";

import { Header } from "@/modules/landing";
import { Button } from "@/shared/ui/button";

import { AgentIntegrations } from "./components/AgentIntegrations";
import { AgentChatPreview, AgentHero, AgentOverview } from "./components";
import { useAgentDetail } from "./hooks";

interface AgentDetailPageProps {
  slug: string;
}

export const AgentDetailPage = ({ slug }: AgentDetailPageProps) => {
  const router = useRouter();
  const { agent, isLoading } = useAgentDetail(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-page-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6">
            <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Agent not found</h1>
          <p className="text-slate-600 mb-6">
            The agent you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push("/agents")}>
            <span className="material-symbols-outlined text-base mr-2">arrow_back</span>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-page-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <AgentHero agent={agent} />

      {/* Overview Section */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
        <AgentOverview agent={agent} />
      </section>

      {/* Live Preview */}
      <AgentChatPreview agent={agent} />

      {/* Integrations */}
      <AgentIntegrations />
    </div>
  );
};
