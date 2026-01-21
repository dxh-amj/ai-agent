"use client";

import { useState } from "react";

import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is AI Workforce Hub and who is it for?",
    answer:
      "AI Workforce Hub is a multi-agent AI platform that provides 5 specialized AI agents working together. It's designed for businesses of all sizes looking to automate sales, customer support, CRM, marketing, and analytics operations.",
  },
  {
    question: "How do the AI agents work together?",
    answer:
      "Our agents communicate seamlessly through an intelligent orchestration layer. When one agent completes a task, it automatically triggers relevant actions in other agents. For example, when the Sales Agent qualifies a lead, the CRM Agent updates records, and the Marketing Agent initiates personalized follow-ups.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Yes! AI Workforce Hub integrates seamlessly with popular tools like Slack, Salesforce, HubSpot, Zendesk, Twilio, and many more. We also provide APIs and webhooks for custom integrations with your existing workflow.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 customer support, dedicated account managers for enterprise clients, comprehensive documentation, and onboarding assistance to help you get started within minutes.",
  },
  {
    question: "Is my data secure with AI Workforce Hub?",
    answer:
      "Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is stored in secure, redundant data centers with strict access controls.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is simple! Sign up for our free trial—no credit card required. Connect your existing systems, and your AI workforce will be operational within 5 minutes.",
  },
];

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="w-full bg-white">
      <div className="flex">
        <DecorativeStripes />

        {/* Main Content */}
        <div className="flex-1 border-x border-slate-200 py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-6 tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Everything you need to know about AI Workforce Hub. Can&apos;t find what you&apos;re
                looking for? Contact our support team.
              </p>
            </div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqData.map((item, index) => {
                const isOpen = openItems.includes(index);

                return (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden hover:border-emerald-200 transition-colors duration-200"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 flex justify-between items-start gap-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-slate-900 font-medium leading-relaxed">
                        {item.question}
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "bg-emerald-500 text-white rotate-180"
                            : "bg-white border border-slate-200 text-slate-500"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">expand_more</span>
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </section>
  );
};
