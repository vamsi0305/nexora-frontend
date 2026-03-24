import React from "react";
import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  type?: "card" | "text" | "avatar";
}

export const LoadingSkeleton: React.FC<SkeletonProps> = ({ className = "", type = "text" }) => {
  const baseClass = "bg-[#100B1E] border border-white/5 relative overflow-hidden";
  
  const typeClass = {
    card: "h-40 w-full rounded-xl",
    text: "h-4 w-full rounded",
    avatar: "h-12 w-12 rounded-full",
  }[type];

  return (
    <div className={`${baseClass} ${typeClass} ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
        animate={{
          x: ["100%", "-100%"]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
};
