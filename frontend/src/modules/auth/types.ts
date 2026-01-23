import type { registerSchema } from "./register/schema";
import type { ReactNode } from "react";
import type { InferType } from "yup";

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

type Register = InferType<typeof registerSchema>;

export type RegisterDTO = Register;
