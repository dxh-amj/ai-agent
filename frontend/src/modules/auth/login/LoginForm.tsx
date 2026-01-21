"use client";

import Link from "next/link";

import { getCookie } from "cookies-next";
import { useFormik } from "formik";

import { Button, FormCheckbox, FormInput, PasswordInput } from "@/shared/ui";
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
      {title && (
        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900">
          {title}
        </h1>
      )}

      {subtext}

      <SocialButtons title="Sign in with" />

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-500">or sign in with</span>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <FormInput
          label="Email Address"
          type="email"
          id="email"
          name="email"
          placeholder="name@company.com"
          icon="mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email : undefined}
        />

        <PasswordInput
          label="Password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password ? formik.errors.password : undefined}
        />

        <div className="flex items-center justify-between">
          <FormCheckbox
            label="Remember Me"
            id="rememberMe"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <Link
            href="/auth/forgot-password"
            className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98]"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {subtitle}
    </>
  );
};
