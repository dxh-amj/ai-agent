import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { handleApiError } from "@/utils";
import { axios } from "@/utils/axios";

import type { ResendVerifyEmailDTO } from "../types";

const RESEND_VERIFY_EMAIL_URL = "/api/auth/v1/resend-verify-email/";

const resendVerifyEmail = async (data: ResendVerifyEmailDTO): Promise<void> => {
  try {
    const response = await axios.post(RESEND_VERIFY_EMAIL_URL, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

export const useResendVerifyEmail = () => {
  return useMutation({
    mutationFn: resendVerifyEmail,
    onSuccess: () => {
      toast.success("Verification code sent to your email!");
    },
    onError: () => {
      toast.error("Failed to send verification code. Please try again.");
    },
  });
};
