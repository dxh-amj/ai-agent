"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { sendForgotPasswordEmail } from "./service";

const useForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (email: string) => {
    setIsSubmitting(true);
    try {
      await sendForgotPasswordEmail(email);
      toast.success("Password reset link sent to your email.");
      router.push("/auth/login");
    } catch {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleForgotPassword, isSubmitting };
};

export { useForgotPassword };
