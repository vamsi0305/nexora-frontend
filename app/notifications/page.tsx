"use client";

import React, { useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Bell, MessageSquare, HandHeart, Trophy } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, loading, fetchNotifications, markAllAsRead, markAsRead } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case "comment": return <MessageSquare className="w-5 h-5 text-[#06B6D4]" />;
      case "support": return <HandHeart className="w-5 h-5 text-green-400" />;
      case "milestone": return <Trophy className="w-5 h-5 text-yellow-400" />;
      default: return <Bell className="w-5 h-5 text-[#7C3AED]" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Notifications</h1>
        {notifications.some(n => !n.is_read) && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="gap-2">
            <Check className="w-4 h-4" /> Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-[#94A3B8]">Loading notifications...</p>
        ) : notifications.length > 0 ? (
          notifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`p-4 transition-colors cursor-pointer ${!notification.is_read ? 'bg-[#7C3AED]/5 border-[#7C3AED]/30' : ''}`}
              onClick={() => !notification.is_read && markAsRead(notification.id)}
            >
              <div className="flex gap-4 items-start">
                <div className={`p-2 rounded-full mt-1 ${!notification.is_read ? 'bg-[#7C3AED]/20' : 'bg-white/5'}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${!notification.is_read ? 'text-white font-medium' : 'text-[#94A3B8]'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
                {!notification.is_read && (
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4] mt-2" />
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 glass rounded-2xl">
            <Bell className="w-12 h-12 text-[#94A3B8] mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-heading text-white">All caught up!</h3>
            <p className="text-[#94A3B8] text-sm mt-2">You don't have any new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
