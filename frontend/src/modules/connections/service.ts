import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { Connection, Provider } from "./types";

// Available Platforms
export const AVAILABLE_PLATFORMS: Array<{
  provider: Provider;
  name: string;
  icon: string;
  description: string;
}> = [
  {
    provider: "facebook",
    name: "Facebook",
    icon: "brand-facebook",
    description: "Connect your Facebook Page",
  },
  {
    provider: "messenger",
    name: "Messenger",
    icon: "brand-messenger",
    description: "Connect Messenger accounts",
  },
  {
    provider: "whatsapp",
    name: "WhatsApp",
    icon: "brand-whatsapp",
    description: "Connect WhatsApp Business",
  },
  {
    provider: "telegram",
    name: "Telegram",
    icon: "brand-telegram",
    description: "Connect Telegram Bots",
  },
  {
    provider: "instagram",
    name: "Instagram",
    icon: "brand-instagram",
    description: "Connect Instagram accounts",
  },
];

// Mock Data - Initially empty
let MOCK_ACTIVE_CONNECTIONS: Connection[] = [];

// Mock API Calls
const fetchConnections = async (): Promise<Connection[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_ACTIVE_CONNECTIONS;
};

const addConnectionApi = async (provider: Provider): Promise<Connection> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const platform = AVAILABLE_PLATFORMS.find((p) => p.provider === provider);
  if (!platform) throw new Error("Invalid provider");

  // Generate random mock account
  const accountId = Math.random().toString(36).substr(2, 5).toUpperCase();
  const accountNames = [
    "Business Page",
    "Support Bot",
    "Sales Channel",
    "Main Account",
    "Test Account",
  ];
  const randomName = accountNames[Math.floor(Math.random() * accountNames.length)];

  const newConnection: Connection = {
    id: accountId,
    provider,
    name: platform.name,
    description: platform.description,
    icon: platform.icon,
    isConnected: true,
    connectedAt: new Date().toISOString(),
    accountName: `${randomName} (${accountId})`,
  };

  MOCK_ACTIVE_CONNECTIONS.push(newConnection);
  return newConnection;
};

const deleteConnectionApi = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  MOCK_ACTIVE_CONNECTIONS = MOCK_ACTIVE_CONNECTIONS.filter((c) => c.id !== id);
};

export const useConnections = () => {
  return useQuery({
    queryKey: ["connections"],
    queryFn: fetchConnections,
  });
};

export const useAddConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addConnectionApi,
    onSuccess: (newConnection) => {
      toast.success(`Connected to ${newConnection.accountName}`);
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    },
    onError: () => {
      toast.error("Failed to connect");
    },
  });
};

export const useDeleteConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConnectionApi,
    onSuccess: () => {
      toast.success("Disconnected successfully");
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    },
    onError: () => {
      toast.error("Failed to disconnect");
    },
  });
};
