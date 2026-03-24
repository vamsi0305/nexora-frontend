"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export const NotificationBell = ({ count = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded-full hover:bg-white/5"
      >
        <Bell className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-[#05050F] rounded-full">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Basic Dropdown Preview */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-80 bg-[#100B1E] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#05050F]/50">
            <h4 className="font-heading font-semibold text-[#F8FAFC]">Notifications</h4>
            <button className="text-xs text-[#06B6D4] hover:underline">Mark all as read</button>
          </div>
          <div className="max-h-[300px] overflow-y-auto w-full flex flex-col items-center justify-center p-8 text-center text-[#94A3B8]">
            <Bell className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No new notifications</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
