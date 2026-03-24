"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useIdeas } from "@/hooks/useIdeas";

interface VoteButtonProps {
  ideaId: string;
  initialUpvotes: number;
  initialDownvotes: number;
  userVote: number; // 1 for up, -1 for down, 0 for none
}

export const VoteButton: React.FC<VoteButtonProps> = ({ 
  ideaId, initialUpvotes, initialDownvotes, userVote: initialVote 
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(initialVote);
  const { voteIdea } = useIdeas();

  const handleVote = async (value: number) => {
    // Optimistic toggle
    let newVote = userVote === value ? 0 : value;
    let newUps = upvotes;
    let newDowns = downvotes;

    // Remove old vote
    if (userVote === 1) newUps--;
    if (userVote === -1) newDowns--;

    // Apply new vote
    if (newVote === 1) newUps++;
    if (newVote === -1) newDowns++;

    setUserVote(newVote);
    setUpvotes(newUps);
    setDownvotes(newDowns);

    const success = await voteIdea(ideaId, newVote);
    if (!success) {
      // Revert on failure
      setUserVote(userVote);
      setUpvotes(upvotes);
      setDownvotes(downvotes);
    }
  };

  const netVotes = upvotes - downvotes;

  return (
    <div className="flex flex-col items-center bg-[#05050F]/50 rounded-xl p-1 border border-white/5">
      <button 
        onClick={() => handleVote(1)}
        className={`p-2 rounded-lg transition-colors ${
          userVote === 1 
            ? "text-[#7C3AED] bg-[#7C3AED]/20" 
            : "text-[#94A3B8] hover:text-[#7C3AED] hover:bg-white/5"
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
      
      <span className={`font-bold my-1 ${
        userVote === 1 ? "text-[#7C3AED]" : userVote === -1 ? "text-red-400" : "text-[#F8FAFC]"
      }`}>
        {netVotes}
      </span>
      
      <button 
        onClick={() => handleVote(-1)}
        className={`p-2 rounded-lg transition-colors ${
          userVote === -1 
            ? "text-red-400 bg-red-400/20" 
            : "text-[#94A3B8] hover:text-red-400 hover:bg-white/5"
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  );
};
