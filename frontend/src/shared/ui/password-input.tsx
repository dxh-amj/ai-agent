"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Input } from "./input";

interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, "type"> {
  label: string;
  error?: boolean;
  helperText?: string;
}

export const PasswordInput = ({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputId = id || "password";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Input
          id={inputId}
          type={showPassword ? "text" : "password"}
          className={cn(
            "h-12 md:h-14 px-4 pr-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <span className="material-symbols-outlined text-xl">
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      {helperText && (
        <p className={cn("text-sm", error ? "text-red-500" : "text-slate-500")}>{helperText}</p>
      )}
    </div>
  );
};
