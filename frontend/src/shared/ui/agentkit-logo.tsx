import Link from "next/link";

interface AgentKitLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export const AgentKitLogo = ({
  size = "md",
  variant = "dark",
  showText = true,
}: AgentKitLogoProps) => {
  const sizeClasses = {
    sm: { icon: "w-6 h-6", text: "text-base", gap: "gap-1.5" },
    md: { icon: "w-8 h-8", text: "text-xl", gap: "gap-2" },
    lg: { icon: "w-10 h-10", text: "text-2xl", gap: "gap-2.5" },
  };

  const textColor = variant === "light" ? "text-white" : "text-slate-900";
  const iconBg = variant === "light" ? "bg-white/10" : "bg-primary/10";
  const iconColor = variant === "light" ? "text-white" : "text-primary";

  return (
    <Link href="/" className={`flex items-center ${sizeClasses[size].gap}`}>
      {/* Logo Icon - Geometric A with Kit box */}
      <div className={`${sizeClasses[size].icon} relative shrink-0`}>
        {/* Background circle */}
        <div className={`absolute inset-0 ${iconBg} rounded-lg rotate-45`} />

        {/* A letter with toolbox design */}
        <div
          className={`relative ${sizeClasses[size].icon} flex items-center justify-center ${iconColor} font-bold`}
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized "A" with toolbox elements */}
            <path
              d="M16 6L9 24H12L13.5 20H18.5L20 24H23L16 6Z"
              fill="currentColor"
              className="opacity-90"
            />
            <rect x="14" y="14" width="4" height="2" fill="currentColor" className="opacity-100" />
            {/* Small dots representing tools/kit */}
            <circle cx="11" cy="18" r="1" fill="currentColor" />
            <circle cx="21" cy="18" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Text */}
      {showText && (
        <span className={`${sizeClasses[size].text} ${textColor} font-bold tracking-tight`}>
          Agent<span className={variant === "light" ? "text-white/80" : "text-primary"}>Kit</span>
        </span>
      )}
    </Link>
  );
};
