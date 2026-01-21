import { agents } from "./data";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

export const AgentShowcase = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-slate-50">
      <div className="flex">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <span className="text-xs font-medium text-emerald-600">5 Specialized Agents</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Meet Your{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-500">
                  Digital Team
                </span>
              </h2>
              <p className="text-slate-600">
                Each agent masters a critical business function. Together, they form an intelligent
                workforce that operates around the clock.
              </p>
            </div>

            {/* Agent cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`group relative rounded-2xl bg-white border border-slate-200 p-6 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 ${
                    index === 4 ? "lg:col-start-2" : ""
                  }`}
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    {/* Icon and status */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${agent.bgColor} ${agent.borderColor} border flex items-center justify-center`}
                      >
                        <span
                          className={`material-symbols-outlined text-xl bg-linear-to-r ${agent.color} bg-clip-text text-transparent`}
                        >
                          {agent.icon}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-emerald-600">Active</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{agent.name}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Capabilities */}
                    <div className="flex flex-wrap gap-1.5">
                      {agent.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
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
