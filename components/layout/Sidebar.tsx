"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, LayoutDashboard, Settings, BookOpen, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export const Sidebar = ({ className = "" }: { className?: string }) => {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  
  // Do not show full sidebar on landing page or auth pages if not needed, 
  // but spec implies global layout structure with generic navigation.
  if (['/', '/login', '/register'].includes(pathname)) return null;

  const links = [
    { name: "Feed", href: "/feed", icon: <Home className="w-5 h-5" /> },
    { name: "Explore", href: "/explore", icon: <Compass className="w-5 h-5" /> },
  ];

  if (isAuthenticated) {
    links.splice(1, 0, { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> });
    links.push({ name: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> });
  }
  
  links.push({ name: "Guidelines", href: "/guidelines", icon: <BookOpen className="w-5 h-5" /> });

  if (user?.role === "admin") {
    links.push({ name: "Admin Panel", href: "/admin", icon: <ShieldAlert className="w-5 h-5 text-red-400" /> });
  }

  return (
    <aside className={`${className} h-[calc(100vh-8rem)] sticky top-24`}>
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-[#7C3AED]/10 text-[#7C3AED] font-semibold" 
                  : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 font-medium"
              }`}
            >
              <div className={`${isActive ? "text-[#7C3AED]" : "text-[#94A3B8]"}`}>
                {link.icon}
              </div>
              {link.name}
            </Link>
          );
        })}
      </nav>
      
      {/* Mini Profile Widget at bottom if authenticated */}
      {isAuthenticated && (
        <div className="absolute bottom-0 w-full glass rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#100B1E] border border-[#06B6D4] overflow-hidden shrink-0">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#06B6D4]/20 text-[#06B6D4] text-sm font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-[#F8FAFC] truncate">{user?.name || "User"}</p>
            <p className="text-xs text-[#94A3B8] truncate">{user?.college || "Nexora Member"}</p>
          </div>
        </div>
      )}
    </aside>
  );
};
