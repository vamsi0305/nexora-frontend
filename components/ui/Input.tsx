import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1 w-full">
        {label && <label className="text-sm font-medium text-[#F8FAFC]">{label}</label>}
        <input
          ref={ref}
          className={`bg-[#05050F]/50 border ${error ? "border-red-500 focus:border-red-500" : "border-white/20 focus:border-[#06B6D4]"} rounded-lg px-4 py-2.5 text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] transition-colors ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
