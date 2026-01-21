"use client";

import OTPInput from "react-otp-input";

import { useSearchParams } from "next/navigation";

import { CustomFormLabel } from "@devxhub/form-elements";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { useResendMail } from "@/shared/hooks";

import { useResendVerifyEmail } from "./services/ResendVerifyEmail";
import { useTwoSteps } from "./hooks";

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
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={onSubmit}
        loading={isLoading}
        disabled={isLoading}
      >
        Verify My Account
      </Button>

      <Stack direction="row" display="flex" alignItems="center" mt={3}>
        <Typography color="textSecondary" variant="h6" fontWeight="400">
          Didn&apos;t get the code?
        </Typography>
        <Button
          color="primary"
          variant="text"
          size="medium"
          onClick={onResend}
          loadingIndicator={!isLoading && `Resend in ${formatTime(coolDown)}`}
          loading={isResendMailLoading || isCoolDownActive}
          disabled={isResendMailLoading || isCoolDownActive}
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "500",
            padding: 0,
            whiteSpace: "nowrap",
            backgroundColor: "transparent",
            minWidth: isResendMailLoading || isCoolDownActive ? "110px" : "60px",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "transparent",
            },
          }}
        >
          Resend
        </Button>
      </Stack>
    </Box>
  );
};

export { TwoSteps };
