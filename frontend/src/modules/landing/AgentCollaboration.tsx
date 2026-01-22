import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

import { agents } from "./data";

export const AgentCollaboration = () => {
  return (
    <section className="w-full overflow-hidden bg-transparent">
      <div className="flex relative">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section Header - Clean & Elegant */}
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Agents that work as one. <span className="text-primary">No more silos.</span>
              </h2>

              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Your team runs on{" "}
                <span className="font-semibold text-slate-900">AI agents that share context</span>,
                built around <span className="font-semibold text-slate-900">unified memory</span>{" "}
                that lives across your entire workflow.
              </p>
            </div>

            {/* Agent Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`flex flex-col items-center justify-center py-8 px-4 ${
                    index !== agents.length - 1 ? "border-r border-slate-200" : ""
                  } ${
                    index >= 2 && index < agents.length - 1
                      ? "max-md:border-b max-md:border-slate-200"
                      : ""
                  } ${
                    index < 2 ? "max-lg:border-b max-lg:border-slate-200" : ""
                  } hover:bg-slate-50 transition-colors duration-200 group`}
                >
                  {/* Agent Icon */}
                  <div className="mb-4">
                    <span
                      className={`material-symbols-outlined text-4xl bg-linear-to-r ${agent.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200 inline-block`}
                    >
                      {agent.icon}
                    </span>
                  </div>

                  {/* Agent Name */}
                  <span className="text-sm font-medium text-slate-700 text-center">
                    {agent.name}
                  </span>
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
