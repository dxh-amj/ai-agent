"use client";

import Image from "next/image";

import { integrations } from "@/modules/landing/data";

export const AgentIntegrations = () => {
  return (
    <section className="w-full bg-white dark:bg-slate-900">
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <span className="material-symbols-outlined text-base">link</span>
            Integrations
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:text-4xl">
            Connects with your favorite tools
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Seamlessly integrate with the platforms you already use every day.
          </p>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {integrations.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 h-16 w-16"
                title={tool.name}
              >
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
