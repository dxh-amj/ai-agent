"use client";

import Image from "next/image";

import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

// Agent Orchestration Visual - Shows agents working together
const AgentOrchestrationVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center scale-90">
      {/* Tilted cards like the reference */}
      <div className="relative w-[200px] h-[180px]">
        {/* Back card - tilted left */}
        <div
          className="absolute left-0 top-4 w-[140px] bg-white rounded-xl border border-slate-200 shadow-lg p-3"
          style={{ transform: "rotate(-8deg)" }}
        >
          {/* Amber task */}
          <div className="w-full h-[42px] rounded-lg overflow-hidden bg-amber-50 flex mb-2">
            <div className="w-[3px] bg-amber-500" />
            <div className="p-2 flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[10px] font-medium text-amber-800">2:00 PM</span>
                <span className="w-4 h-4 rounded-full bg-amber-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[10px] text-white">videocam</span>
                </span>
              </div>
              <div className="text-[10px] font-semibold text-amber-900">Sales Call Review</div>
            </div>
          </div>
          {/* Sky task */}
          <div className="w-full h-[52px] rounded-lg overflow-hidden bg-sky-50 flex">
            <div className="w-[3px] bg-sky-500" />
            <div className="p-2 flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[10px] font-medium text-sky-800">3:30 PM</span>
              </div>
              <div className="text-[10px] font-semibold text-sky-900">CRM Data Sync</div>
              <div className="text-[9px] text-sky-700 mt-0.5">Auto-triggered</div>
            </div>
          </div>
        </div>

        {/* Front card - tilted right */}
        <div
          className="absolute right-0 top-0 w-[140px] bg-white rounded-xl border border-slate-200 shadow-xl p-3"
          style={{ transform: "rotate(5deg)" }}
        >
          {/* Emerald task */}
          <div className="w-full h-[42px] rounded-lg overflow-hidden bg-emerald-50 flex mb-2">
            <div className="w-[3px] bg-emerald-500" />
            <div className="p-2 flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[10px] font-medium text-emerald-800">Now</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[10px] font-semibold text-emerald-900">Lead Scoring</div>
            </div>
          </div>
          {/* Purple task */}
          <div className="w-full h-[52px] rounded-lg overflow-hidden bg-violet-50 flex">
            <div className="w-[3px] bg-violet-500" />
            <div className="p-2 flex-1">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[10px] font-medium text-violet-800">4:00 PM</span>
              </div>
              <div className="text-[10px] font-semibold text-violet-900">Analytics Report</div>
              <div className="text-[9px] text-violet-700 mt-0.5">5 agents synced</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Work in Sync Visual - Chat style collaboration
const WorkInSyncVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-[280px] space-y-3 scale-95">
        {/* Message 1 - Left */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            S
          </div>
          <div className="bg-slate-100 rounded-2xl px-3 py-2 max-w-[200px]">
            <span className="text-xs font-medium text-slate-700">
              New lead qualified: Acme Corp
            </span>
          </div>
        </div>

        {/* Message 2 - Right */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-slate-800 rounded-2xl px-3 py-2 max-w-[200px]">
            <span className="text-xs font-medium text-white">Adding to CRM pipeline now</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            C
          </div>
        </div>

        {/* Message 3 - Left */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          <div className="bg-slate-100 rounded-2xl px-3 py-2 max-w-[200px]">
            <span className="text-xs font-medium text-slate-700">Predicted close rate: 78%</span>
          </div>
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200">
          <div className="flex-1 bg-slate-50 rounded-full px-3 py-2 text-xs text-slate-400">
            Agents communicating...
          </div>
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">arrow_upward</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Integration Constellation Visual
const IntegrationVisual = () => {
  const integrations = [
    // Inner ring
    { name: "Slack", logo: "/logos/slack.png", x: -60, y: 0 },
    { name: "Notion", logo: "/logos/notion.svg", x: 60, y: 0 },
    // Middle ring
    { name: "Facebook", logo: "/logos/facebook.svg", x: 0, y: -100 },
    { name: "Instagram", logo: "/logos/instagram.svg", x: 70, y: 70 },
    { name: "Messenger", logo: "/logos/messenger.svg", x: -70, y: 70 },
    // Outer ring
    { name: "Twitter", logo: "/logos/twitter.svg", x: -100, y: -70 },
    { name: "LinkedIn", logo: "/logos/linkedin.svg", x: 100, y: -70 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Concentric rings */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-slate-200/50" />
      <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-200/60" />
      <div className="absolute w-[120px] h-[120px] rounded-full border border-slate-200/70" />

      {/* Center hub */}
      <div className="absolute w-14 h-14 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg z-10">
        <span className="material-symbols-outlined text-white text-xl">hub</span>
      </div>

      {/* Integration logos on rings */}
      {integrations.map((integration) => (
        <div
          key={integration.name}
          className="absolute w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100 p-1.5 hover:scale-110 transition-transform"
          style={{ transform: `translate(${integration.x}px, ${integration.y}px)` }}
          title={integration.name}
        >
          <Image src={integration.logo} alt={integration.name} fill className="object-contain" />
        </div>
      ))}

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

// Metrics Visual - Layered dashboard cards
const MetricsVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[260px] h-[180px]">
        {/* Back card */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[140px] bg-white rounded-lg border border-slate-200 shadow-sm" />

        {/* Middle card */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 w-[220px] h-[150px] bg-white rounded-lg border border-slate-200 shadow-md" />

        {/* Front card with content */}
        <div className="absolute left-1/2 -translate-x-1/2 top-6 w-[240px] h-[160px] bg-white rounded-lg border border-slate-200 shadow-lg p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold text-slate-800">Agent Performance</span>
            <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Live
            </span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-slate-50 rounded-md p-2">
              <div className="text-[9px] text-slate-500">Tasks Done</div>
              <div className="text-sm font-bold text-slate-800">1,284</div>
              <div className="text-[8px] text-emerald-600">+12%</div>
            </div>
            <div className="bg-slate-50 rounded-md p-2">
              <div className="text-[9px] text-slate-500">Accuracy</div>
              <div className="text-sm font-bold text-slate-800">98.5%</div>
              <div className="text-[8px] text-emerald-600">+2.3%</div>
            </div>
          </div>

          {/* Mini chart */}
          <div className="flex items-end gap-1 h-[30px]">
            {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-linear-to-t from-emerald-500 to-teal-400 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BentoGridSection = () => {
  return (
    <section className="w-full bg-transparent">
      <div className="flex">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-300 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-6 tracking-tight">
                Built for absolute clarity and focused work
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Stay focused with AI agents that organize, connect and turn information into
                confident decisions.
              </p>
            </div>

            {/* Bento Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              {/* Top Left - Smart Agent Orchestration */}
              <div className="border-b md:border-r border-slate-200 p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                    Smart. Simple. Brilliant.
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Your agent tasks are beautifully organized so you see everything clearly without
                    the clutter.
                  </p>
                </div>
                <div className="w-full h-[220px] sm:h-[280px] rounded-lg flex items-center justify-center overflow-hidden">
                  <AgentOrchestrationVisual />
                </div>
              </div>

              {/* Top Right - Work in sync */}
              <div className="border-b border-slate-200 p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                    Your agents, in sync
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Every update flows instantly across your AI team and keeps collaboration
                    effortless and fast.
                  </p>
                </div>
                <div className="w-full h-[220px] sm:h-[280px] rounded-lg flex items-center justify-center overflow-hidden">
                  <WorkInSyncVisual />
                </div>
              </div>

              {/* Bottom Left - Effortless integration */}
              <div className="md:border-r border-slate-200 p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                    Effortless integration
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    All your favorite tools connect in one place and work together seamlessly by
                    design.
                  </p>
                </div>
                <div className="w-full h-[220px] sm:h-[280px] rounded-lg flex items-center justify-center overflow-hidden relative">
                  <IntegrationVisual />
                </div>
              </div>

              {/* Bottom Right - Numbers that speak */}
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                    Metrics that matter
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Track AI performance with precision and turn raw data into confident decisions
                    you can trust.
                  </p>
                </div>
                <div className="w-full h-[220px] sm:h-[280px] rounded-lg flex items-center justify-center overflow-hidden relative">
                  <MetricsVisual />
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
