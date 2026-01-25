"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";

import "react-phone-number-input/style.css";

interface CustomPhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  helperText?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export const CustomPhoneInput = ({
  value,
  onChange,
  placeholder = "Enter phone number",
  className,
  error,
  helperText,
  id,
  name,
  disabled,
}: CustomPhoneInputProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div
        className={cn(
          "flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          error && "border-destructive focus-within:ring-destructive/20",
          // Refined styles: ensure only ONE icon (the flag/globe) is visible and styled properly
          "[&_.PhoneInput]:flex [&_.PhoneInput]:items-center [&_.PhoneInput]:gap-2 [&_.PhoneInput]:w-full",
          "[&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:text-foreground [&_.PhoneInputInput]:placeholder:text-muted-foreground",
          "[&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:gap-1",
          "[&_.PhoneInputCountrySelect]:cursor-pointer [&_.PhoneInputCountrySelect]:absolute [&_.PhoneInputCountrySelect]:opacity-0 [&_.PhoneInputCountrySelect]:z-10",
          "[&_.PhoneInputCountryIcon]:flex [&_.PhoneInputCountryIcon]:items-center [&_.PhoneInputCountryIcon]:justify-center [&_.PhoneInputCountryIcon]:h-4 [&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputCountryIcon]:rounded-sm [&_.PhoneInputCountryIcon]:overflow-hidden [&_.PhoneInputCountryIcon]:bg-muted",
          "[&_.PhoneInputCountryIconImg]:block [&_.PhoneInputCountryIconImg]:max-w-full [&_.PhoneInputCountryIconImg]:max-h-full",
          "[&_.material-symbols-outlined]:display-none!",
          "[&_i]:display-none!",
          "[&_span:not(.PhoneInputCountryIcon)]:display-none!",
          "[&_.PhoneInputCountry]:relative [&_.PhoneInputCountry]:z-20"
        )}
      >
        <PhoneInput
          international
          flags={flags}
          id={id}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={(val) => onChange?.(val || "")}
          className="w-full"
        />
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
};
