import { RECAPTCHA_ENABLED, RECAPTCHA_KEY } from "@/config";

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (cb: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export const recaptchaService = {
  isEnabled: RECAPTCHA_ENABLED,

  getToken: async () => {
    if (!RECAPTCHA_ENABLED || !RECAPTCHA_KEY) {
      return null;
    }

    if (typeof window !== "undefined" && window.grecaptcha) {
      return new Promise<string | null>((resolve) => {
        window.grecaptcha.enterprise.ready(async () => {
          const siteKey = RECAPTCHA_KEY;
          if (!siteKey) {
            resolve(null);
            return;
          }
          try {
            const token = await window.grecaptcha.enterprise.execute(siteKey, {
              action: "contact",
            });
            resolve(token);
          } catch (error) {
            resolve(null);
          }
        });
      });
    }

    return null;
  },
};
