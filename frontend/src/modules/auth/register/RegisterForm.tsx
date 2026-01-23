"use client";

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
      {title && <h1 className="text-2xl font-semibold text-slate-900 mb-6">{title}</h1>}

      {subtext}

      <SocialButtons title="Sign up with" />

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-400">or sign up with</span>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.submitCount > 0 && Boolean(formik.errors.firstName)}
            helperText={formik.submitCount > 0 ? formik.errors.firstName : undefined}
          />
          <FormInput
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.submitCount > 0 && Boolean(formik.errors.lastName)}
            helperText={formik.submitCount > 0 ? formik.errors.lastName : undefined}
          />
        </div>

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

        <PasswordInput
          label="Password"
          id="password"
          name="password"
          placeholder="Create a password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 && Boolean(formik.errors.password)}
          helperText={formik.submitCount > 0 ? formik.errors.password : undefined}
        />

        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.submitCount > 0 && Boolean(formik.errors.confirmPassword)}
          helperText={formik.submitCount > 0 ? formik.errors.confirmPassword : undefined}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg mt-2"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      {subtitle}
    </>
  );
};
