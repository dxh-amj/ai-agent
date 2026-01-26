"use client";

import { Input } from "@/shared/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { AgentCard } from "./components/AgentCard";
import { useAgentsData } from "./hooks";

import type { Category } from "./types";

const categories: Category[] = ["All", "Sales", "Support", "Marketing", "Operations", "Analytics"];

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
      {/* Simple Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Agent Marketplace
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Discover and deploy specialized AI agents.
          </p>
        </div>

        <div className="relative group">
          <Input
            type="text"
            placeholder="Search agents..."
            className="h-10 pl-10 pr-4 bg-slate-50 dark:bg-slate-800 border-transparent dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all duration-300 rounded-lg w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute left-3 top-0 bottom-0 flex items-center text-slate-400 dark:text-slate-500">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
        </div>
      </div>

      {/* Tabs for Categories */}
      <Tabs
        defaultValue="All"
        value={category}
        onValueChange={(value) => setCategory(value as Category)}
      >
        <TabsList className="mb-6">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            {/* Grid Section */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>

            {/* Empty State */}
            {filteredAgents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-800 mb-6 rotate-3">
                  <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">
                    search_off
                  </span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  No agents found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-[300px] mb-8">
                  {search
                    ? `We couldn't find any agents matching "${search}". Try adjusting your search.`
                    : `No agents available in ${cat} category.`}
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
