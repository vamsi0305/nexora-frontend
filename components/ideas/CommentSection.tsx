"use client";

import React, { useState, useEffect } from "react";
import { useIdeas } from "@/hooks/useIdeas";
import { Comment } from "@/types";
import { Button } from "../ui/Button";

interface CommentSectionProps {
  ideaId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ ideaId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { getComments, postComment } = useIdeas();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComments(ideaId).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [ideaId, getComments]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    const res = await postComment(ideaId, newComment, isAnonymous);
    if (res) {
      setComments([...comments, res]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="font-heading text-lg font-bold text-white border-b border-white/10 pb-4">
        Discussion ({comments.length})
      </h3>
      
      <div className="flex flex-col gap-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts or ask a question..."
          className="w-full bg-[#05050F]/50 border border-white/10 rounded-xl p-4 text-[#F8FAFC] min-h-[100px] focus:outline-none focus:border-[#7C3AED] resize-none"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#94A3B8]">
            <input 
              type="checkbox" 
              checked={isAnonymous} 
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-white/20 bg-[#05050F] text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            Post Anonymously
          </label>
          <Button onClick={handleSubmit} disabled={!newComment.trim()}>Post Comment</Button>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {loading ? (
          <p className="text-[#94A3B8] text-sm py-4">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-[#94A3B8] text-sm py-4">No comments yet. Start the discussion!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="glass p-4 rounded-xl flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED] flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-[#7C3AED]">
                  {c.users?.name ? c.users.name.charAt(0) : "A"}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-[#F8FAFC]">{c.users?.name || "Anonymous"}</span>
                  <span className="text-xs text-[#94A3B8]">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-[#94A3B8] whitespace-pre-wrap">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
