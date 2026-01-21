"use client";

import { RegisterForm } from "@/modules/auth";
import Link from "next/link";

const benefits = [
  {
    icon: "rocket_launch",
    title: "Launch in minutes",
    description: "Pre-configured environments ready to go.",
  },
  {
    icon: "card_giftcard",
    title: "14-day free trial",
    description: "Full access to Pro features, on us.",
  },
  {
    icon: "credit_card_off",
    title: "No credit card needed",
    description: "Just sign up and start building.",
  },
];

export default function RegisterPage() {
  return (
    <div className="flex w-full min-h-screen flex-col lg:flex-row bg-white text-slate-900 font-sans">
      {/* Left Column: Registration Form */}
      <div className="w-full lg:w-1/2 xl:w-[55%] flex flex-col min-h-screen bg-white relative">
        <div className="px-6 py-6 lg:px-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              AI Workforce Hub
            </span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 xl:px-24 max-w-[720px] mx-auto w-full py-8">
          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-sm font-semibold">Account Setup</span>
              <span className="text-slate-400 text-xs font-medium">Step 1 of 3</span>
            </div>
            <div className="relative w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-primary rounded-full" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span className="text-primary font-medium">Account</span>
              <span>Organization</span>
              <span>Plan</span>
            </div>
          </div>

          <RegisterForm
            title="Create your account"
            subtext={
              <p className="text-slate-500 text-lg mb-4">
                Start building smarter AI agents in minutes.
              </p>
            }
          />
        </div>

        <div className="px-6 py-6 lg:px-12 text-center lg:text-left">
          <p className="text-xs text-slate-400">
            By signing up, you agree to our{" "}
            <a href="#" className="underline hover:text-slate-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-slate-600">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Column: Benefits */}
      <div className="hidden lg:flex w-1/2 xl:w-[45%] bg-slate-50 flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full p-12 xl:p-20 justify-center">
          <h2 className="text-3xl xl:text-4xl font-bold text-slate-900 mb-12 leading-tight">
            Join thousands of developers building the future of AI.
          </h2>
          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group flex items-start gap-4 p-5 rounded-xl bg-white border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">{benefit.icon}</span>
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-6">
              Trusted by engineering teams at
            </p>
            <div className="flex items-center gap-6">
              {["TechCorp", "InnovateCo", "DataDrive", "CloudScale"].map((company) => (
                <div key={company} className="text-slate-300 font-bold text-sm">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
