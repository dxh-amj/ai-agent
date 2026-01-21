"use client";

import { LoginForm } from "@/modules/auth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-slate-900">
      {/* LEFT COLUMN: Login Form */}
      <div className="flex flex-col w-full lg:w-1/2 p-6 md:p-12 lg:p-20 justify-center bg-white z-10 relative">
        <div className="w-full max-w-md mx-auto flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              AI Workforce Hub
            </span>
          </Link>

          <LoginForm
            title="Welcome Back"
            subtext={
              <p className="text-slate-500 text-base mb-4">
                Log in to your AI Workforce Hub dashboard.
              </p>
            }
            subtitle={
              <div className="text-center mt-4">
                <p className="text-slate-500 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/register" className="text-primary font-medium hover:underline">
                    {" "}
                    Sign up
                  </Link>
                </p>
              </div>
            }
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Marketing */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-primary to-teal-600 overflow-hidden">
        <div className="absolute w-96 h-96 top-[-50px] left-[-50px] bg-white/5 rounded-full animate-float" />
        <div
          className="absolute w-64 h-64 bottom-[10%] right-[-30px] bg-white/5 rounded-full animate-float"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />

        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 h-full text-white w-full max-w-2xl mx-auto">
          <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-8 drop-shadow-sm">
            Automate Your Business <br />
            <span className="text-white/80">with AI Agents.</span>
          </h2>

          <div className="flex flex-col gap-6 mb-12">
            {[
              {
                icon: "rocket_launch",
                title: "Deploy in seconds",
                description: "Get your agents running instantly.",
              },
              {
                icon: "shield_lock",
                title: "Enterprise-grade security",
                description: "Your data is safe, encrypted, and compliant.",
              },
              {
                icon: "group",
                title: "Collaborate with your team",
                description: "Seamless sharing and permission management.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-white">{item.icon}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl max-w-md">
            <div className="flex gap-1 mb-3 text-yellow-300">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="material-symbols-outlined text-[20px]">
                  star
                </span>
              ))}
            </div>
            <p className="text-lg font-medium leading-relaxed mb-6 italic text-white/90">
              &quot;AI Workforce Hub transformed our workflow. We automated 80% of our repetitive
              tasks in the first week.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white">person</span>
              </div>
              <div>
                <p className="font-bold text-white">Sarah Chen</p>
                <p className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  Product Lead at TechFlow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
