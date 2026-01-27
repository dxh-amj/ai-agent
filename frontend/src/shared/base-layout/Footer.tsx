import Link from "next/link";
import React from "react";

import { GitHubIcon, LinkedInIcon, XIcon } from "@/shared/icons";
import { AgentKitLogo } from "@/shared/ui";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

export const Footer = () => {
  return (
    <footer className="relative w-full border-t border-slate-200 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="flex">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200 px-6 sm:px-10 lg:px-16 pt-16 pb-12 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />

          <div className="mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-16">
              <div className="lg:col-span-5 flex flex-col items-start pr-8">
                <Link
                  href="/"
                  className="mb-6 hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <AgentKitLogo variant="dark" size="lg" />
                </Link>
                <p className="text-base text-slate-500 max-w-md leading-relaxed mb-8 font-medium">
                  The mission-critical AI agent orchestration platform. Connect, deploy, and scale
                  multi-agent systems to automate complex business workflows with precision and
                  reliability.
                </p>

                <div className="flex items-center gap-4">
                  <SocialIcon href="https://twitter.com" icon="x" />
                  <SocialIcon href="https://linkedin.com" icon="linkedin" />
                  <SocialIcon href="https://github.com" icon="github" />
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-4">
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-[0.15em] mb-6">
                    Product
                  </h4>
                  <ul className="space-y-3">
                    <FooterLink href="/agents">Agents</FooterLink>
                    <FooterLink href="/pricing">Pricing</FooterLink>
                  </ul>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-[0.15em] mb-6">
                    Support
                  </h4>
                  <ul className="space-y-3">
                    <FooterLink href="/contact">Contact Us</FooterLink>
                  </ul>
                </div>

                <div className="flex flex-col col-span-2 md:col-span-1">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-[0.15em] mb-6">
                    Legal
                  </h4>
                  <ul className="space-y-3">
                    <FooterLink href="/privacy">Privacy Policy</FooterLink>
                    <FooterLink href="/terms">Terms of Service</FooterLink>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <p className="text-sm text-slate-400 font-medium">
                  © {new Date().getFullYear()} AgentKit. Built for the future of decentralized
                  intelligence.
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                  <div className="relative flex size-2">
                    <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <div className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.05em]">
                    All Systems Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-medium block w-fit"
    >
      {children}
    </Link>
  </li>
);

interface SocialIconProps {
  href: string;
  icon: "x" | "linkedin" | "github";
}

const SocialIcon = ({ href, icon }: SocialIconProps) => {
  const IconComponent = {
    x: XIcon,
    linkedin: LinkedInIcon,
    github: GitHubIcon,
  }[icon];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 group active:scale-95"
    >
      <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
    </Link>
  );
};
