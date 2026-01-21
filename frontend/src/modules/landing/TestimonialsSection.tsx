"use client";

import { useState, useEffect } from "react";

export const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      quote:
        "AI Workforce Hub transformed our operations. The Sales and CRM agents work together seamlessly, and we've seen a 40% increase in qualified leads within the first month.",
      name: "Sarah Chen",
      company: "VP Operations, TechFlow",
      role: "Enterprise Client",
      avatar: "SC",
    },
    {
      quote:
        "The Call Agent handles our support calls with incredible accuracy. Our response time dropped by 70% and customer satisfaction is at an all-time high.",
      name: "Marcus Rodriguez",
      company: "Director of Support, InnovateCorp",
      role: "Support Team",
      avatar: "MR",
    },
    {
      quote:
        "Having all 5 agents communicate automatically is a game-changer. What used to take our team hours now happens in real-time with perfect accuracy.",
      name: "Jamie Marshall",
      company: "Co-founder, Exponent",
      role: "Startup Founder",
      avatar: "JM",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNavigationClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTestimonial(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="material-symbols-outlined text-sm text-emerald-600">
              format_quote
            </span>
            <span className="text-sm font-medium text-emerald-600">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Industry Leaders
            </span>
          </h2>
          <p className="text-slate-600">
            See how businesses are transforming their operations with AI Workforce Hub
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/50">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center opacity-20">
              <span className="material-symbols-outlined text-2xl text-white">
                format_quote
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/25 transition-all duration-500"
                  style={{
                    transform: isTransitioning ? "scale(0.9)" : "scale(1)",
                    opacity: isTransitioning ? 0.7 : 1,
                  }}
                >
                  {testimonials[activeTestimonial].avatar}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p
                  className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-6 transition-all duration-500"
                  style={{
                    filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  }}
                >
                  &quot;{testimonials[activeTestimonial].quote}&quot;
                </p>

                <div
                  className="transition-all duration-500"
                  style={{
                    filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                  }}
                >
                  <div className="font-semibold text-slate-900">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-slate-500 text-sm">
                    {testimonials[activeTestimonial].company}
                  </div>
                  <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigationClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? "bg-emerald-500 w-6"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleNavigationClick(
                      (activeTestimonial - 1 + testimonials.length) %
                        testimonials.length
                    )
                  }
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    chevron_left
                  </span>
                </button>
                <button
                  onClick={() =>
                    handleNavigationClick(
                      (activeTestimonial + 1) % testimonials.length
                    )
                  }
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
