import Link from "next/link";

import { LoginForm } from "@/modules/auth/login/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <LoginForm title="Log in" subtext={null} />
      </div>
      <p className="text-center text-sm text-slate-500 mt-6">
        Don&apos;t have an account yet?{" "}
        <Link href="/auth/register" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
