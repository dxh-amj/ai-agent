import Link from "next/link";

import { ForgotPassword } from "@/modules/auth/forgot-password/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <ForgotPassword />
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        Remember your password?{" "}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Back to Login
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordPage;
