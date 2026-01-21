"use client";

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
    <section className="py-20 lg:py-24 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-4">
            <span className="material-symbols-outlined text-sm text-emerald-600">
              verified
            </span>
            <span className="text-sm font-medium text-slate-700">
              Trusted by Industry Leaders
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Confidence backed by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              results
            </span>
          </h2>
          <p className="text-slate-600">
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center shadow-sm">
                <span className="text-sm font-bold text-slate-600">
                  {company.initials}
                </span>
              </div>
              <span className="text-lg font-medium text-slate-700">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
