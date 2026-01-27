import { useMemo, useState } from "react";

import { useAgentBySlug } from "./services/getAgentBySlug";
import { useAgents } from "./services/getAgents";
import { filterAgents } from "./utils";

import type { Category, FilterType } from "./types";

export const useAgentsData = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const { data: agents = [], isLoading, refetch } = useAgents();

  const filters: FilterType = useMemo(() => ({ search, category }), [search, category]);

  const filteredAgents = useMemo(() => {
    return filterAgents(agents, filters);
  }, [agents, filters]);

  return {
    agents: filteredAgents,
    isLoading,
    refetch,
    search,
    setSearch,
    category,
    setCategory,
  };
};

export const useAgentDetail = (slug: string) => {
  const { data: agent, isLoading, error } = useAgentBySlug({ slug });

  return {
    agent,
    isLoading,
    error,
  };
};
