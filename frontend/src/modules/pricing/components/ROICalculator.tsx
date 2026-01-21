import { useMemo, useState } from "react";

import { Button } from "@/shared/ui/button";

export const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState(12);
  const [avgSalary, setAvgSalary] = useState(85000);
  const [timeSaved, setTimeSaved] = useState(20);

  const savings = useMemo(
    () => teamSize * avgSalary * (timeSaved / 100),
    [teamSize, avgSalary, timeSaved]
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl bg-slate-900 p-8 md:p-12 shadow-2xl overflow-hidden relative">
        <div
          className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#10b77f 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white">Calculate your ROI</h2>
            <p className="text-slate-400">
              See how much your team can save by automating workflows with AI agents.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-300">Team Size</label>
                <span className="text-2xl font-bold text-primary">{teamSize}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-300">Avg. Annual Salary</label>
                <span className="text-2xl font-bold text-primary">
                  ${avgSalary.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="30000"
                max="200000"
                step="5000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-300">Time Saved (%)</label>
                <span className="text-2xl font-bold text-primary">{timeSaved}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={timeSaved}
                onChange={(e) => setTimeSaved(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:items-start bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-2">
              Estimated Annual Savings
            </p>
            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-400 mb-6">
              {formatCurrency(savings)}
            </div>
            <Button className="w-full md:w-auto bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/30">
              Start Saving Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
