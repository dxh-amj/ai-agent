import { ForgotPassword } from "@/modules/auth/forgot-password/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-4">
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
