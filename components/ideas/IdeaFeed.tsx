"use client";

import React, { useEffect } from "react";
import { IdeaCard } from "./IdeaCard";
import { Idea } from "@/types";
import { getSocket } from "@/lib/socket";

interface IdeaFeedProps {
  ideas: Idea[];
  loading?: boolean;
}

export const IdeaFeed: React.FC<IdeaFeedProps> = ({ ideas, loading }) => {
  useEffect(() => {
    const socket = getSocket();
    socket.connect();
    
    // Fallback/Listener for real-time votes 
    // Usually we update local state or rely on swr/react-query
    socket.on("vote_update", (data) => {
      console.log("Realtime vote update:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-40 bg-[#100B1E] border border-white/5 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (!ideas.length) {
    return (
      <div className="text-center py-20 px-4 glass rounded-xl">
        <h3 className="text-xl font-heading text-white mb-2">No ideas found</h3>
        <p className="text-[#94A3B8]">Be the first to share an idea in this category!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};
