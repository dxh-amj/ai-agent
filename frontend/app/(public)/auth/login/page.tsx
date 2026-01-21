import Link from "next/link";

import { LoginForm } from "@/modules/auth/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <LoginForm
          title="Log in"
          subtext={null}
          subtitle={
            <p className="text-center text-sm text-slate-500 mt-6">
              Don&apos;t have an account yet?{" "}
              <Link href="/auth/register" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          }
        />
      </div>
    </div>
  );
};

export default LoginPage;
