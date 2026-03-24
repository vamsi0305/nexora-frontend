"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PlusCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { NotificationBell } from "../shared/NotificationBell";
import { useAuthStore } from "@/lib/store";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/10 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
            <span className="font-heading font-bold text-white text-xl">N</span>
          </div>
          <span className="font-heading font-bold text-xl text-white tracking-wide hidden sm:block">Nexora</span>
        </Link>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link href="/post" passHref>
                <Button size="sm" variant="secondary" className="gap-2">
                  <PlusCircle className="w-4 h-4" /> Post Idea
                </Button>
              </Link>
              <NotificationBell count={3} />
              <Link href={`/profile/${user?.id || 'me'}`} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#100B1E] border border-[#7C3AED] overflow-hidden">
                  {user?.avatar_url ? (
                    <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#7C3AED]/20 text-[#7C3AED] text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Sign In</Link>
              <Link href="/register" passHref>
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {isAuthenticated && <NotificationBell count={3} />}
          <button onClick={toggleMenu} className="text-[#94A3B8] hover:text-white focus:outline-none">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={toggleMenu} className="block text-base font-medium text-[#F8FAFC]">Dashboard</Link>
                  <Link href="/feed" onClick={toggleMenu} className="block text-base font-medium text-[#F8FAFC]">Feed</Link>
                  <Link href="/explore" onClick={toggleMenu} className="block text-base font-medium text-[#F8FAFC]">Explore</Link>
                  <Link href="/post" onClick={toggleMenu} className="block text-base font-medium text-[#06B6D4]">Post New Idea</Link>
                  <Link href={`/profile/${user?.id || 'me'}`} onClick={toggleMenu} className="block text-base font-medium text-[#F8FAFC]">Profile</Link>
                  <Link href="/settings" onClick={toggleMenu} className="block text-base font-medium text-[#94A3B8]">Settings</Link>
                  <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left text-base font-medium text-red-400">Log out</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={toggleMenu} className="block text-base font-medium text-[#F8FAFC]">Sign In</Link>
                  <Link href="/register" onClick={toggleMenu} className="block text-base font-medium text-[#7C3AED]">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
