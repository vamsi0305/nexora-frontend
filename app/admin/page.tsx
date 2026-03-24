"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, AlertTriangle, Users, Database } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface AdminStats {
  total_users: number;
  total_ideas: number;
  total_reports: number;
  pending_reports: number;
}

interface ReportItem {
  id: string;
  item_type: string;
  item_id: string;
  reason: string;
  details?: string;
  status: string;
  created_at?: string;
}

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/feed");
      return;
    }

    if (!user || user.role !== "admin") {
      return;
    }

    Promise.all([api.get("/admin/stats"), api.get("/admin/reports")])
      .then(([statsRes, reportsRes]) => {
        setStats(statsRes.data);
        setReports(reportsRes.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  const handleBanUser = async (report: ReportItem) => {
    if (report.item_type !== "user") {
      toast.error("This report is not tied to a user.");
      return;
    }

    try {
      await api.put(`/admin/users/${report.item_id}/ban`);
      toast.success("User banned");
    } catch {
      toast.error("Failed to ban user");
    }
  };

  const handleDeleteIdea = async (report: ReportItem) => {
    if (report.item_type !== "idea") {
      toast.error("This report is not tied to an idea.");
      return;
    }

    try {
      await api.delete(`/admin/ideas/${report.item_id}`);
      toast.success("Idea deleted");
      setReports((prev) => prev.filter((item) => item.id !== report.id));
    } catch {
      toast.error("Failed to delete idea");
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-500/20 rounded-xl">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Admin Dashboard</h1>
          <p className="text-[#94A3B8]">Platform vitals, reports, and moderation actions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-t-4 border-t-[#06B6D4]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#94A3B8] font-medium text-sm uppercase tracking-wider">Total Users</p>
            <Users className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_users || 0}</p>
        </Card>

        <Card className="p-6 border-t-4 border-t-[#7C3AED]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#94A3B8] font-medium text-sm uppercase tracking-wider">Total Ideas</p>
            <Database className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_ideas || 0}</p>
        </Card>

        <Card className="p-6 border-t-4 border-t-red-500">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#94A3B8] font-medium text-sm uppercase tracking-wider">Total Reports</p>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.total_reports || 0}</p>
        </Card>

        <Card className="p-6 border-t-4 border-t-orange-500">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#94A3B8] font-medium text-sm uppercase tracking-wider">Pending Reports</p>
            <ShieldAlert className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.pending_reports || 0}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4">Recent Reports</h2>
          {loading ? (
            <p className="text-sm text-[#94A3B8]">Loading reports...</p>
          ) : reports.length > 0 ? (
            <div className="space-y-4">
              {reports.slice(0, 8).map((report) => (
                <div key={report.id} className="rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{report.reason}</p>
                      <p className="text-sm text-[#94A3B8] mt-1">{report.details || `${report.item_type} reported`}</p>
                    </div>
                    <span className="text-xs uppercase tracking-wide text-[#06B6D4]">{report.status}</span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    {report.item_type === "user" && (
                      <Button size="sm" variant="danger" onClick={() => handleBanUser(report)}>Ban User</Button>
                    )}
                    {report.item_type === "idea" && (
                      <Button size="sm" variant="outline" onClick={() => handleDeleteIdea(report)}>Delete Idea</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-[#94A3B8] text-sm">No active reports requiring attention.</p>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4">Platform Actions</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-medium text-white">Moderation Queue</p>
              <p className="text-sm text-[#94A3B8] mt-1">Review pending reports and take action directly from this dashboard.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4">
              <p className="font-medium text-white">Platform Snapshot</p>
              <p className="text-sm text-[#94A3B8] mt-1">Track how quickly reports, ideas, and user activity are growing.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
