"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { User, Idea } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";

export default function ProfilePage() {
  const { id } = useParams() as { id: string };
  const [profile, setProfile] = useState<User | null>(null);
  const [userIdeas, setUserIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Ideas");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileRes, ideasRes] = await Promise.all([
          api.get(`/users/${id}`),
          api.get(`/ideas`, { params: { user_id: id } })
        ]);
        setProfile(profileRes.data);
        setUserIdeas(ideasRes.data.items || ideasRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [id]);

  if (loading) return <div className="max-w-4xl mx-auto py-8 px-4"><LoadingSkeleton type="card" className="h-64 mb-8" /></div>;
  if (!profile) return <div className="text-center py-20 text-white">User not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Profile Header */}
      <div className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 blur-3xl rounded-full" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#100B1E] bg-[#7C3AED]/20 shadow-xl overflow-hidden shrink-0">
            {profile.avatar_url ? (
               <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#7C3AED]">
                  {profile.name?.charAt(0) || "U"}
               </div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-heading font-bold text-white mb-2">{profile.name}</h1>
            <p className="text-[#06B6D4] font-medium mb-4">{profile.college} {profile.city ? `• ${profile.city}` : ""}</p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
              <Badge variant="primary">Innovator</Badge>
              <Badge variant="neutral">Member since {new Date(profile.created_at).getFullYear()}</Badge>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{userIdeas.length}</p>
            <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Ideas Posted</p>
          </div>
          <div className="text-center border-l border-r border-white/10">
            <p className="text-2xl font-bold text-[#7C3AED]">{profile.followers_count || 0}</p>
            <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#06B6D4]">{profile.trust_score || 0}</p>
            <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Trust Score</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6 pb-px">
        {["Ideas", "Support Given", "Badges"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === tab 
                ? "border-[#7C3AED] text-[#7C3AED]" 
                : "border-transparent text-[#94A3B8] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "Ideas" && (
          userIdeas.length > 0 
            ? userIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
            : <p className="text-[#94A3B8] text-center py-10">This user hasn't posted any ideas yet.</p>
        )}
        {activeTab === "Support Given" && <p className="text-[#94A3B8] text-center py-10">Supporting 0 ideas.</p>}
        {activeTab === "Badges" && <p className="text-[#94A3B8] text-center py-10">No badges earned yet.</p>}
      </div>
    </div>
  );
}
