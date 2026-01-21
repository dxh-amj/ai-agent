"use client";

import Image from "next/image";

import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        'AI Workforce Hub takes the pain out of building powerful AI Agents. Building Agents is very much a "team sport" and our platform makes it fun to work together and build customer facing use-cases and internal AI applications.',
      name: "Victor Algaze",
      company: "CISCO",
      role: "Software Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Victor",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
    },
    {
      quote:
        "Our platform is a very versatile tool, combining visual flows with strong API capabilities and also providing a code editor and functions, for developers.",
      name: "Ciprian Nastase",
      company: "TRILOGY",
      role: "L3 Support AI Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ciprian",
      logo: "https://images.squarespace-cdn.com/content/v1/56896264d8af105e60802773/1544607739989-D5O6L7Q8R4X7Y0Z1A2B3/Trilogy+Logo+Blue.png",
    },
    {
      quote:
        "AI Workforce Hub provides us with massive acceleration, enabling us to experiment without fear... our platform allowed us to focus on value-adding activities like orchestration and building a robust, generative conversational architecture.",
      name: "Andre Fredericks",
      company: "Sanlam",
      role: "Chief Operating Officer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andre",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sanlam_logo.svg",
    },
  ];

  return (
    <section className="w-full bg-transparent relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="flex relative z-10">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-300 py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Trusted by{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                  leading teams
                </span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                See how companies are transforming their operations with our AI agents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-300 border border-slate-300 rounded-xl overflow-hidden bg-white">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-12 lg:p-16 text-center transition-all duration-300 hover:bg-slate-50/50 group"
                >
                  {/* Company Logo */}
                  <div className="h-10 mb-10 flex items-center justify-center transition-all duration-300 relative">
                    <Image
                      src={testimonial.logo}
                      alt={testimonial.company}
                      width={160}
                      height={40}
                      className="h-full w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        if (target.nextElementSibling) {
                          target.nextElementSibling.classList.remove("hidden");
                        }
                      }}
                    />
                    <span className="hidden font-bold text-slate-800 tracking-wider text-xl uppercase">
                      {testimonial.company}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-[#334155] text-lg lg:text-xl leading-relaxed mb-12 max-w-xs mx-auto">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Author Info */}
                  <div className="mt-auto flex flex-col items-center">
                    <div className="w-11 h-11 rounded-lg overflow-hidden mb-3 ring-1 ring-slate-200 relative">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-semibold text-slate-900 text-[15px] mb-0.5">
                        {testimonial.name}
                      </div>
                      <div className="text-slate-500 text-[13px] font-medium">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
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
