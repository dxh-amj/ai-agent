import type { Agent as LandingAgent } from "@/modules/landing/data";

export interface Agent extends LandingAgent {
  slug: string;
  role: string;
  longDescription: string;
  tags: string[];
  mockChat: Array<{
    role: "user" | "assistant" | "agent";
    content: string;
  }>;
  category: "Sales" | "Support" | "Operations" | "Marketing" | "Analytics";
  // Visual properties
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  imageUrl?: string;
  // Pricing
  price: string;
  billingPeriod: "monthly" | "one-time";
}

export type Category = "All" | Agent["category"];

export interface FilterType {
  search: string;
  category: Category;
}
