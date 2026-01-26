"use client";

import { Button } from "@/shared/ui/button";

import { AgentOverview } from "../../agents/components/AgentOverview";
import { agents } from "../../agents/data";

interface AgentOverviewStepProps {
  onNext: () => void;
}

export const AgentOverviewStep = ({ onNext }: AgentOverviewStepProps) => {
  const emailAgent = agents.find((a) => a.id === "email-agent")!;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto py-2">
      <AgentOverview agent={emailAgent} />

      <div className="mt-4 flex justify-end px-4">
        <Button
          onClick={onNext}
          size="lg"
          className="rounded-2xl px-12 h-12 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105"
        >
          Get Started
          <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
        </Button>
      </div>
    </div>
  );
};
