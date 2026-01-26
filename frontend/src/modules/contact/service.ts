import { useMutation } from "@tanstack/react-query";

import { handleApiError, recaptchaService } from "@/utils";
import { axios } from "@/utils/axios";

import type { MutationConfig } from "@/utils/reactQuery";
import type { AxiosError } from "axios";

export interface ContactDTO {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

const CONTACT_URL = "/api/v1/contact/";

const sendContactMessage = async (data: ContactDTO): Promise<ContactResponse | null> => {
  try {
    let config = {};

    if (recaptchaService.isEnabled) {
      const captchaToken = await recaptchaService.getToken();

      if (!captchaToken) {
        throw new Error("reCAPTCHA verification failed");
      }

      config = {
        headers: { "X-Captcha-Token": captchaToken },
      };
    }

    const response = await axios.post(CONTACT_URL, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

type SendContactMessageOptions = {
  config?: MutationConfig<typeof sendContactMessage>;
};

const useSendContactMessage = ({ config }: SendContactMessageOptions = {}) => {
  return useMutation<ContactResponse | null, AxiosError, ContactDTO>({
    mutationFn: sendContactMessage,
    ...config,
  });
};

export { sendContactMessage, useSendContactMessage };

