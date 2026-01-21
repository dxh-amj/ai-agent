import type { ResponseMetadata } from "@/shared/types";

interface VerifyEmailDTO {
  email: string;
  code: string;
  type: string;
}

interface ResendVerifyEmailDTO {
  email: string;
  type: string;
}

interface VerifyEmailResponse extends ResponseMetadata {
  data: string;
}

export type { ResendVerifyEmailDTO, VerifyEmailDTO, VerifyEmailResponse };
