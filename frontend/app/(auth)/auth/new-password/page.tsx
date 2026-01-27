import Link from "next/link";
import { Suspense } from "react";

import { NewPasswordForm } from "@/modules/auth";
import { Spinner } from "@/shared/ui";

const NewPasswordPage = () => {
  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <Suspense fallback={<Spinner size="xl" />}>
          <NewPasswordForm />
        </Suspense>
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        <Link href="/auth/login" className="font-medium text-primary hover:underline">
          Back to Login
        </Link>
      </p>
    </>
  );
};

export default NewPasswordPage;
