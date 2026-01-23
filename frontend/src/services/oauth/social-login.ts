import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

import { axios } from "@/utils/axios";
import { ASSESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { handleApiError } from "@/utils";
import { toCamelCase } from "@/utils";

import type { SocialLoginDTO } from "@/modules/oauth/types";
import type { LoginResponse } from "@/shared/types";
import type { MutationConfig } from "@/utils/reactQuery";
import type { AxiosError } from "axios";
import type { OptionsType } from "cookies-next";

const SOCIAL_LOGIN_URL = (platform: string) => `/api/users/v1/social/${platform}/`;

const socialLogin = async (data: SocialLoginDTO): Promise<LoginResponse> => {
  const { platform, code } = data;

  console.log("Social login attempt:", { platform, code: code.substring(0, 20) + "..." });

  try {
    const url = SOCIAL_LOGIN_URL(platform);
    console.log("Making request to:", url);
    console.log("Request payload:", { code });

    const response = await axios.post(url, { code });
    console.log("Response received:", response);

    const tokens = response.data?.tokens;
    const { access: accessToken, refresh: refreshToken } = tokens;
    const secureCookieOptions: OptionsType = {
      path: "/",
      secure: true,
      sameSite: "lax",
    };

    setCookie(REFRESH_TOKEN, refreshToken, secureCookieOptions);
    setCookie(ASSESS_TOKEN, accessToken, secureCookieOptions);

    console.log("Tokens stored successfully");
    return toCamelCase(response.data);
  } catch (error) {
    console.error("Social login error:", error);
    handleApiError(error);
    return Promise.reject(error);
  }
};

type useSocialLoginOptions = {
  config?: MutationConfig<typeof socialLogin>;
};

export const useSocialLogin = ({ config }: useSocialLoginOptions = {}) => {
  return useMutation<LoginResponse, AxiosError, SocialLoginDTO>({
    mutationFn: socialLogin,
    ...config,
  });
};

export { socialLogin };