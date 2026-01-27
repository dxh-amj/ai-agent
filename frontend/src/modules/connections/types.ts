export type Provider = "facebook" | "messenger" | "whatsapp" | "telegram" | "instagram";

export interface Connection {
  id: string;
  provider: Provider;
  name: string;
  description: string;
  icon: string; // URL or icon name
  isConnected: boolean;
  connectedAt?: string;
  accountName?: string;
}
