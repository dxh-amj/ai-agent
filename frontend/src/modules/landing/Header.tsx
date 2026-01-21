"use client";

import { Button } from "@/shared/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
            <span className="material-symbols-outlined text-xl">hub</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            AI Workforce Hub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {["Platform", "Agents", "Pricing", "Docs"].map((item) => (
            <Link
              key={item}
              href={item === "Pricing" ? "/pricing" : "/"}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
          >
            Sign in
          </Link>
          <Link href="/auth/register">
            <Button
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 glow-primary"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
