import { useQuery } from "@tanstack/react-query";

import { agents } from "@/modules/agents/data";

import type { Agent } from "@/modules/agents/types";

export const getAgents = async (): Promise<Agent[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...agents];
};

export const useAgents = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
    placeholderData: (previousData) => previousData,
  });
};
