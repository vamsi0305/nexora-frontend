"use client";

import { useState, useCallback } from "react";
import { api } from "../lib/api";
import { Idea, Comment, SupportPledge } from "../types";
import toast from "react-hot-toast";

export const useIdeas = () => {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [ideaDetail, setIdeaDetail] = useState<Idea | null>(null);

  const fetchIdeas = useCallback(async (filters?: any) => {
    setLoading(true);
    try {
      const res = await api.get("/ideas", { params: filters });
      setIdeas(res.data.items || res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to fetch ideas");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIdeaById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/ideas/${id}`);
      setIdeaDetail(res.data);
      return res.data;
    } catch (err: any) {
      toast.error("Idea not found");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const postIdea = async (data: Partial<Idea>, file?: File) => {
    setLoading(true);
    try {
      // Typically, image upload happens first or via FormData
      const res = await api.post("/ideas", data);
      setIdeas(prev => [res.data, ...prev]);
      toast.success("Idea posted successfully!");
      return res.data;
    } catch (err: any) {
      toast.error("Failed to post idea");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const voteIdea = async (id: string, value: number) => {
    try {
      await api.post(`/ideas/${id}/vote`, { value, vote_type: value > 0 ? "upvote" : value < 0 ? "downvote" : null });
      // optimistic update not implemented fully here just refreshing
      return true;
    } catch (err) {
      toast.error("Failed to register vote");
      return false;
    }
  };

  const getComments = async (ideaId: string): Promise<Comment[]> => {
    try {
      const res = await api.get(`/ideas/${ideaId}/comments`);
      return res.data;
    } catch (err) {
      return [];
    }
  };

  const postComment = async (ideaId: string, content: string, isAnonymous: boolean) => {
    try {
      const res = await api.post(`/ideas/${ideaId}/comments`, { content, is_anonymous: isAnonymous });
      return res.data;
    } catch (err) {
      toast.error("Failed to post comment");
      return null;
    }
  };

  const pledgeSupport = async (ideaId: string, data: any) => {
    try {
      const res = await api.post(`/ideas/${ideaId}/support`, data);
      toast.success("Thank you for offering your support!");
      return res.data;
    } catch (err) {
      toast.error("Could not send pledge");
      return null;
    }
  };

  const getSupportPledges = async (ideaId: string): Promise<SupportPledge[]> => {
    try {
      const res = await api.get(`/ideas/${ideaId}/support`);
      return res.data;
    } catch (err) {
      return [];
    }
  };

  return {
    ideas,
    ideaDetail,
    loading,
    fetchIdeas,
    fetchIdeaById,
    postIdea,
    voteIdea,
    getComments,
    postComment,
    pledgeSupport,
    getSupportPledges
  };
};
