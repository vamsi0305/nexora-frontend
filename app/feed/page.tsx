"use client";

import React, { useEffect, useState } from "react";
import { IdeaFeed } from "@/components/ideas/IdeaFeed";
import { useIdeas } from "@/hooks/useIdeas";

export default function FeedPage() {
  const { ideas, fetchIdeas, loading } = useIdeas();
  const [activeTab, setActiveTab] = useState("Trending");

  useEffect(() => {
    const sortMap: Record<string, string> = {
      Trending: "trending",
      New: "recent",
      "Top Voted": "popular",
      Local: "recent",
    };

    fetchIdeas({ sort: sortMap[activeTab] ?? "recent" });
  }, [activeTab, fetchIdeas]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-6">Discover Ideas</h1>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
          {["Trending", "New", "Top Voted", "Local"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? "bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                  : "bg-white/5 text-[#94A3B8] hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <IdeaFeed ideas={ideas} loading={loading} />
    </div>
  );
}
