import { targetUsers } from "./data";

export const TargetUsers = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="text-xs font-medium text-emerald-600">
              For Every Team
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Scale Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Operations
            </span>
          </h2>
          <p className="text-slate-600">
            From startups to enterprise, our AI agents adapt to your business
            needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {targetUsers.map((user) => (
            <div
              key={user.title}
              className="group rounded-2xl bg-slate-50 border border-slate-200 p-7 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                <span className="material-symbols-outlined text-xl text-emerald-600 group-hover:text-white transition-colors">
                  {user.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {user.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {user.description}
              </p>

              {/* Agents */}
              <div className="flex flex-wrap gap-2">
                {user.agents.map((agent) => (
                  <span
                    key={agent}
                    className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  >
                    {agent}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
