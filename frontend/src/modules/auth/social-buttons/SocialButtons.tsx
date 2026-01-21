"use client";

import { SocialButton } from "@/shared/ui";

import type { SocialButtonsProps } from "../types";

export const SocialButtons = ({ title = "Sign in with" }: SocialButtonsProps) => {
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login clicked");
  };

  const handleLinkedInLogin = () => {
    // TODO: Implement LinkedIn OAuth
    console.log("LinkedIn login clicked");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <SocialButton provider="google" title={title} onClick={handleGoogleLogin} />
      <SocialButton provider="linkedin" title={title} onClick={handleLinkedInLogin} />
    </div>
  );
};
