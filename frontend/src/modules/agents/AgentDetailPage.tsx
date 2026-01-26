"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Header } from "@/modules/landing";
import { integrations } from "@/modules/landing/data";
import { Footer } from "@/shared/components/layout/Footer";
import { Button } from "@/shared/ui/button";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

import { AgentCapabilities } from "./components/AgentCapabilities";
import { AgentChatPreview, AgentHero, AgentOverview } from "./components";
import { agents } from "./data";

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
      <section className="w-full bg-white border-b border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <AgentOverview agent={agent} />
      </section>

      {/* Live Preview */}
      <AgentChatPreview agent={agent} />

      {/* Capabilities */}
      <AgentCapabilities agent={agent} />

      {/* Integrations */}
      <section className="w-full bg-white border-y border-slate-200">
        <div className="flex">
          <DecorativeStripes />

          <div className="flex-1 border-x border-slate-200 py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                <span className="material-symbols-outlined text-base">link</span>
                Integrations
              </div>

              <h2 className="text-4xl font-bold text-slate-900 mb-4 sm:text-5xl">
                Connects with your favorite tools
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Seamlessly integrate with the platforms you already use every day.
              </p>

              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {integrations.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    title={tool.name}
                  >
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={100}
                      height={32}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ))}
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
