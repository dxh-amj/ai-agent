"use client";

import Link from "next/link";

import { useFormik } from "formik";

import { Button, FormInput, PasswordInput } from "@/shared/ui";

import { SocialButtons } from "../social-buttons/SocialButtons";

import { useAuthRegister } from "./hooks";
import { registerSchema } from "./schema";

import type { RegisterFormProps } from "../types";

export const RegisterForm = ({ title, subtitle, subtext }: RegisterFormProps) => {
  const { handleRegister, isLoading } = useAuthRegister();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <>
      {title && (
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
          {title}
        </h1>
      )}

      {subtext}

      <SocialButtons title="Sign up with" />

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-500">or sign up with email</span>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName ? formik.errors.firstName : undefined}
          />
          <FormInput
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName ? formik.errors.lastName : undefined}
          />
        </div>

        <FormInput
          label="Email Address"
          type="email"
          id="email"
          name="email"
          placeholder="name@company.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email : undefined}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : undefined}
          />
          <PasswordInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold shadow-sm"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?
          <Link href="/auth/login" className="font-medium text-primary hover:underline ml-1">
            Log in
          </Link>
        </p>
      </form>

      {subtitle}
    </>
  );
};
