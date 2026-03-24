"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, AlertTriangle, Users, Database } from "lucide-react";
import { api } from "@/lib/api";

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/feed");
    } else if (user?.role === "admin") {
      api.get("/admin/stats").then(res => setStats(res.data)).catch(console.error);
    }
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-500/20 rounded-xl">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Admin Dashboard</h1>
          <p className="text-[#94A3B8]">Platform vitals and active reports queue.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-t-4 border-t-[#06B6D4]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#94A3B8] font-medium text-sm text-balance uppercase tracking-wider">Total Users</p>
            <Users className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_users || 0}</p>
        </Card>
        
        <Card className="p-6 border-t-4 border-t-[#7C3AED]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#94A3B8] font-medium text-sm text-balance uppercase tracking-wider">Total Ideas</p>
            <Database className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_ideas || 0}</p>
        </Card>
        
        <Card className="p-6 border-t-4 border-t-red-500">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#94A3B8] font-medium text-sm text-balance uppercase tracking-wider">Active Reports</p>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-white">0</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4">Recent Reports</h2>
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <p className="text-[#94A3B8] text-sm">No active reports requiring attention.</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4">Platform Actions</h2>
          <div className="space-y-4">
            <Button variant="outline" fullWidth className="justify-start">Export User Data (CSV)</Button>
            <Button variant="outline" fullWidth className="justify-start">Broadcast System Message</Button>
            <Button variant="outline" fullWidth className="justify-start">Configure AI Moderation Settings</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
