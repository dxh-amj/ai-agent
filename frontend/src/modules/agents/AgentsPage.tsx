"use client";

import { useState } from "react";

import { Header } from "@/modules/landing";
import { Footer } from "@/shared/components/layout/Footer";
import { Button } from "@/shared/ui/button";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";
import { Input } from "@/shared/ui/input";

import { AgentCard } from "./components/AgentCard";
import { agents } from "./data";

const categories = ["All", "Sales", "Support", "Marketing", "Operations", "Analytics"];

export const AgentsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || agent.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-page-background">
      <Header />

      {/* Hero Section */}
      <div className="border-b border-slate-200">
        <div className="flex">
          <DecorativeStripes />

          <div className="flex-1 border-x border-slate-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                <span className="material-symbols-outlined text-base">store</span>
                AI Workforce Marketplace
              </div>

              <h1 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-6">
                Discover Your Perfect
                <br />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-blue-600">
                  AI Agent
                </span>
              </h1>

              <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Specialized AI agents ready to join your team and automate your workflows today.
              </p>

              <div className="mt-10 max-w-md mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search for an agent..."
                  className="h-14 pl-12 pr-4 rounded-xl bg-slate-50 border-slate-200 w-full text-base focus:ring-2 focus:ring-primary/20 shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute left-4 top-0 bottom-0 flex items-center text-slate-400">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className={`rounded-full px-6 py-2 transition-all duration-300 ${
                      category === cat
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        : "bg-white/50 backdrop-blur-sm border-slate-200 text-slate-600 hover:bg-white hover:text-primary hover:border-primary/20"
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DecorativeStripesRight />
        </div>
      </div>

      {/* Grid */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="flex">
          <DecorativeStripes />

          <div className="flex-1 border-x border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>

              {filteredAgents.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                    <span className="material-symbols-outlined text-3xl text-slate-400">
                      search_off
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No agents found</h3>
                  <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
                  <Button
                    variant="link"
                    className="mt-4 text-primary"
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          <DecorativeStripesRight />
        </div>
      </div>

      <Footer />
    </div>
  );
};
