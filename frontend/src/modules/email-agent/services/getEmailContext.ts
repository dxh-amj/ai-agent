import { useQuery } from "@tanstack/react-query";

import { delay } from "@/utils/delay";

const DELAY_FAST = 300;

// Mock database - will be replaced with API calls
let emailContext = "";

export const getEmailContextData = () => emailContext;
export const setEmailContextData = (context: string) => {
  emailContext = context;
};

const getContext = async (): Promise<string> => {
  await delay(DELAY_FAST);
  return emailContext;
};

interface UseEmailContextOptions {
  enabled?: boolean;
}

export const useEmailContext = ({ enabled = true }: UseEmailContextOptions = {}) => {
  return useQuery<string, Error>({
    queryKey: ["email-agent", "context"],
    queryFn: getContext,
    enabled,
  });
};
