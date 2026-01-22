import { recaptchaService } from "@/utils";
import { axios } from "@/utils/axios";
import { handleApiError } from "@/utils/handleApiError";

const FORGOT_PASSWORD_URL = "/api/auth/v1/forgot-password/";

const sendForgotPasswordEmail = async (email: string): Promise<void> => {
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

    await axios.post(
      FORGOT_PASSWORD_URL,
      {
        email,
      },
      config
    );
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

export { sendForgotPasswordEmail };
