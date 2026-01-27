import type { Agent } from "../types";
import type { QueryConfig } from "@/utils/reactQuery";

export interface UseAgentsOptions {
  enabled?: boolean;
  config?: QueryConfig<() => Promise<Agent[]>>;
}

export interface UseAgentBySlugOptions {
  slug: string;
  enabled?: boolean;
  config?: QueryConfig<(slug: string) => Promise<Agent | null>>;
}
