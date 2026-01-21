import Link from "next/link";

import { RegisterForm } from "@/modules/auth";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-4">
      {/* Register Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <RegisterForm
          title="Create account"
          subtext={null}
          subtitle={
            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          }
        />
      </div>
    </div>
  );
};

export default RegisterPage;
