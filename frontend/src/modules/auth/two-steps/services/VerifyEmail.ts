import { handleApiError } from "@/utils";
import { axios } from "@/utils/axios";

import type { VerifyEmailDTO } from "../types";

const VERIFY_EMAIL_URL = "/api/auth/v1/verify-email/";

export const verifyEmail = async (data: VerifyEmailDTO): Promise<void> => {
  try {
    const response = await axios.post(VERIFY_EMAIL_URL, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
