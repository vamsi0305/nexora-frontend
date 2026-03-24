"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useIdeas } from "@/hooks/useIdeas";
import { useAuthStore } from "@/lib/store";
import { VoteButton } from "@/components/ideas/VoteButton";
import { CommentSection } from "@/components/ideas/CommentSection";
import { SupportPledgeForm } from "@/components/ideas/SupportPledgeForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { Share2, MessageCircle, Info, Calendar } from "lucide-react";
import Link from "next/link";

export default function IdeaDetailPage() {
  const { id } = useParams() as { id: string };
  const { fetchIdeaById, ideaDetail: idea, loading } = useIdeas();
  const { user } = useAuthStore();
  
  // MOCK SUPPORTER CHECK (in reality checked via backend relations)
  const isSupporter = true; 

  useEffect(() => {
    fetchIdeaById(id);
  }, [id, fetchIdeaById]);

  if (loading) return <div className="max-w-4xl mx-auto p-4"><LoadingSkeleton type="card" className="h-[60vh]" /></div>;
  if (!idea) return <div className="text-center text-white py-20">Idea not found</div>;

  const impactScore = Math.floor((idea.upvotes_count * 2) + Math.min(idea.views_count / 10, 50));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
      
      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="primary">{idea.domain}</Badge>
            <Badge variant="neutral">{idea.status}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
            {idea.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
            <Link href={`/profile/${idea.user_id}`} className="flex items-center gap-2 hover:text-[#06B6D4] transition-colors">
               <div className="w-6 h-6 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED] flex items-center justify-center font-bold text-xs text-[#7C3AED]">
                  {idea.users?.name?.charAt(0) || "A"}
               </div>
               <span>{idea.users?.name || "Anonymous"}</span>
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(idea.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <span>{idea.city || "Nexora Network"}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-[#F8FAFC] mb-12 bg-[#100B1E]/40 border border-white/5 p-6 rounded-2xl leading-relaxed whitespace-pre-wrap">
          {idea.description}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {idea.tags?.map(t => (
            <span key={t} className="px-3 py-1 bg-white/5 text-[#94A3B8] rounded-full text-xs font-medium">#{t}</span>
          ))}
        </div>

        <CommentSection ideaId={idea.id} />
      </div>

      {/* Action Sidebar */}
      <div className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky top-24 self-start">
        
        {/* Interaction Card */}
        <div className="glass p-6 rounded-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <VoteButton ideaId={idea.id} initialUpvotes={idea.upvotes_count} initialDownvotes={idea.downvotes_count} userVote={0} />
              <div className="flex flex-col">
                <span className="text-sm text-[#94A3B8]">Community</span>
                <span className="font-semibold text-white">Sentiment</span>
              </div>
            </div>
          </div>

          <div className="bg-[#05050F]/50 rounded-xl p-4 border border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white flex items-center gap-1"><Info className="w-4 h-4 text-[#06B6D4]" /> Impact Score</span>
            </div>
            <span className="text-2xl font-heading font-bold text-[#06B6D4]">{impactScore}</span>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <SupportPledgeForm ideaId={idea.id} />
            
            {/* Direct Message - Only for Supporters */}
            {isSupporter && user?.id !== idea.user_id && (
              <Button variant="outline" className="gap-2">
                <MessageCircle className="w-4 h-4" /> Message Creator
              </Button>
            )}

            <Button variant="ghost" className="gap-2 justify-center border border-white/5 text-[#94A3B8]">
              <Share2 className="w-4 h-4" /> Share Idea
            </Button>
          </div>
        </div>
        
        {/* Progress Timeline placeholder */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-[#F8FAFC] font-heading font-semibold mb-4">Development Stage</h3>
          <div className="relative pl-4 border-l-2 border-[#7C3AED]/30 space-y-6">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[#7C3AED] rounded-full ring-4 ring-[#100B1E]" />
              <p className="text-sm font-medium text-white">Concept phase</p>
              <p className="text-xs text-[#94A3B8]">Idea verified and shared</p>
            </div>
            <div className="relative opacity-50">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white/20 rounded-full ring-4 ring-[#100B1E]" />
              <p className="text-sm font-medium text-white">Planning</p>
              <p className="text-xs text-[#94A3B8]">Gathering resources</p>
            </div>
            <div className="relative opacity-50">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-white/20 rounded-full ring-4 ring-[#100B1E]" />
              <p className="text-sm font-medium text-white">In Progress</p>
              <p className="text-xs text-[#94A3B8]">Execution started</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
