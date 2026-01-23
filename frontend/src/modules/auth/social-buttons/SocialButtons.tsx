"use client";

import { GoogleLogin } from "@/modules/oauth";
import { 
  GOOGLE_CLIENT_ID, 
  GOOGLE_AUTHORIZE_URL, 
  GOOGLE_REDIRECT_URI,
} from "@/config";
import { GOOGLE_SCOPE } from "@/utils/constants";

import type { SocialButtonsProps } from "../types";

export const SocialButtons = ({ title = "Continue with" }: SocialButtonsProps) => {
  return (
    <GoogleLogin
          title={title}
          authorizeUrl={GOOGLE_AUTHORIZE_URL}
          clientId={GOOGLE_CLIENT_ID}
          redirectUri={GOOGLE_REDIRECT_URI}
          scope={GOOGLE_SCOPE}
          responseType="code"
          prompt="consent"
          accessType="offline"
          state="google"
    />
  );
};
