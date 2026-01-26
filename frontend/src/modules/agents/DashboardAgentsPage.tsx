"use client";

import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { AgentCard } from "./components/AgentCard";
import { agents } from "./data";

const categories = ["All", "Sales", "Support", "Marketing", "Operations", "Analytics"];

// Simplified static layout

export const DashboardAgentsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.role.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || agent.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto py-2">
      {/* Clean Header & Filters */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Agent Marketplace
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Select an agent to configure and deploy to your workforce.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search agents..."
              className="h-10 pl-10 pr-4 bg-white border-slate-200 shadow-xs focus:ring-slate-100 transition-all rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute left-3.5 top-0 bottom-0 flex items-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  category === cat
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
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

      {/* Empty State style remains... */}
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
