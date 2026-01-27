import { useQuery } from "@tanstack/react-query";

import { delay } from "@/utils/delay";

import { agentsMockData } from "./getAgents";

import type { Agent } from "../types";
import type { UseAgentBySlugOptions } from "./types";

const DELAY_MS = 500;

export const getAgentBySlug = async (slug: string): Promise<Agent | null> => {
  await delay(DELAY_MS);
  const agent = agentsMockData.find((a) => a.slug === slug);
  return agent || null;
};

export const useAgentBySlug = ({ slug, enabled = true, config }: UseAgentBySlugOptions) => {
  return useQuery<Agent | null, Error>({
    queryKey: ["agent", slug],
    queryFn: () => getAgentBySlug(slug),
    enabled: enabled && !!slug,
    ...config,
  });
};
