"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { useTwoSteps } from "./hooks";
import { useResendVerifyEmail } from "./services/ResendVerifyEmail";

const TwoStepsForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const { mutate: resendMutate, isPending: isResendLoading } = useResendVerifyEmail();

  const { handleVerifyEmail, isLoading, otp, setOtp } = useTwoSteps(email);

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [coolDown, setCoolDown] = useState(0);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Update the main otp state
    const otpString = newOtpValues.join("");
    setOtp(otpString);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }

    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (otp.length === 6) {
      handleVerifyEmail();
    }
  };

  const onResend = () => {
    if (email) {
      resendMutate({ email, type: "email_otp" });
      setCoolDown(60); // 60 seconds cooldown

      // Start countdown
      const timer = setInterval(() => {
        setCoolDown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Enter your 6-digit security code
        </label>
        <div className="flex space-x-2 justify-center">
          {otpValues.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          ))}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={onSubmit}
        disabled={isLoading || otp.length !== 6}
      >
        {isLoading ? "Verifying..." : "Verify My Account"}
      </Button>

      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-gray-600">Didn't get the code?</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResend}
          disabled={isResendLoading || coolDown > 0}
          className="text-primary hover:text-primary-dark p-0 h-auto font-medium"
        >
          {isResendLoading
            ? "Sending..."
            : coolDown > 0
            ? `Resend in ${formatTime(coolDown)}`
            : "Resend"}
        </Button>
      </div>
    </div>
  );
};

export { TwoStepsForm };
