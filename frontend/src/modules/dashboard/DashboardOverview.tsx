"use client";

import { useDashboardData } from "@/services/dashboard";
import { Button } from "@/shared/ui/button";

import { RecentActivity } from "./recent-activity/RecentActivity";
import { StatsOverviewSkeleton } from "./stats-overview/StatsOverviewSkeleton";
import { WelcomeCard } from "./welcome-card/WelcomeCard";
import { WorkforceChart } from "./workforce-chart/WorkforceChart";

export const DashboardOverview = () => {
  const { data, isLoading } = useDashboardData();

  const stats = [
    {
      label: "Active Agents",
      value: data?.stats.activeAgents ?? 0,
      sub: "Operational",
      icon: "smart_toy",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "hover:border-emerald-500/20",
    },
    {
      label: "Channels",
      value: 5,
      sub: "Connected",
      icon: "hub",
      color: "text-primary",
      bg: "bg-primary/5 dark:bg-primary/10",
      border: "hover:border-primary/20",
    },
    {
      label: "Efficiency",
      value: `+${data?.stats.efficiencyGain}%`,
      sub: "Gain",
      icon: "speed",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "hover:border-amber-500/20",
    },
    {
      label: "Time Saved",
      value: `${data?.stats.timeSavedHours}h`,
      sub: "Total",
      icon: "schedule",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "hover:border-blue-500/20",
    },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <WelcomeCard data={data?.welcome} isLoading={isLoading} />

      {/* Stats Row */}
      {isLoading ? (
        <StatsOverviewSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 shadow-sm transition-all hover:shadow-md ${stat.border} group/stat`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}
                >
                  <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                </div>
                <span
                  className={`text-[10px] font-bold ${stat.color} ${stat.bg} px-2 py-1 rounded-md uppercase tracking-wider`}
                >
                  {stat.sub}
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Full Width Chart */}
        <div className="w-full">
          <WorkforceChart isLoading={isLoading} />
        </div>

        {/* Full Width Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Workforce Activity
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-semibold text-primary hover:bg-primary/5 px-3"
            >
              View Analytics
            </Button>
          </div>
          <div>
            <RecentActivity activities={data?.activities} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
