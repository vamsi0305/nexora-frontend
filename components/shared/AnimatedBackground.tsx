"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#05050F]">
      {/* Grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #06B6D4 1px, transparent 1px), linear-gradient(to bottom, #7C3AED 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -100, 100, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#7C3AED]/20 blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -150, 50, 100, 0],
          y: [0, 100, -100, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-[#06B6D4]/15 blur-[100px]"
      />
      
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
};
