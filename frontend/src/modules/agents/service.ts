import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { delay } from "@/utils/delay";

import type { Agent } from "./types";

// Mock data - will be replaced with API call
const agentsMockData: Agent[] = [
  {
    id: "email-agent",
    slug: "email-connector",
    name: "Email Agent",
    icon: "mail",
    imageUrl: "/images/agents/email-agent.png",
    role: "Communication Specialist",
    category: "Marketing",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    tags: ["Email", "Automation", "Gmail"],
    price: "$29",
    billingPeriod: "monthly",
    capabilities: [
      "Gmail Integration",
      "Context-aware composition",
      "Multi-account management",
      "Draft & Send",
    ],
    description: "Connect your Gmail accounts and let AI handle your email communications.",
    longDescription:
      "The Email Agent streamlines your communication by connecting directly to your Gmail accounts. Provide a simple context, and it will draft and send professional emails on your behalf, managing multiple accounts seamlessly.",
    mockChat: [],
  },
  {
    id: "sales",
    slug: "sales-agent",
    name: "Sales Agent",
    icon: "trending_up",
    imageUrl: "/images/agents/sales-agent.png",
    role: "Lead Qualification Specialist",
    category: "Sales",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    tags: ["CRM", "Automation", "B2B"],
    price: "$49",
    billingPeriod: "monthly",
    capabilities: [
      "Lead qualification",
      "Follow-up automation",
      "Sales insights",
      "Pipeline management",
      "Meeting scheduling",
    ],
    description: "Qualify leads, automate follow-ups, and get AI-driven sales recommendations.",
    longDescription:
      "The Sales Agent is your 24/7 SDR, capable of engaging with leads instantly, qualifying them based on your specific criteria, and scheduling meetings for your closers. It monitors your pipeline, suggests the next best action, and ensures no lead is left behind.",
    mockChat: [
      {
        role: "user",
        content: "I have a new lead, John from Acme Corp, interested in the enterprise plan.",
      },
      {
        role: "assistant",
        content:
          "I've analyzed Acme Corp. They have 500+ employees and recently raised Series B. I'll draft an outreach email highlighting our enterprise security features and propose a demo time for next Tuesday.",
      },
      { role: "user", content: "That sounds perfect. Send it." },
      {
        role: "assistant",
        content:
          "Sent. I've also added a reminder to follow up in 2 days if there's no response. I've updated the CRM status to 'Contacted'.",
      },
    ],
  },
  {
    id: "support",
    slug: "call-agent",
    name: "Call Agent",
    icon: "call",
    imageUrl: "/images/agents/call-agent.png",
    role: "Voice Support Representative",
    category: "Support",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    tags: ["Voice AI", "24/7", "Multilingual"],
    price: "$99",
    billingPeriod: "monthly",
    capabilities: [
      "Voice AI calls",
      "Call transcription",
      "Intent detection",
      "Real-time translation",
      "Sentiment analysis",
    ],
    description: "Handle inbound & outbound calls with AI voice, transcription, and smart routing.",
    longDescription:
      "Transform your phone support with an AI agent that sounds natural and resolves issues instantly. The Call Agent handles high volumes of concurrent calls, transcribes conversations in real-time, and routes complex issues to human agents with full context.",
    mockChat: [
      { role: "user", content: "Incoming call from +1 (555) 0123-4567" },
      {
        role: "assistant",
        content:
          "Answering... 'Hello, thanks for calling AI Workforce Hub. How can I help you today?'",
      },
      { role: "user", content: "User: I need to update my billing address." },
      {
        role: "assistant",
        content:
          "I can help with that. I've pulled up your account. Could you please confirm the last 4 digits of the card on file?",
      },
    ],
  },
  {
    id: "crm",
    slug: "crm-agent",
    name: "CRM Agent",
    icon: "database",
    imageUrl: "/images/agents/crm-agent.png",
    role: "Data Integrity Manager",
    category: "Operations",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    tags: ["Data Sync", "Integration", "Real-time"],
    price: "$39",
    billingPeriod: "monthly",
    capabilities: [
      "Contact management",
      "Deal tracking",
      "Data sync",
      "Duplicate detection",
      "Enrichment",
    ],
    description: "Central customer data hub that syncs across all your agents automatically.",
    longDescription:
      "Stop manual data entry. The CRM Agent ensures your customer data is always accurate and up-to-date. It automatically logs interactions from other agents, enriches profiles with public data, and keeps your team aligned with a single source of truth.",
    mockChat: [
      { role: "user", content: "Update the deal value for TechStart to $50k." },
      {
        role: "assistant",
        content:
          "Done. I've updated the TechStart deal value to $50,000. I also noticed their contract renewal is in 30 days. Should I alert the account manager?",
      },
      { role: "user", content: "Yes, please." },
      {
        role: "assistant",
        content: "Alert sent. I've also generated a renewal report for their review.",
      },
    ],
  },
  {
    id: "marketing",
    slug: "marketing-agent",
    name: "Marketing Agent",
    icon: "campaign",
    imageUrl: "/images/agents/marketing-agent.png",
    role: "Campaign Manager",
    category: "Marketing",
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    tags: ["Multi-channel", "Content AI", "Analytics"],
    price: "$59",
    billingPeriod: "monthly",
    capabilities: [
      "Email campaigns",
      "Social planning",
      "Content AI",
      "A/B testing",
      "Audience segmentation",
    ],
    description: "Plan and execute multi-channel marketing campaigns with AI assistance.",
    longDescription:
      "Scale your marketing efforts with an agent that understands your brand voice. The Marketing Agent designs, writes, and schedules campaigns across email and social media. It continuously analyzes performance and optimizes content for better engagement.",
    mockChat: [
      { role: "user", content: "Draft a tweet about our new feature launch." },
      {
        role: "assistant",
        content:
          "Here are 3 variations:\n1. 🚀 It's here! Introducing Smart Workflows context-aware automation for your business.\n2. Stop doing busy work. Start using Smart Workflows. Available now.\n3. Big news! 📣 Smart Workflows just landed. See how much time you can save.\n\nWhich tone do you prefer?",
      },
      { role: "user", content: "Let's go with option 1." },
      {
        role: "assistant",
        content:
          "Great choice. I'll schedule it for 9:00 AM tomorrow when your audience is most active.",
      },
    ],
  },
  {
    id: "analytics",
    slug: "analytics-agent",
    name: "Analytics Agent",
    icon: "insights",
    imageUrl: "/images/agents/analytics-agent.png",
    role: "Business Intelligence Analyst",
    category: "Analytics",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    tags: ["BI", "Predictions", "Dashboards"],
    price: "$69",
    billingPeriod: "monthly",
    capabilities: [
      "KPI dashboards",
      "Predictions",
      "Performance tracking",
      "Custom reporting",
      "Trend analysis",
    ],
    description: "Get AI-driven insights, predictions, and real-time performance metrics.",
    longDescription:
      "Make data-backed decisions without the headache. The Analytics Agent connects to all your data sources, builds dynamic dashboards, and pushes proactive alerts when key metrics trend up or down. Ask it questions in plain English and get visual answers.",
    mockChat: [
      { role: "user", content: "Why did our conversion rate drop yesterday?" },
      {
        role: "assistant",
        content:
          "I noticed a spike in server latency between 2 PM and 4 PM, which correlated with the drop in sign-ups. Traffic sources remained stable. I recommend checking the server logs for that window.",
      },
      { role: "user", content: "Generate a weekly performance report." },
      {
        role: "assistant",
        content:
          "Generating report... Done. Key highlights: leads up 15%, CAC down 5%. I've emailed the full PDF to you and the executive team.",
      },
    ],
  },
];

const DELAY_MS = 500;

const getAgents = async (): Promise<Agent[]> => {
  // Simulate API delay - replace with actual API call
  await delay(DELAY_MS);
  return [...agentsMockData];
};

const getAgentBySlug = async (slug: string): Promise<Agent | null> => {
  await delay(DELAY_MS);
  const agent = agentsMockData.find((a) => a.slug === slug);
  return agent || null;
};

interface UseAgentsOptions {
  enabled?: boolean;
}

export const useAgents = ({ enabled = true }: UseAgentsOptions = {}) => {
  return useQuery<Agent[], Error>({
    queryKey: ["agents"],
    queryFn: getAgents,
    placeholderData: keepPreviousData,
    enabled,
  });
};

interface UseAgentBySlugOptions {
  slug: string;
  enabled?: boolean;
}

export const useAgentBySlug = ({ slug, enabled = true }: UseAgentBySlugOptions) => {
  return useQuery<Agent | null, Error>({
    queryKey: ["agent", slug],
    queryFn: () => getAgentBySlug(slug),
    enabled: enabled && !!slug,
  });
};
