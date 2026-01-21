import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { agents, stats } from "./data";

export const HeroSection = () => {
  return (
    <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Light mode background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)]" />

      {/* Futuristic grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16 185 129) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-600">Multi-Agent AI Platform</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Your Complete{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                AI Workforce
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Deploy 5 specialized AI agents that work together seamlessly—handling sales, support
              calls, CRM, marketing, and analytics as one unified digital team.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-2">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl lg:text-3xl font-bold text-slate-900">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 h-12 px-6"
              >
                <Link href="/register">
                  Start Free Trial
                  <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100 h-12 px-6"
              >
                <span className="material-symbols-outlined mr-2 text-lg">play_circle</span>
                Watch Demo
              </Button>
            </div>

            <p className="text-sm text-slate-500">No credit card required · Setup in 5 minutes</p>
          </div>

          {/* Right side - Agent Cards Display */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main card stack */}
              <div className="relative">
                {/* Background cards for depth */}
                <div className="absolute -right-4 -bottom-4 w-full h-full rounded-2xl bg-slate-100 border border-slate-200/80" />
                <div className="absolute -right-2 -bottom-2 w-full h-full rounded-2xl bg-slate-50 border border-slate-200/80" />

                {/* Main dashboard card */}
                <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
                  {/* Header bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-slate-500 ml-2">AI Workforce Hub</span>
                  </div>

                  {/* Content */}
                  <div className="p-5 bg-gradient-to-b from-white to-slate-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-slate-700">Active Agents</h3>
                      <span className="text-xs text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        5 Online
                      </span>
                    </div>

                    {/* Agent list */}
                    <div className="space-y-3">
                      {agents.map((agent, i) => (
                        <div
                          key={agent.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
                        >
                          <div
                            className={`w-10 h-10 rounded-lg ${agent.bgColor} flex items-center justify-center border ${agent.borderColor}`}
                          >
                            <span
                              className={`material-symbols-outlined text-lg bg-gradient-to-r ${agent.color} bg-clip-text text-transparent`}
                            >
                              {agent.icon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-800">
                                {agent.name}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-xs text-slate-500 truncate block">
                              {agent.capabilities[0]}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">{(i + 1) * 12}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
