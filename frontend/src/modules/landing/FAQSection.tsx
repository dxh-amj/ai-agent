"use client";

import { useState } from "react";

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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <div className="lg:w-2/5 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <span className="material-symbols-outlined text-sm text-emerald-600">
                help
              </span>
              <span className="text-sm font-medium text-emerald-600">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Everything you need to know about AI Workforce Hub.
              Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:w-3/5 flex flex-col">
            <div className="w-full flex flex-col">
              {faqData.map((item, index) => {
                const isOpen = openItems.includes(index);

                return (
                  <div
                    key={index}
                    className="w-full border-b border-slate-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-5 py-5 flex justify-between items-center gap-5 text-left hover:bg-slate-100/50 transition-colors duration-200"
                      aria-expanded={isOpen}
                    >
                      <div className="flex-1 text-slate-800 text-base font-medium leading-6">
                        {item.question}
                      </div>
                      <div className="flex justify-center items-center">
                        <ChevronDownIcon
                          className={`w-6 h-6 text-slate-400 transition-transform duration-300 ease-in-out ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-5 pb-5 text-slate-600 text-sm font-normal leading-6">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
