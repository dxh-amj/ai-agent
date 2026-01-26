"use client";

import dynamic from "next/dynamic";

import { WorkforceChartSkeleton } from "./WorkforceChartSkeleton";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const WorkforceChart = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return <WorkforceChartSkeleton />;
  }

  const options: any = {
    chart: {
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: false },
      background: "transparent",
      fontFamily: "inherit",
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#6366f1"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#6366f1",
            opacity: 0.4,
          },
          {
            offset: 100,
            color: "#6366f1",
            opacity: 0,
          },
        ],
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
          fontWeight: 600,
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "10px",
          fontWeight: 600,
        },
      },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
      padding: { left: 0, right: 0, top: 0, bottom: 0 },
    },
    tooltip: {
      theme: "light",
      x: { show: false },
    },
    dataLabels: { enabled: false },
  };

  const series = [
    {
      name: "Tasks Processed",
      data: [45, 52, 38, 65, 48, 24, 30],
    },
  ];

  return (
    <div className="p-8 rounded-4xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Workflow Velocity
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Tasks processed by your AI agents over the last 7 days
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +18.2%
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-[240px]">
        <Chart options={options} series={series} type="area" height="100%" width="100%" />
      </div>
    </div>
  );
};
