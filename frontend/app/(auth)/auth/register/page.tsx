import Link from "next/link";

import { RegisterForm } from "@/modules/auth";

const RegisterPage = () => {
  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <RegisterForm title="Create account" subtext={null} />
      </div>
      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary font-medium hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
