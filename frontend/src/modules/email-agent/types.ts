import type { ConnectedAccount } from "@/services/email-agent";

export type { ConnectedAccount };

export interface EmailContextValues {
  context: string;
}

export interface SendEmailPayload {
  accountId: string;
  context: string;
}

export interface EmailAgentState {
  currentStep: number;
  selectedAccountId: string | null;
}
