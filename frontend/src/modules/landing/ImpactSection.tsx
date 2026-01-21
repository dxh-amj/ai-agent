"use client";

import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

const impacts = [
  {
    value: "24/7",
    label: "Always On",
    description: "Agents never sleep, ensuring zero downtime for your customers.",
    icon: "schedule",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    value: "10x",
    label: "Faster Execution",
    description: "Complex workflows automated in seconds, not hours.",
    icon: "bolt",
    color: "text-teal-600",
    bg: "bg-teal-500/10",
  },
  {
    value: "60%",
    label: "Cost Reduction",
    description: "Scale operations efficiently without linear headcount growth.",
    icon: "trending_down",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    value: "100%",
    label: "Consistency",
    description: "Eliminate human error with precise, rule-based execution.",
    icon: "verified",
    color: "text-teal-600",
    bg: "bg-teal-500/10",
  },
];

export const ImpactSection = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-white">
      <div className="flex">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-800 tracking-tight mb-4">
                Scale your workforce, instantly
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Deploy intelligent agents that work alongside your team to maximize efficiency and
                drive growth from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impacts.map((item) => (
                <div
                  key={item.label}
                  className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-slate-100 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span className={`material-symbols-outlined ${item.color} text-2xl`}>
                      {item.icon}
                    </span>
                  </div>
                  <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.value}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
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
