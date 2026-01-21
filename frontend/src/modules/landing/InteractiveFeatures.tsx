import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

const features = [
  {
    title: "Multi-Agent Orchestration",
    description:
      "Connect specialized agents to work together as a unified digital workforce, sharing context and tasks.",
    icon: "hub",
  },
  {
    title: "Intelligent Workflows",
    description:
      "Automate complex business processes with logic-based routing and conditional execution paths.",
    icon: "account_tree",
  },
  {
    title: "Real-time Analytics",
    description:
      "Monitor agent performance, task completion rates, and ROI with granular, real-time dashboards.",
    icon: "monitoring",
  },
  {
    title: "Seamless Integration",
    description:
      "Connect with your existing tools like Slack, Salesforce, and HubSpot in just a few clicks.",
    icon: "integration_instructions",
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and SOC2 compliant infrastructure to keep your data safe and secure.",
    icon: "verified_user",
  },
  {
    title: "24/7 Availability",
    description:
      "Your digital agents never sleep, ensuring instant responses and continuous operation around the clock.",
    icon: "schedule",
  },
];

export const InteractiveFeatures = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-white relative overflow-hidden">
      <div className="flex relative z-10">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-6 tracking-tight">
                Everything you need to scale
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Powerful features designed to help you automate operations and grow your business
                faster.
              </p>
            </div>

            {/* Static Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="material-symbols-outlined text-2xl text-emerald-600">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
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
