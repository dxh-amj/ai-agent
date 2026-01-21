import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

import { agents, workflowExamples } from "./data";

export const AgentCollaboration = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-slate-50/50 overflow-hidden">
      <div className="flex relative">
        <DecorativeStripes />

        {/* Ambient Background Gradient for Depth */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
        </div>

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left content - Detailed Timeline/Workflow */}
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-emerald-600 tracking-wide uppercase">
                    Smart_Workflows_v2.0
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  Agents that{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-500">
                    work as one
                  </span>
                </h2>
                <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                  Forget siloed tools. Your AI agents share context, memory, and goals—passing tasks
                  instantly from one to the next without dropping the ball.
                </p>

                {/* Connected Workflow Cards with Ultra Premium Look */}
                <div className="relative space-y-6">
                  {/* Vertical Timeline Line */}
                  <div className="absolute left-[30px] top-8 bottom-8 w-px bg-linear-to-b from-emerald-500/30 via-teal-500/20 to-transparent" />

                  {workflowExamples.map((example, i) => (
                    <div key={i} className="relative pl-24 group">
                      {/* Step Number Watermark & Connector */}
                      <div className="absolute left-0 top-6 flex flex-col items-center">
                        <div className="relative flex items-center justify-center w-[60px] h-[60px]">
                          {/* Connector Dot on the line */}
                          <div className="absolute left-[30px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-50 shadow-[0_0_10px_rgba(16,185,129,0.5)] z-20 group-hover:scale-125 transition-transform duration-300" />
                          {/* Watermark Number */}
                          <span className="text-4xl font-bold text-slate-200/50 select-none font-mono">
                            0{i + 1}
                          </span>
                        </div>
                      </div>

                      {/* Glassmorphism Card */}
                      <div className="relative p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-white via-white/50 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100/50">
                                {example.icon}
                              </span>
                              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">
                                {example.trigger}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm pt-2 border-t border-slate-100/80">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-0.5">
                                From
                              </span>
                              <span className="font-semibold text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/50">
                                {example.from}
                              </span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 text-sm mt-3">
                              chevron_right
                            </span>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-emerald-600/70 font-mono uppercase tracking-wider mb-0.5">
                                To
                              </span>
                              <span className="font-semibold text-white bg-linear-to-r from-emerald-500 to-teal-500 px-2 py-0.5 rounded shadow-sm shadow-emerald-500/20">
                                {example.to}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Enhanced Visual Diagram */}
              <div className="relative flex items-center justify-center lg:h-[600px] perspective-1000">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow" />

                <div className="relative w-full max-w-md aspect-square">
                  {/* Connection lines SVG with animation */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <linearGradient id="activeLine" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="transparent" />
                        <animate
                          attributeName="x1"
                          from="-100%"
                          to="100%"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="x2"
                          from="0%"
                          to="200%"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Ring connections */}
                    <circle
                      cx="200"
                      cy="200"
                      r="140"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      className="animate-spin-slower"
                    />

                    {/* Active streaming paths */}
                    {[0, 1, 2, 3, 4].map((i) => {
                      const angle = (i * 72 - 90) * (Math.PI / 180);
                      const x2 = 200 + 140 * Math.cos(angle);
                      const y2 = 200 + 140 * Math.sin(angle);
                      return (
                        <g key={i}>
                          <line
                            x1="200"
                            y1="200"
                            x2={x2}
                            y2={y2}
                            stroke="#cbd5e1"
                            strokeWidth="1"
                            strokeOpacity="0.5"
                          />
                          <circle r="3" fill="#10b981">
                            <animateMotion
                              dur={`${2 + i * 0.5}s`}
                              repeatCount="indefinite"
                              path={`M 200 200 L ${x2} ${y2}`}
                            />
                          </circle>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Central Hub */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white border border-slate-100 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex items-center justify-center z-20 group">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping opacity-20" />
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-inner transform group-hover:scale-105 transition-transform duration-500">
                      <span className="material-symbols-outlined text-5xl group-hover:rotate-180 transition-transform duration-700">
                        hub
                      </span>
                    </div>
                  </div>

                  {/* Agent Nodes */}
                  {agents.map((agent, i) => {
                    const angle = (i * 72 - 90) * (Math.PI / 180);
                    const r = 140;
                    const x = 200 + r * Math.cos(angle);
                    const y = 200 + r * Math.sin(angle);

                    return (
                      <div
                        key={agent.id}
                        className="absolute w-14 h-14 -ml-7 -mt-7 rounded-2xl bg-white border border-slate-200 shadow-lg flex items-center justify-center z-20 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer group/node"
                        style={{
                          left: `${(x / 400) * 100}%`,
                          top: `${(y / 400) * 100}%`,
                        }}
                      >
                        <div
                          className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] font-mono rounded opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap`}
                        >
                          {agent.name}
                        </div>
                        <span
                          className={`material-symbols-outlined text-2xl bg-linear-to-r ${agent.color} bg-clip-text text-transparent`}
                        >
                          {agent.icon}
                        </span>
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
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
