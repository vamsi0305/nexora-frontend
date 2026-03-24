"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuthStore } from "@/lib/store";

interface NotificationBellProps {
  count?: number;
}

export const NotificationBell = ({ count = 0 }: NotificationBellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { notifications, fetchNotifications, markAllAsRead, markAsRead } = useNotifications();
  const unreadCount = notifications.filter((notification) => !notification.is_read).length || count;

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [fetchNotifications, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded-full hover:bg-white/5"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 border-2 border-[#05050F] rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
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
            <button className="text-xs text-[#06B6D4] hover:underline" onClick={markAllAsRead}>Mark all as read</button>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => (
                <button
                  key={notification.id}
                  className="w-full text-left p-4 border-b border-white/5 hover:bg-white/5"
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className={`text-sm ${notification.is_read ? "text-[#94A3B8]" : "text-white font-medium"}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </button>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center p-8 text-center text-[#94A3B8]">
                <Bell className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">No new notifications</p>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-white/5 bg-[#05050F]/50 text-center">
            <Link href="/notifications" className="text-sm text-[#06B6D4] hover:underline" onClick={() => setIsOpen(false)}>
              View all notifications
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};
