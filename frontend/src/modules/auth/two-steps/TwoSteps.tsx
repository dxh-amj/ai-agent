"use client";

import { useSearchParams } from "next/navigation";

import { CustomFormLabel } from "@devxhub/form-elements";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import OTPInput from "react-otp-input";

import { Button } from "@/shared/ui/button";

import { useTwoSteps } from "./hooks";
import { useResendVerifyEmail } from "./services/ResendVerifyEmail";

import { useResendMail } from "@/shared/hooks";
import type { ResendVerifyEmailDTO } from "./types";

const TwoSteps = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const { mutate } = useResendVerifyEmail();
  const valuesFormatter = (email: string): ResendVerifyEmailDTO => ({ email, type: "email_otp" });

  const { handleVerifyEmail, isLoading, otp, setOtp } = useTwoSteps(email);

  const {
    coolDown,
    handleResendEmail,
    isLoading: isResendMailLoading,
    isCoolDownActive,
    formatTime,
  } = useResendMail(email, mutate, valuesFormatter);

  const onSubmit = () => {
    handleVerifyEmail();
  };

  const onResend = () => {
    handleResendEmail();
  };

  return (
    <Box mt={4}>
      <Stack mb={3}>
        <CustomFormLabel htmlFor="code">Type your 6 digits security code </CustomFormLabel>
        <Stack spacing={4} direction="row">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType="number"
            inputStyle="otpInputField"
            containerStyle="otpInputContainer"
            renderInput={(props) => (
              <input
                {...props}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSubmit();
                  }
                }}
              />
            )}
          />
        </Stack>
      </Stack>
      <Button size="lg" className="w-full" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify My Account"}
      </Button>

      <Stack direction="row" display="flex" alignItems="center" mt={3}>
        <Typography color="textSecondary" variant="h6" fontWeight="400">
          Didn&apos;t get the code?
        </Typography>
        <Button
          variant="ghost"
          size="default"
          onClick={onResend}
          disabled={isResendMailLoading || isCoolDownActive}
          className="bg-transparent hover:bg-transparent text-primary hover:text-primary font-medium p-0 min-w-[60px]"
        >
          {isResendMailLoading || isCoolDownActive
            ? !isLoading
              ? `Resend in ${formatTime(coolDown)}`
              : "Sending..."
            : "Resend"}
        </Button>
      </Stack>
    </Box>
  );
};

export { TwoSteps };
