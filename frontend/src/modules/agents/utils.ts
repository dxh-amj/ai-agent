import type { Agent, FilterType } from "./types";

export const filterAgents = (agents: Agent[], filters: FilterType): Agent[] => {
  const { search, category } = filters;

  return agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.role.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || agent.category === category;

    return matchesSearch && matchesCategory;
  });
};
