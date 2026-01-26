import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  activeAgents: number;
  messagesSent: number;
  timeSavedHours: number;
  efficiencyGain: number;
}

export interface RecentActivity {
  id: string;
  type: "agent_run" | "agent_deployed" | "integration_connected";
  title: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

export interface WelcomeData {
  userName: string;
  credits: number;
  plan: string;
}

export interface DashboardData {
  stats: DashboardStats;
  activities: RecentActivity[];
  welcome: WelcomeData;
}

const mockDashboardData: DashboardData = {
  welcome: {
    userName: "Alex",
    credits: 1250,
    plan: "Pro Plan",
  },
  stats: {
    activeAgents: 4,
    messagesSent: 1240,
    timeSavedHours: 42,
    efficiencyGain: 28,
  },
  activities: [
    {
      id: "1",
      type: "agent_run",
      title: "Email Agent processed 15 drafts",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "success",
    },
    {
      id: "2",
      type: "agent_deployed",
      title: "New Sales Agent deployed to Support",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: "success",
    },
    {
      id: "3",
      type: "integration_connected",
      title: "Gmail integration re-authenticated",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      status: "success",
    },
    {
      id: "4",
      type: "agent_run",
      title: "CRM Sync Agent failed to update 2 records",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      status: "failed",
    },
  ],
};

export const getDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockDashboardData;
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: getDashboardData,
  });
};
