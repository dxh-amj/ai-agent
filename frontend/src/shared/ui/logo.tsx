import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark";
}

export const Logo = ({ size = "md", showText = true, variant = "dark" }: LogoProps) => {
  const sizeClasses = {
    sm: { container: "h-6 w-6", image: 24 },
    md: { container: "h-8 w-8", image: 32 },
    lg: { container: "h-10 w-10", image: 40 },
  };

  const textClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  const textColorClass = variant === "light" ? "text-white" : "text-slate-900";

  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className={`${sizeClasses[size].container} relative shrink-0`}>
        <Image
          src="/logo.png"
          alt="AI Agent Hub Logo"
          width={sizeClasses[size].image}
          height={sizeClasses[size].image}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`${textClasses[size]} ${textColorClass} font-bold tracking-tight`}>
          AI Agent Hub
        </span>
      )}
    </Link>
  );
};
