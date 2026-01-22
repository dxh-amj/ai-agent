"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Input } from "./input";
import { Label } from "./label";

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  icon?: string;
  error?: boolean;
  helperText?: string;
}

export const FormInput = ({
  label,
  icon,
  error,
  helperText,
  className,
  id,
  ...props
}: FormInputProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative">
        <Input
          id={inputId}
          className={cn(
            "px-4 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400",
            icon && "pr-12",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-slate-400 pointer-events-none">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
      </div>
      {helperText && (
        <p className={cn("text-sm", error ? "text-red-500" : "text-slate-500")}>{helperText}</p>
      )}
    </div>
  );
};
