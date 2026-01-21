import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { useVerifyEmail } from "./services/verifyEmail";

import type { VerifyEmailDTO } from "./types";

export const useTwoSteps = (email: string) => {
  const router = useRouter();

  const { mutate, isPending } = useVerifyEmail();

  const [isDisabled, setIsDisabled] = useState(false);
  const [otp, setOtp] = useState("");

  const handleVerifyEmail = () => {
    const OTP_LENGTH = 6;
    if (otp.length < OTP_LENGTH) {
      toast.error("please enter a valid 6 digit OTP");
      return;
    }

    const values: VerifyEmailDTO = {
      email,
      code: otp,
      type: "email_otp",
    };

    mutate(values, {
      onSuccess: () => {
        setOtp("");
        toast.success("email verification has been successfully done.");
        router.push(`/auth/login`);
        setIsDisabled(true);
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  };

  return {
    handleVerifyEmail,
    isLoading: isPending || isDisabled,
    otp,
    setOtp,
  };
};
