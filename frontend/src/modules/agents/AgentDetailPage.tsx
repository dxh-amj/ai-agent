"use client";

import { Header } from "@/modules/landing";
import { Footer } from "@/shared/components/layout/Footer";
import { Button } from "@/shared/ui/button";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AgentChatPreview, AgentHero } from "./components";
import { AgentCapabilities } from "./components/AgentCapabilities";
import { agents } from "./data";

// Mock integration logos reuse
import { integrations } from "@/modules/landing/data";

interface AgentDetailPageProps {
  slug: string;
}

export const AgentDetailPage = ({ slug }: AgentDetailPageProps) => {
  const router = useRouter();
  const agent = agents.find((a) => a.slug === slug);

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6">
            <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Agent not found</h1>
          <p className="text-slate-600 mb-6">The agent you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/agents")}>
            <span className="material-symbols-outlined text-base mr-2">arrow_back</span>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <AgentHero agent={agent} />

      {/* Live Preview */}
      <AgentChatPreview agent={agent} />

      {/* Capabilities */}
      <AgentCapabilities agent={agent} />

      {/* Integrations */}
      <section className="w-full bg-slate-50 border-y border-slate-200">
        <div className="flex">
          <DecorativeStripes />

          <div className="flex-1 border-x border-slate-200 py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 mb-6 shadow-sm">
                <span className="material-symbols-outlined text-base">link</span>
                Integrations
              </div>

              <h2 className="text-4xl font-bold text-slate-900 mb-4 sm:text-5xl">
                Connects with your favorite tools
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Seamlessly integrate with the platforms you already use every day.
              </p>

              <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale opacity-60 hover:grayscale-0 transition-all duration-300">
                {integrations.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    <span className="text-lg font-semibold text-slate-600">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DecorativeStripesRight />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />

        <div className="flex relative z-10">
          <DecorativeStripes />

          <div className="flex-1 border-x border-slate-800 py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white mb-6 border border-white/20">
                <span className="material-symbols-outlined text-base">rocket_launch</span>
                Ready to get started?
              </div>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Deploy {agent.name} Today
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Transform your {agent.category.toLowerCase()} operations with AI. Start your free
                trial and see results in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="px-8 bg-white text-slate-900 hover:bg-slate-100 shadow-xl"
                >
                  <span className="material-symbols-outlined text-base mr-2">play_arrow</span>
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/agents">
                    <span className="material-symbols-outlined text-base mr-2">arrow_back</span>
                    Browse All Agents
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <DecorativeStripesRight />
        </div>
      </section>

      <Footer />
    </div>
  );
};
