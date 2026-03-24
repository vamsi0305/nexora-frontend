import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "success" | "warning" | "error" | "neutral";
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = "primary", 
  className = "",
  ...props 
}) => {
  const variants = {
    primary: "bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30",
    accent: "bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30",
    success: "bg-green-500/20 text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    error: "bg-red-500/20 text-red-400 border border-red-500/30",
    neutral: "bg-white/10 text-[#94A3B8] border border-white/20",
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
