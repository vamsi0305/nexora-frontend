import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#05050F]/80 backdrop-blur-md relative z-10 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-heading font-bold text-lg text-white">Nexora</span>
          <span className="text-[#94A3B8] text-sm">&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link href="/guidelines" className="text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors">Guidelines</Link>
          <a href="#" className="text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors">Privacy</a>
          <a href="#" className="text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};
