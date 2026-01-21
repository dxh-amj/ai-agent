import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <Link href="/" className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-lg bg-primary flex items-center justify-center text-white`}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: size === "sm" ? "16px" : size === "md" ? "20px" : "24px",
          }}
        >
          smart_toy
        </span>
      </div>
      {showText && (
        <span
          className={`${textClasses[size]} font-bold tracking-tight text-white`}
        >
          AI Workforce Hub
        </span>
      )}
    </Link>
  );
}
