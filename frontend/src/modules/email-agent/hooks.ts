import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { emailAgentService } from "@/services/email-agent";

export const useConnectedAccounts = () => {
  return useQuery({
    queryKey: ["email-agent", "accounts"],
    queryFn: emailAgentService.getConnectedAccounts,
  });
};

export const useConnectAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => emailAgentService.connectAccount(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-agent", "accounts"] });
    },
  });
};

export const useDisconnectAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => emailAgentService.disconnectAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-agent", "accounts"] });
    },
  });
};

export const useEmailContext = () => {
  return useQuery({
    queryKey: ["email-agent", "context"],
    queryFn: emailAgentService.getContext,
  });
};

export const useUpdateContext = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (context: string) => emailAgentService.updateContext(context),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-agent", "context"] });
    },
  });
};

export const useSendEmail = () => {
  return useMutation({
    mutationFn: ({ accountId, context }: { accountId: string; context: string }) =>
      emailAgentService.sendEmail(accountId, context),
  });
};
