import { AgentKitLogo } from "@/shared/ui/agentkit-logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-6">
        <AgentKitLogo size="lg" variant="dark" />
      </div>
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  );
};

export default AuthLayout;
