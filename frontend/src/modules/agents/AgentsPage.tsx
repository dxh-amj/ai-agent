"use client";

import { motion } from "framer-motion";

import { Header } from "@/modules/landing";
import { Footer } from "@/shared/components/layout/Footer";
import { Button } from "@/shared/ui/button";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";
import { Input } from "@/shared/ui/input";

import { AgentCard } from "./components/AgentCard";
import { useAgentsData } from "./hooks";

import type { Category } from "./types";

const categories: Category[] = ["All", "Sales", "Support", "Marketing", "Operations", "Analytics"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Workaround for React 19 types compatibility with framer-motion v10
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

export const AgentsPage = () => {
  const {
    agents: filteredAgents,
    isLoading,
    search,
    setSearch,
    category,
    setCategory,
  } = useAgentsData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-page-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-background">
      <Header />

      {/* Hero Section */}
      <div className="relative border-b border-slate-200 bg-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <DecorativeStripes />
          <DecorativeStripesRight />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-primary mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              AI Workforce Marketplace
            </MotionDiv>

            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-6"
            >
              Your new
              <span className="block mt-2 bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-600">
                AI Workforce
              </span>
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 leading-relaxed mb-10"
            >
              Deploy specialized AI agents to automate your sales, support, and operations.
              <br className="hidden sm:block" />
              Ready to work 24/7 with zero downtime.
            </MotionP>

            {/* Search Bar */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-violet-600/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search by role, skill, or name..."
                    className="h-14 pl-12 pr-4 rounded-xl bg-white border-slate-200 w-full text-base shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="absolute left-4 top-0 bottom-0 flex items-center text-slate-400">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                </div>
              </div>
            </MotionDiv>

            {/* Filter Categories */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    category === cat
                      ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <MotionDiv
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10"
          >
            {filteredAgents.map((agent) => (
              <MotionDiv key={agent.id} variants={item}>
                <AgentCard agent={agent} isPublic />
              </MotionDiv>
            ))}
          </MotionDiv>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 mb-6">
                <span className="material-symbols-outlined text-4xl text-slate-300">
                  search_off
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No agents found</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-8">
                We couldn&apos;t find any agents matching your search criteria. Try using different
                keywords or clearing your filters.
              </p>
              <Button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-primary"
              >
                Clear all filters
              </Button>
            </MotionDiv>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
