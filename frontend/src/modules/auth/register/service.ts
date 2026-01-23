import { handleApiError, recaptchaService, toSnakeCase } from "@/utils";
import { axios } from "@/utils/axios";

import type { UserProfileResponse } from "@/shared/types";
import type { RegisterDTO } from "./types";

const REGISTER_URL = "/api/auth/v1/register/";

const register = async (data: RegisterDTO): Promise<UserProfileResponse> => {
  try {
    let config = {};
    const payload = {
      ...toSnakeCase(data),
      company_name: "Default Company", // Hardcoded company name
    };

    if (recaptchaService.isEnabled) {
      const captchaToken = await recaptchaService.getToken();

      if (!captchaToken) {
        throw new Error("reCAPTCHA verification failed");
      }

      config = {
        headers: { "X-Captcha-Token": captchaToken },
      };
    }

    const response = await axios.post(REGISTER_URL, payload, config);

    return response.data;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

export { register };
