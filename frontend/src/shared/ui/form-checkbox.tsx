"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormCheckbox = ({ label, className, id, ...props }: FormCheckboxProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        id={inputId}
        className={cn(
          "h-5 w-5 rounded border-slate-300 bg-white text-primary focus:ring-primary focus:ring-offset-0 accent-primary cursor-pointer",
          className
        )}
        {...props}
      />
      <span className="text-slate-700 text-sm group-hover:text-primary transition-colors">
        {label}
      </span>
    </label>
  );
};
