import Link from "next/link";
import { Suspense } from "react";

import { VerifyEmail } from "@/modules/auth/verify-email/VerifyEmail";
import { Spinner } from "@/shared/ui";

const RootVerifyEmailPage = () => {
  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Email Verification</h1>
        <Suspense fallback={<Spinner size="xl" />}>
          <VerifyEmail />
        </Suspense>
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        Changed your mind?{" "}
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Back to Login
        </Link>
      </p>
    </>
  );
};

export default RootVerifyEmailPage;
