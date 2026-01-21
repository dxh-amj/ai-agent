import Image from "next/image";

import { integrations } from "./data";

export const IntegrationBar = () => {
  return (
    <section className="py-10 border-y border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium text-slate-500 uppercase tracking-widest mb-8">
          Integrates with your existing tools
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={integration.logo}
                alt={integration.name}
                width={100}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
