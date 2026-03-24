"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", glass = true, children, ...props }, ref) => {
    
    const baseStyle = "rounded-xl border border-white/10 overflow-hidden";
    const bgStyle = glass 
      ? "bg-[#100B1E]/60 backdrop-blur-md" 
      : "bg-[#100B1E]";
      
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${baseStyle} ${bgStyle} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
