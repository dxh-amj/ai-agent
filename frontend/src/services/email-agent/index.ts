import { delay } from "@/utils/delay";

export interface ConnectedAccount {
  id: string;
  email: string;
  provider: "gmail" | "outlook";
  connectedAt: string;
}

// Mock database
let connectedAccounts: ConnectedAccount[] = [
  {
    id: "1",
    email: "demo@gmail.com",
    provider: "gmail",
    connectedAt: new Date().toISOString(),
  },
];

let emailContext = "";

const DELAY_FAST = 300;
const DELAY_MEDIUM = 500;
const DELAY_SLOW = 800;
const DELAY_VERY_SLOW = 1500;

export const emailAgentService = {
  getConnectedAccounts: async (): Promise<ConnectedAccount[]> => {
    await delay(DELAY_MEDIUM);
    return [...connectedAccounts];
  },

  connectAccount: async (email: string): Promise<ConnectedAccount> => {
    await delay(DELAY_SLOW);
    const newAccount: ConnectedAccount = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      provider: "gmail",
      connectedAt: new Date().toISOString(),
    };
    connectedAccounts.push(newAccount);
    return newAccount;
  },

  disconnectAccount: async (accountId: string): Promise<void> => {
    await delay(DELAY_MEDIUM);
    connectedAccounts = connectedAccounts.filter((acc) => acc.id !== accountId);
  },

  getContext: async (): Promise<string> => {
    await delay(DELAY_FAST);
    return emailContext;
  },

  updateContext: async (context: string): Promise<string> => {
    await delay(DELAY_MEDIUM);
    emailContext = context;
    return emailContext;
  },

  sendEmail: async (accountId: string, context: string): Promise<{ success: boolean }> => {
    await delay(DELAY_VERY_SLOW);
    console.info(`[Mock Service] Sending email from account ${accountId} with context: ${context}`);
    return { success: true };
  },
};
