"use client";

import { useEffect, useRef,useState } from "react";

import { agents } from "./data";

const featureCards = [
  {
    title: "Smart Agent Orchestration",
    description:
      "5 AI agents communicate in real-time, automatically handing off tasks and sharing context.",
    icon: "hub",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Intelligent Workflows",
    description:
      "When one agent completes a task, the next begins automatically. Zero manual intervention.",
    icon: "conversion_path",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Unified Analytics",
    description:
      "Real-time insights and predictions from your Analytics Agent, tracking every KPI.",
    icon: "insights",
    gradient: "from-violet-500 to-purple-500",
  },
];

export const InteractiveFeatures = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % featureCards.length);
          }
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      mountedRef.current = false;
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (!mountedRef.current) return;
    setActiveCard(index);
    setProgress(0);
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Decorative borders */}
      <div className="absolute left-0 top-0 bottom-0 w-12 overflow-hidden hidden lg:block">
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-4 -rotate-45 origin-top-left border-b border-slate-200/60"
              style={{ marginLeft: "-50%" }}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-12 overflow-hidden hidden lg:block">
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-4 -rotate-45 origin-top-left border-b border-slate-200/60"
              style={{ marginLeft: "-50%" }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
            <span className="material-symbols-outlined text-sm text-emerald-600">
              auto_awesome
            </span>
            <span className="text-sm font-medium text-slate-700">
              Platform Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Streamline your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              AI operations
            </span>
          </h2>
          <p className="text-slate-600 text-lg">
            Manage agents, analyze data, and collaborate with your team—all in
            one powerful platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Interactive Cards */}
          <div className="flex flex-col gap-3">
            {featureCards.map((card, index) => {
              const isActive = index === activeCard;
              return (
                <div
                  key={card.title}
                  onClick={() => handleCardClick(index)}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-white shadow-lg shadow-slate-200/50 border border-slate-200"
                      : "bg-white/50 border border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {/* Progress bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="p-6 flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${card.gradient}`
                          : "bg-slate-100"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          isActive ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {card.icon}
                      </span>
                    </div>
                    <div>
                      <h3
                        className={`font-semibold mb-1 transition-colors ${
                          isActive ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed transition-colors ${
                          isActive ? "text-slate-600" : "text-slate-500"
                        }`}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - Visual Display */}
          <div className="relative">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-500 ml-2">
                  AI Workforce Dashboard
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {activeCard === 0
                      ? "Agent Network"
                      : activeCard === 1
                      ? "Active Workflows"
                      : "Performance Analytics"}
                  </h3>
                  <span className="text-xs text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Live
                  </span>
                </div>

                {/* Dynamic content based on active card */}
                {activeCard === 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {agents.slice(0, 4).map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg ${agent.bgColor} flex items-center justify-center`}
                        >
                          <span
                            className={`material-symbols-outlined text-lg bg-gradient-to-r ${agent.color} bg-clip-text text-transparent`}
                          >
                            {agent.icon}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">
                            {agent.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-xs text-slate-500">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeCard === 1 && (
                  <div className="space-y-3">
                    {[
                      {
                        from: "Sales Agent",
                        to: "CRM Agent",
                        status: "Running",
                      },
                      {
                        from: "Call Agent",
                        to: "Analytics Agent",
                        status: "Completed",
                      },
                      {
                        from: "Marketing Agent",
                        to: "CRM Agent",
                        status: "Pending",
                      },
                    ].map((workflow, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-sm text-slate-700">
                            {workflow.from}
                          </span>
                          <span className="material-symbols-outlined text-sm text-slate-400">
                            arrow_forward
                          </span>
                          <span className="text-sm text-slate-700">
                            {workflow.to}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            workflow.status === "Running"
                              ? "bg-blue-100 text-blue-700"
                              : workflow.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {workflow.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeCard === 2 && (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Calls Handled", value: "1,284", change: "+12%" },
                      { label: "Leads Generated", value: "356", change: "+8%" },
                      { label: "Response Time", value: "1.2s", change: "-23%" },
                      { label: "Satisfaction", value: "98%", change: "+5%" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-100"
                      >
                        <div className="text-xs text-slate-500 mb-1">
                          {stat.label}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-slate-800">
                            {stat.value}
                          </span>
                          <span
                            className={`text-xs ${
                              stat.change.startsWith("+")
                                ? "text-emerald-600"
                                : "text-rose-600"
                            }`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
