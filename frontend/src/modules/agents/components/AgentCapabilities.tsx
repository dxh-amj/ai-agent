import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

import type { Agent } from "../data";

interface AgentCapabilitiesProps {
  agent: Agent;
}

export const AgentCapabilities = ({ agent }: AgentCapabilitiesProps) => {
  return (
    <section className="w-full bg-white border-y border-slate-200">
      <div className="flex">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200 py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                Key Features
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                Powerful Capabilities
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Everything {agent.name} can do to transform your {agent.category.toLowerCase()}{" "}
                operations
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {agent.capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${agent.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{capability}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Automated workflow designed to handle {capability.toLowerCase()} efficiently
                      and accurately.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </section>
  );
};
