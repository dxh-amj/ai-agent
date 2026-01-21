import { agents, workflowExamples } from "./data";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

export const AgentCollaboration = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-white">
      <div className="flex">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <span className="text-xs font-medium text-emerald-600">Smart Automation</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Agents That{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-500">
                    Work Together
                  </span>
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  When one agent completes a task, it automatically triggers the next. Your AI
                  workforce communicates and collaborates—just like a real team.
                </p>

                {/* Workflow examples */}
                <div className="space-y-3">
                  {workflowExamples.map((example, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/30 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-emerald-600 text-lg">
                          {example.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800">{example.trigger}</div>
                        <div className="text-xs text-slate-500">
                          {example.from} → {example.to}
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Visual diagram */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="rgb(16,185,129)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    {/* Outer connections */}
                    {[0, 1, 2, 3, 4].map((i) => {
                      const angle1 = (i * 72 - 90) * (Math.PI / 180);
                      const angle2 = ((i + 1) * 72 - 90) * (Math.PI / 180);
                      const r = 140;
                      const x1 = 200 + r * Math.cos(angle1);
                      const y1 = 200 + r * Math.sin(angle1);
                      const x2 = 200 + r * Math.cos(angle2);
                      const y2 = 200 + r * Math.sin(angle2);
                      return (
                        <line
                          key={`outer-${i}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                        />
                      );
                    })}
                    {/* Center connections */}
                    {[0, 1, 2, 3, 4].map((i) => {
                      const angle = (i * 72 - 90) * (Math.PI / 180);
                      const r = 140;
                      const x = 200 + r * Math.cos(angle);
                      const y = 200 + r * Math.sin(angle);
                      return (
                        <line
                          key={`center-${i}`}
                          x1="200"
                          y1="200"
                          x2={x}
                          y2={y}
                          stroke="rgb(16,185,129)"
                          strokeOpacity="0.2"
                          strokeWidth="1"
                        />
                      );
                    })}
                  </svg>

                  {/* Center hub */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 z-10">
                    <span className="material-symbols-outlined text-2xl text-white">hub</span>
                  </div>

                  {/* Agent nodes positioned in a circle */}
                  {agents.map((agent, i) => {
                    const angle = (i * 72 - 90) * (Math.PI / 180);
                    const r = 140;
                    const x = 200 + r * Math.cos(angle);
                    const y = 200 + r * Math.sin(angle);
                    return (
                      <div
                        key={agent.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                        style={{
                          left: `${(x / 400) * 100}%`,
                          top: `${(y / 400) * 100}%`,
                        }}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl ${agent.bgColor} ${agent.borderColor} border flex items-center justify-center bg-white shadow-md`}
                        >
                          <span
                            className={`material-symbols-outlined text-lg bg-linear-to-r ${agent.color} bg-clip-text text-transparent`}
                          >
                            {agent.icon}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600 font-medium whitespace-nowrap">
                          {agent.name.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </section>
  );
};
