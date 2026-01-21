import type { ReactNode } from "react";

export interface LoginFormProps {
  title?: string;
  subtitle?: ReactNode;
  subtext?: ReactNode;
}

export interface RegisterFormProps {
  title?: string;
  subtitle?: ReactNode;
  subtext?: ReactNode;
}

export interface SocialButtonsProps {
  title?: string;
}
