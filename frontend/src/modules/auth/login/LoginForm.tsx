"use client";

import Link from "next/link";

import { getCookie } from "cookies-next";
import { useFormik } from "formik";

import { Button, FormInput, Label, PasswordInput } from "@/shared/ui";
import { decrypt } from "@/utils/encryption";

import { SocialButtons } from "../social-buttons/SocialButtons";

import { useAuthLogin } from "./hooks";
import { loginSchema } from "./schema";

import type { LoginFormProps } from "../types";

export const LoginForm = ({ title, subtitle, subtext }: LoginFormProps) => {
  const { handleLogin, isLoading } = useAuthLogin();

  const email = getCookie("email") as string;
  const encryptedPassword = getCookie("password") as string;
  const password = encryptedPassword ? decrypt(encryptedPassword) : "";

  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: password || "",
      rememberMe: !!email,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      {title && <h1 className="text-2xl font-semibold text-slate-900 mb-6">{title}</h1>}

      {subtext}

      <SocialButtons title="Continue with" />

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-400">Or</span>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 && Boolean(formik.errors.email)}
          helperText={formik.submitCount > 0 ? formik.errors.email : undefined}
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <PasswordInput
            label=""
            id="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.submitCount > 0 && Boolean(formik.errors.password)}
            helperText={formik.submitCount > 0 ? formik.errors.password : undefined}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg mt-2"
        >
          {isLoading ? "Signing In..." : "Log in"}
        </Button>
      </form>

      {subtitle}
    </>
  );
};
