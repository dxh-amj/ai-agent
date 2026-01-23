"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { verifyEmail } from "./services/VerifyEmail";

import type { VerifyEmailDTO } from "./types";

export const useTwoSteps = (email: string) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyEmail = async () => {
    if (!email || !otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const data: VerifyEmailDTO = {
        email,
        otp,
        type: "email_otp"
      };

      await verifyEmail(data);

      toast.success("Email verified successfully!");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    otp,
    setOtp,
    isLoading,
    handleVerifyEmail
  };
};
