"use client";

import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

const companies = [
  { name: "TechFlow", initials: "TF" },
  { name: "InnovateCorp", initials: "IC" },
  { name: "Exponent", initials: "EX" },
  { name: "DataPrime", initials: "DP" },
  { name: "ScaleUp", initials: "SU" },
  { name: "CloudNine", initials: "CN" },
  { name: "NextGen", initials: "NG" },
  { name: "Quantum", initials: "QT" },
];

const stats = [
  { value: "2,000+", label: "Companies" },
  { value: "5M+", label: "Tasks Automated" },
  { value: "99.9%", label: "Uptime" },
  { value: "85%", label: "Time Saved" },
];

export const SocialProof = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-white">
      <div className="flex">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-800 tracking-tight mb-4">
                Confidence backed by results
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Join thousands of companies transforming their operations with AI
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Company logos grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border border-slate-200 rounded-2xl overflow-hidden">
              {companies.map((company, index) => (
                <div
                  key={company.name}
                  className={`flex items-center justify-center gap-3 p-6 lg:p-8 ${
                    index % 4 !== 3 ? "border-r border-slate-200" : ""
                  } ${index < 4 ? "border-b border-slate-200" : ""} ${
                    index % 2 === 0 && index < 4
                      ? "sm:border-r"
                      : index % 2 === 1 && index < 4
                      ? "border-r-0 sm:border-r"
                      : ""
                  } hover:bg-slate-50 transition-colors`}
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-200 to-slate-100 flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-slate-600">{company.initials}</span>
                  </div>
                  <span className="text-lg font-medium text-slate-700">{company.name}</span>
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
