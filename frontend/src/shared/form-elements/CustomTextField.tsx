"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/shared/ui/input";

interface CustomTextFieldProps extends React.ComponentProps<typeof Input> {
  icon?: string;
  error?: boolean;
  helperText?: string;
}

export const CustomTextField = React.forwardRef<HTMLInputElement, CustomTextFieldProps>(
  ({ icon, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Input
            ref={ref}
            aria-invalid={error}
            className={cn(
              "px-4 bg-background border-border text-foreground placeholder:text-muted-foreground",
              icon && "pr-12",
              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-muted-foreground pointer-events-none">
              <span className="material-symbols-outlined">{icon}</span>
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              "text-xs font-medium transition-colors",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

CustomTextField.displayName = "CustomTextField";
