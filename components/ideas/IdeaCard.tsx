"use client";

import React from "react";
import { VoteButton } from "./VoteButton";
import { Idea } from "@/types";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import Link from "next/link";
import { MessageSquare, HandHeart, Calendar } from "lucide-react";

interface IdeaCardProps {
  idea: Idea;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const getDomainColor = (domain: string) => {
    const d = domain.toLowerCase();
    if (d.includes('tech')) return 'primary';
    if (d.includes('health')) return 'success';
    if (d.includes('edu')) return 'warning';
    return 'accent';
  };

  return (
    <Card className="hover:border-white/20 transition-colors p-5">
      <div className="flex gap-4">
        {/* Vote Sidebar */}
        <div className="flex flex-col items-center shrink-0">
          <VoteButton ideaId={idea.id} initialUpvotes={idea.upvotes_count} initialDownvotes={idea.downvotes_count} userVote={0} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Link href={`/ideas/${idea.id}`}>
            <h3 className="text-[#F8FAFC] font-heading font-bold text-lg hover:text-[#06B6D4] transition-colors truncate">
              {idea.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant={getDomainColor(idea.domain)}>{idea.domain}</Badge>
            <span className="text-xs text-[#94A3B8]">• {idea.city || "Nexora"}</span>
            <span className="text-xs text-[#94A3B8] flex items-center gap-1">
               <Calendar className="w-3 h-3" /> 
               {new Date(idea.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <p className="mt-3 text-sm text-[#94A3B8] line-clamp-3 leading-relaxed">
            {idea.description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {idea.tags?.slice(0,3).map(tag => (
              <span key={tag} className="text-xs font-medium bg-white/5 text-[#94A3B8] px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
            {idea.tags?.length > 3 && <span className="text-xs font-medium bg-white/5 text-[#94A3B8] px-2 py-1 rounded-md">+{idea.tags.length - 3}</span>}
          </div>
          
          {/* Footer stats */}
          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
            <div className="flex items-center gap-4">
              <Link href={`/ideas/${idea.id}`} className="flex items-center gap-1 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC]">
                <MessageSquare className="w-4 h-4" /> 
                Reply
              </Link>
              <button className="flex items-center gap-1 text-xs font-medium text-[#06B6D4] hover:text-cyan-300 transition-colors">
                <HandHeart className="w-4 h-4" />
                Support
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED] overflow-hidden">
                 {idea.users?.avatar_url ? (
                    <img src={idea.users.avatar_url} alt="author" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-[#7C3AED] text-white flex items-center justify-center text-[10px] font-bold">
                       {idea.users?.name?.charAt(0) || "U"}
                    </div>
                 )}
              </div>
              <span className="text-xs font-medium text-[#94A3B8]">
                {idea.users?.name || "Anonymous"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
