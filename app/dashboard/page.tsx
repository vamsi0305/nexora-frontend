"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { Idea, SupportPledge } from "@/types";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { Card } from "@/components/ui/Card";
import { Flame, TrendingUp, Users, Heart } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [myIdeas, setMyIdeas] = useState<Idea[]>([]);
  const [receivedPledges, setReceivedPledges] = useState<SupportPledge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    api.get("/ideas", { params: { user_id: user.id } })
      .then(async (res) => {
        const ideas = res.data.items || res.data;
        setMyIdeas(ideas);

        const pledgeResponses = await Promise.all(
          ideas.map((idea: Idea) =>
            api.get(`/ideas/${idea.id}/support`).then((supportRes) => supportRes.data).catch(() => [])
          )
        );

        setReceivedPledges(pledgeResponses.flat());
      })
      .finally(() => setLoading(false));
  }, [user]);

  const totalViews = useMemo(
    () => myIdeas.reduce((sum, idea) => sum + (idea.views_count || 0), 0),
    [myIdeas]
  );
  const totalUpvotes = useMemo(
    () => myIdeas.reduce((sum, idea) => sum + (idea.upvotes_count || 0), 0),
    [myIdeas]
  );
  const acceptedPledges = receivedPledges.filter((pledge) => pledge.status === "accepted").length;
  const pendingPledges = receivedPledges.filter((pledge) => pledge.status === "pending").length;

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="glass rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#7C3AED]/30 bg-gradient-to-br from-[#100B1E] to-[#7C3AED]/10">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-[#94A3B8]">Here is how your ideas are performing across the Nexora network.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#05050F]/50 px-6 py-4 rounded-xl border border-white/10">
          <Flame className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-xs text-[#94A3B8] uppercase tracking-wider font-bold">Momentum</p>
            <p className="text-xl font-bold text-white">{pendingPledges} active conversations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{totalViews}</p>
          <p className="text-xs text-[#94A3B8] font-medium">Total Idea Views</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]">
            <Heart className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{totalUpvotes}</p>
          <p className="text-xs text-[#94A3B8] font-medium">Upvotes Received</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{receivedPledges.length}</p>
          <p className="text-xs text-[#94A3B8] font-medium">Support Pledges</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{user.trust_score || 0}</p>
          <p className="text-xs text-[#94A3B8] font-medium">Trust Score</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-white">Your Ideas</h2>
            <Link href="/post" className="text-sm font-medium text-[#06B6D4] hover:underline">Post New</Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-[#94A3B8]">Loading ideas...</p>
            ) : myIdeas.length > 0 ? (
              myIdeas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)
            ) : (
              <Card className="p-10 text-center border-dashed border-white/20">
                <p className="text-[#94A3B8] mb-4">You have not posted any ideas yet.</p>
                <Link href="/post" className="px-6 py-2 bg-[#7C3AED] text-white rounded-lg font-medium hover:bg-[#6D28D9] transition-colors">Start Creating</Link>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-heading font-bold text-white">Recent Support Pledges</h2>
          <Card className="p-6">
            {receivedPledges.length > 0 ? (
              <div className="space-y-4">
                {receivedPledges.slice(0, 5).map((pledge) => (
                  <div key={pledge.id} className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm font-medium text-white">{pledge.users?.name || "Community member"}</p>
                    <p className="mt-1 text-sm text-[#94A3B8]">{pledge.message || "Offered support."}</p>
                    <p className="mt-2 text-xs text-[#06B6D4] uppercase tracking-wide">{pledge.status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-[#94A3B8] text-sm">No support pledges received yet.</p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-heading font-bold text-white mb-4">Snapshot</h3>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <p>{acceptedPledges} accepted pledges</p>
              <p>{pendingPledges} pending pledges</p>
              <p>{myIdeas.filter((idea) => idea.status === "launched").length} launched ideas</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
