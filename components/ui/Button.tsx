import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", fullWidth, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#05050F]";
    
    const variants = {
      primary: "bg-[#7C3AED] text-white hover:bg-[#6D28D9] focus:ring-[#7C3AED]",
      secondary: "bg-[#06B6D4] text-white hover:bg-[#0891B2] focus:ring-[#06B6D4]",
      outline: "border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/10 focus:ring-[#7C3AED]",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      ghost: "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5",
    };
    
    const sizes = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-5 py-2.5",
      lg: "text-lg px-8 py-3",
    };
    
    const widthClass = fullWidth ? "w-full" : "";

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
