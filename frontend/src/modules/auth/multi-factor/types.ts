import type { ResponseMetadata, UserProfile } from "@/shared/types";

interface MFAVerifyDTO {
  code: string;
  mfaToken: string;
}

interface MFAVerifyResponse extends ResponseMetadata {
  tokens: {
    access: string;
    refresh: string;
  };
  user: UserProfile;
}

interface MFAFormValues {
  code: string;
}

export type { MFAFormValues, MFAVerifyDTO, MFAVerifyResponse };
