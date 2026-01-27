import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

import { agents } from "./data";

export const AgentShowcase = () => {
  return (
    <section className="w-full bg-transparent">
      <div className="flex">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Meet your new <span className="text-primary">digital team</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                Each agent is an expert in their field, ready to deploy instantly. They collaborate,
                share context, and execute complex workflows 24/7.
              </p>
            </div>

            {/* Agent cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {agents.map((agent, index) => {
                const MIDDLE_AGENT_INDEX = 4;
                return (
                  <div
                    key={agent.id}
                    className={`group relative rounded-3xl bg-white border border-slate-200 p-8 hover:border-transparent hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden flex flex-col h-full ${
                      index === MIDDLE_AGENT_INDEX ? "lg:col-start-2" : ""
                    }`}
                  >
                    {/* Hover gradient background - utilizing agent's specific color */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${agent.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}
                    />

                    {/* Top shimmer border */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r ${agent.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div
                          className={`w-16 h-16 rounded-2xl ${agent.bgColor} border border-white/50 shadow-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
                        >
                          <span
                            className={`material-symbols-outlined text-3xl bg-linear-to-r ${agent.color} bg-clip-text text-transparent`}
                          >
                            {agent.icon}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-white group-hover:shadow-sm transition-colors">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                            Online
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                        {agent.description}
                      </p>

                      {/* Capabilities */}
                      <div className="space-y-4 mt-auto">
                        <div className="h-px bg-slate-100 group-hover:bg-slate-200 transition-colors" />
                        <div className="flex flex-wrap gap-2">
                          {agent.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-colors"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </section>
  );
};
