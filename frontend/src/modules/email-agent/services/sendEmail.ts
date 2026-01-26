import { useMutation } from "@tanstack/react-query";

import { delay } from "@/utils/delay";

import type { SendEmailPayload } from "./types";
import type { AxiosError } from "axios";

const DELAY_VERY_SLOW = 1500;

const sendEmail = async (_payload: SendEmailPayload): Promise<{ success: boolean }> => {
  await delay(DELAY_VERY_SLOW);
  // TODO: Replace with actual API call
  return { success: true };
};

export const useSendEmail = () => {
  return useMutation<{ success: boolean }, AxiosError, SendEmailPayload>({
    mutationFn: sendEmail,
  });
};
