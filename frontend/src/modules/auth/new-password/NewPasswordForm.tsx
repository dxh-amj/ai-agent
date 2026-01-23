"use client";

import { useSearchParams } from "next/navigation";

import { Form, Formik } from "formik";

import { Button, PasswordInput } from "@/shared/ui";

import { useNewPassword } from "./hooks";
import { newPasswordSchema } from "./schema";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";
  const { handleSetNewPassword, isLoading } = useNewPassword();

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Set New Password</h2>
        <p className="mt-2 text-sm text-slate-600">
          Entering a new password for {email ? <strong>{email}</strong> : "your account"}
        </p>
      </div>

      <Formik
        initialValues={{
          token,
          password: "",
          confirmPassword: "",
        }}
        validationSchema={newPasswordSchema}
        onSubmit={(values) => {
          handleSetNewPassword(values);
        }}
      >
        {(formik) => (
          <Form className="flex flex-col gap-4">
            <PasswordInput
              label="New Password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && Boolean(formik.errors.password)}
              helperText={formik.submitCount > 0 ? formik.errors.password : undefined}
            />

            <PasswordInput
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && Boolean(formik.errors.confirmPassword)}
              helperText={formik.submitCount > 0 ? formik.errors.confirmPassword : undefined}
            />

            <Button type="submit" size="lg" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { NewPasswordForm };
