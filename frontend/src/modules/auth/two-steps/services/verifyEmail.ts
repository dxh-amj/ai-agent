import { useMutation } from "@tanstack/react-query";

import { handleApiError } from "@/utils";
import { axios } from "@/utils/axios";

import type { VerifyEmailDTO, VerifyEmailResponse } from "../types";
import type { MutationConfig } from "@/utils/reactQuery";
import type { AxiosError } from "axios";

const VERIFY_EMAIL_URL = "/api/auth/v1/verification/email/verify/";

const verifyEmail = async (data: VerifyEmailDTO): Promise<VerifyEmailResponse> => {
  try {
    const response = await axios.post(VERIFY_EMAIL_URL, data);
    return response.data;
  } catch (error) {
    console.error("Email verification error", error);
    handleApiError(error);
    throw error;
  }
};

type UseVerifyEmailOptions = {
  config?: MutationConfig<typeof verifyEmail>;
};

const useVerifyEmail = ({ config }: UseVerifyEmailOptions = {}) => {
  return useMutation<VerifyEmailResponse, AxiosError, VerifyEmailDTO>({
    mutationFn: verifyEmail,
    ...config,
  });
};

export { useVerifyEmail };
