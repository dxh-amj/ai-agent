"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { useForgotPassword } from "./hooks";
import { forgotPasswordSchema } from "./schema";

const ForgotPassword = ({
  title,
  subtitle,
  subtext,
}: {
  title?: string;
  subtitle?: string;
  subtext?: string;
}) => {
  const { handleForgotPassword, isSubmitting } = useForgotPassword();

  return (
    <>
      {title && <h1 className="text-2xl font-semibold text-slate-900 mb-6">{title}</h1>}

      {subtext}

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8 mt-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">Forgot Password</h2>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => handleForgotPassword(values.email)}
        >
          {() => (
            <Form>
              <div className="mt-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {subtitle}
    </>
  );
};

export { ForgotPassword };
