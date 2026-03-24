"use client";

import React from "react";
import { Search, Compass, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function ExplorePage() {
  const categories = [
    { name: "Technology", count: 124 },
    { name: "Environment", count: 86 },
    { name: "Health", count: 53 },
    { name: "Education", count: 91 },
    { name: "Infrastructure", count: 42 },
    { name: "Arts & Culture", count: 38 }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Search Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-heading font-bold text-white mb-6">Explore Nexora</h1>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input 
            type="text"
            placeholder="Search ideas, people, or domains..."
            className="w-full bg-[#100B1E]/80 border border-white/20 focus:border-[#7C3AED] rounded-full py-4 pl-12 pr-6 text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Trending Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
            <h2 className="text-lg font-heading font-bold text-white">Trending This Week</h2>
          </div>
          {[1,2,3].map(i => (
            <Card key={i} className="p-4 hover:border-[#06B6D4]/50 cursor-pointer transition-colors">
              <h3 className="font-semibold text-white mb-1">AI-based Traffic Management System</h3>
              <p className="text-xs text-[#94A3B8]">245 upvotes • Technology</p>
            </Card>
          ))}
        </div>

        {/* Categories Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-[#7C3AED]" />
            <h2 className="text-lg font-heading font-bold text-white">Browse By Domain</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(c => (
              <div key={c.name} className="bg-[#100B1E] border border-white/5 rounded-xl p-3 flex flex-col justify-center items-center text-center hover:bg-white/5 cursor-pointer transition-colors">
                <span className="text-sm font-medium text-[#F8FAFC]">{c.name}</span>
                <span className="text-xs text-[#94A3B8] mt-1">{c.count} ideas</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Supporters Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-heading font-bold text-white">Top Supporters</h2>
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                  U{i}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">User Name {i+1}</p>
                  <p className="text-xs text-[#94A3B8]">Supported 12 ideas</p>
                </div>
              </div>
              <button className="text-xs font-medium text-[#06B6D4] hover:underline">View</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
