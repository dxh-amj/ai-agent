"use client";

import { useSearchParams } from "next/navigation";

import { CustomFormLabel, CustomTextField } from "@devxhub/form-elements";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";

import { useMFA } from "./hooks";
import { MFASchema } from "./schema";

import type { MFAFormValues } from "./types";

const MultiFactor = () => {
  const searchParams = useSearchParams();
  const mfaToken = searchParams.get("token") as string;
  const mfaType = searchParams.get("type") ?? "totp";
  const phoneNumber = searchParams.get("phone") ?? "";

  const { handleVerifyMFA, isLoading } = useMFA(mfaToken);

  const formik = useFormik<MFAFormValues>({
    initialValues: {
      code: "",
    },
    validationSchema: MFASchema,
    onSubmit: (values, actions) => {
      handleVerifyMFA(values, actions);
    },
  });

  return (
    <Box mt={4}>
      <form onSubmit={formik.handleSubmit}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">
            {mfaType === "sms"
              ? "Enter the code sent to your phone"
              : "Enter your authenticator code"}
          </CustomFormLabel>

          {mfaType === "sms" && phoneNumber && (
            <Typography variant="body2" color="textSecondary" mb={2}>
              We&apos;ve sent a verification code to {phoneNumber}
            </Typography>
          )}

          {mfaType === "totp" && (
            <Typography variant="body2" color="textSecondary" mb={2}>
              Open your authenticator app and enter the 6-digit code
            </Typography>
          )}

          <CustomTextField
            id="code"
            name="code"
            fullWidth
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            placeholder={mfaType === "sms" ? "Enter SMS code" : "Enter authenticator code"}
            autoComplete="off"
          />
        </Stack>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          loading={isLoading || formik.isSubmitting}
          disabled={isLoading || formik.isSubmitting}
        >
          Verify Code
        </Button>
      </form>
    </Box>
  );
};

export { MultiFactor };
