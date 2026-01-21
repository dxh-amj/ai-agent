"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";
import { Logo } from "@/shared/ui/logo";

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="flex h-16 w-full">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
            <Logo variant="dark" />

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
              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-5"
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </header>
  );
};
