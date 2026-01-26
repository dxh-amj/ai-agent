"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { AgentCard } from "./components/AgentCard";
import { useAgentsData } from "./hooks";

import type { Category } from "./types";

const categories: Category[] = ["All", "Sales", "Support", "Marketing", "Operations", "Analytics"];

// Simplified static layout

export const DashboardAgentsPage = () => {
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
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto py-8 px-4 sm:px-6">
      {/* Simple Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Agent Marketplace</h1>
          <p className="text-sm text-slate-500 font-medium">
            Discover and deploy specialized AI agents.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative group">
            <Input
              type="text"
              placeholder="Search agents..."
              className="h-10 pl-10 pr-4 bg-slate-50 border-transparent focus:bg-white focus:ring-slate-200 transition-all duration-300 rounded-lg w-full sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute left-3 top-0 bottom-0 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 uppercase tracking-widest ${
                  category === cat
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 mb-6 rotate-3">
            <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No agents found</h3>
          <p className="text-slate-500 max-w-[300px] mb-8">
            We couldn&apos;t find any agents matching &quot;{search}&quot;. Try adjusting your
            search or filters.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="rounded-full px-8"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};
