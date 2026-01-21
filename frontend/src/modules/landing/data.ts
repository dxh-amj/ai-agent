// Data for landing page components
export const agents = [
  {
    id: "sales",
    name: "Sales Agent",
    icon: "trending_up",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    capabilities: [
      "Lead qualification",
      "Follow-up automation",
      "Sales insights",
    ],
    description:
      "Qualify leads, automate follow-ups, and get AI-driven sales recommendations.",
  },
  {
    id: "support",
    name: "Call Agent",
    icon: "call",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    capabilities: ["Voice AI calls", "Call transcription", "Intent detection"],
    description:
      "Handle inbound & outbound calls with AI voice, transcription, and smart routing.",
  },
  {
    id: "crm",
    name: "CRM Agent",
    icon: "database",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    capabilities: ["Contact management", "Deal tracking", "Data sync"],
    description:
      "Central customer data hub that syncs across all your agents automatically.",
  },
  {
    id: "marketing",
    name: "Marketing Agent",
    icon: "campaign",
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    capabilities: ["Email campaigns", "Social planning", "Content AI"],
    description:
      "Plan and execute multi-channel marketing campaigns with AI assistance.",
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    icon: "insights",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    capabilities: ["KPI dashboards", "Predictions", "Performance tracking"],
    description:
      "Get AI-driven insights, predictions, and real-time performance metrics.",
  },
];

export const integrations = [
  { name: "Slack", logo: "/logos/slack.png" },
  { name: "Zendesk", logo: "/logos/zendesk.png" },
  { name: "Salesforce", logo: "/logos/salesforce.png" },
  { name: "HubSpot", logo: "/logos/hubspot.png" },
  { name: "Intercom", logo: "/logos/intercom.svg" },
  { name: "Twilio", logo: "/logos/twilio.png" },
];

export const workflowExamples = [
  {
    trigger: "Lead Created",
    from: "Sales Agent",
    to: "CRM Agent",
    icon: "person_add",
  },
  {
    trigger: "Call Completed",
    from: "Call Agent",
    to: "Analytics Agent",
    icon: "call_end",
  },
  {
    trigger: "Campaign Sent",
    from: "Marketing Agent",
    to: "Analytics Agent",
    icon: "send",
  },
  {
    trigger: "Deal Won",
    from: "CRM Agent",
    to: "Marketing Agent",
    icon: "celebration",
  },
];

export const stats = [
  { value: "60%", label: "Cost Reduction" },
  { value: "24/7", label: "Availability" },
  { value: "10x", label: "Faster Response" },
  { value: "5", label: "AI Agents" },
];

export const targetUsers = [
  {
    title: "Startups & SMEs",
    description:
      "Scale operations without scaling headcount. Deploy AI agents that grow with you.",
    icon: "rocket_launch",
    agents: ["Sales", "Support"],
  },
  {
    title: "Enterprise Teams",
    description:
      "Orchestrate multiple departments with AI agents that collaborate seamlessly.",
    icon: "corporate_fare",
    agents: ["All 5 Agents"],
  },
  {
    title: "SaaS Platforms",
    description:
      "Embed intelligent agents directly into your product for enhanced UX.",
    icon: "cloud",
    agents: ["Support", "Analytics"],
  },
];

export type Agent = (typeof agents)[number];
export type Integration = (typeof integrations)[number];
export type WorkflowExample = (typeof workflowExamples)[number];
export type Stat = (typeof stats)[number];
export type TargetUser = (typeof targetUsers)[number];
