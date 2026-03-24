"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Compass, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { Idea, User } from "@/types";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [trendingIdeas, setTrendingIdeas] = useState<Idea[]>([]);
  const [searchResults, setSearchResults] = useState<{ ideas: Idea[]; users: User[] }>({ ideas: [], users: [] });

  useEffect(() => {
    api.get("/ideas/trending")
      .then((res) => setTrendingIdeas(res.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSearchResults({ ideas: [], users: [] });
      return;
    }

    const timeout = setTimeout(() => {
      setSearching(true);
      api.get("/search", { params: { q: trimmed, type: "all" } })
        .then((res) => {
          setSearchResults({
            ideas: res.data.ideas || [],
            users: res.data.users || [],
          });
        })
        .finally(() => setSearching(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const categories = useMemo(() => {
    const counts = trendingIdeas.reduce<Record<string, number>>((acc, idea) => {
      acc[idea.domain] = (acc[idea.domain] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [trendingIdeas]);

  const featuredCreators = useMemo(() => {
    const seen = new Set<string>();
    return trendingIdeas
      .filter((idea) => {
        if (!idea.users?.name || seen.has(idea.user_id)) return false;
        seen.add(idea.user_id);
        return true;
      })
      .slice(0, 4);
  }, [trendingIdeas]);

  const showingSearch = query.trim().length >= 2;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-heading font-bold text-white mb-6">Explore Nexora</h1>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ideas, people, or domains..."
            className="w-full bg-[#100B1E]/80 border border-white/20 focus:border-[#7C3AED] rounded-full py-4 pl-12 pr-6 text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-all text-lg"
          />
        </div>
      </div>

      {showingSearch ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
              <h2 className="text-lg font-heading font-bold text-white">Idea Results</h2>
            </div>
            <div className="space-y-3">
              {searching ? (
                <p className="text-sm text-[#94A3B8]">Searching ideas...</p>
              ) : searchResults.ideas.length > 0 ? (
                searchResults.ideas.map((idea) => (
                  <Link key={idea.id} href={`/ideas/${idea.id}`} className="block rounded-xl border border-white/10 p-4 hover:border-[#06B6D4]/40 hover:bg-white/5">
                    <h3 className="font-semibold text-white">{idea.title}</h3>
                    <p className="mt-1 text-sm text-[#94A3B8] line-clamp-2">{idea.description}</p>
                    <p className="mt-2 text-xs text-[#06B6D4]">{idea.domain}</p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-[#94A3B8]">No ideas matched your search.</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-heading font-bold text-white">People Results</h2>
            </div>
            <div className="space-y-3">
              {searching ? (
                <p className="text-sm text-[#94A3B8]">Searching people...</p>
              ) : searchResults.users.length > 0 ? (
                searchResults.users.map((person) => (
                  <Link key={person.id} href={`/profile/${person.id}`} className="flex items-center gap-3 rounded-xl border border-white/10 p-4 hover:border-green-400/40 hover:bg-white/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C3AED]/20 text-sm font-bold text-[#7C3AED]">
                      {person.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-medium text-white">{person.name}</p>
                      <p className="text-sm text-[#94A3B8]">{person.college || person.city || "Nexora member"}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-[#94A3B8]">No people matched your search.</p>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#06B6D4]" />
              <h2 className="text-lg font-heading font-bold text-white">Trending This Week</h2>
            </div>
            {loading ? (
              <p className="text-sm text-[#94A3B8]">Loading trending ideas...</p>
            ) : (
              trendingIdeas.slice(0, 4).map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.id}`}>
                  <Card className="p-4 hover:border-[#06B6D4]/50 cursor-pointer transition-colors">
                    <h3 className="font-semibold text-white mb-1">{idea.title}</h3>
                    <p className="text-xs text-[#94A3B8]">{idea.upvotes_count} upvotes · {idea.domain}</p>
                  </Card>
                </Link>
              ))
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="text-lg font-heading font-bold text-white">Browse By Domain</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category.name} className="bg-[#100B1E] border border-white/5 rounded-xl p-3 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors">
                  <span className="text-sm font-medium text-[#F8FAFC]">{category.name}</span>
                  <span className="text-xs text-[#94A3B8] mt-1">{category.count} ideas</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-heading font-bold text-white">Featured Creators</h2>
            </div>
            {featuredCreators.map((idea) => (
              <Link key={idea.user_id} href={`/profile/${idea.user_id}`} className="flex items-center justify-between p-3 glass rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                    {idea.users?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{idea.users?.name || "Anonymous"}</p>
                    <p className="text-xs text-[#94A3B8]">Trending in {idea.domain}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#06B6D4]">View</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
