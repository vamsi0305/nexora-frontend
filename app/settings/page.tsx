"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { User, Bell, Shield, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    language: user?.language || "en",
  });

  const handleSaveProfile = async () => {
    try {
      await api.put("/users/me", { name: formData.name, bio: formData.bio });
      updateUser({ name: formData.name, bio: formData.bio });
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleLanguageChange = async (lang: string) => {
    try {
      await api.put("/users/me/language", null, { params: { lang } });
      setFormData({ ...formData, language: lang });
      updateUser({ language: lang });
      toast.success("Language updated");
    } catch {
      toast.error("Failed to update language");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-8">
      
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 shrink-0 space-y-2">
        <h2 className="text-xl font-heading font-bold text-white mb-6 px-2">Settings</h2>
        {[
          { id: "profile", label: "Edit Profile", icon: <User className="w-5 h-5" /> },
          { id: "preferences", label: "Preferences & Language", icon: <Globe className="w-5 h-5" /> },
          { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
          { id: "privacy", label: "Privacy & Security", icon: <Shield className="w-5 h-5" /> },
        ].map(menu => (
          <button
            key={menu.id}
            onClick={() => setActiveMenu(menu.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              activeMenu === menu.id
                ? "bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30"
                : "text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {menu.icon} {menu.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="flex-1">
        <Card className="p-6 md:p-8">
          
          {activeMenu === "profile" && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/10 pb-4">Public Profile</h3>
              <div className="flex items-center gap-6 mb-6">
                 <div className="w-20 h-20 rounded-full bg-[#100B1E] border border-white/20 flex items-center justify-center text-[#7C3AED] font-bold text-2xl">
                    {formData.name.charAt(0)}
                 </div>
                 <Button variant="outline" size="sm">Change Photo</Button>
              </div>
              <Input label="Display Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <div>
                <label className="text-sm font-medium text-[#F8FAFC] mb-2 block">Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-[#05050F]/50 border border-white/20 focus:border-[#06B6D4] rounded-xl p-3 text-[#F8FAFC] min-h-[100px] resize-none focus:outline-none"
                  placeholder="Tell the community about yourself..."
                />
              </div>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          )}

          {activeMenu === "preferences" && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/10 pb-4">Language & Region</h3>
              <div>
                <label className="text-sm font-medium text-[#F8FAFC] mb-3 block">Display Language</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleLanguageChange("en")}
                    className={`p-4 rounded-xl border text-center transition-colors ${formData.language === 'en' ? 'border-[#06B6D4] bg-[#06B6D4]/10 text-white' : 'border-white/10 text-[#94A3B8] hover:border-white/30'}`}
                  >
                    <p className="font-bold">English</p>
                    <p className="text-xs mt-1">Default</p>
                  </button>
                  <button 
                    onClick={() => handleLanguageChange("te")}
                    className={`p-4 rounded-xl border text-center transition-colors ${formData.language === 'te' ? 'border-[#06B6D4] bg-[#06B6D4]/10 text-white' : 'border-white/10 text-[#94A3B8] hover:border-white/30'}`}
                  >
                    <p className="font-bold">తెలుగు (Telugu)</p>
                    <p className="text-xs mt-1">Regional</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/10 pb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {["Email Notifications", "Push Notifications", "Weekly Digest", "Direct Messages"].map((item, i) => (
                  <div key={item} className="flex items-center justify-between py-3 border-b border-white/5">
                    <div>
                      <p className="text-sm font-medium text-white">{item}</p>
                      <p className="text-xs text-[#94A3B8]">Receive updates for {item.toLowerCase()}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-11 h-6 bg-[#05050F]/80 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#94A3B8] peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === "privacy" && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/10 pb-4">Privacy & Security</h3>
              <p className="text-sm text-[#94A3B8] mb-4">Manage your data and account security.</p>
              <div className="space-y-4">
                 <Button variant="outline" fullWidth className="justify-start">Download My Data</Button>
                 <Button variant="danger" fullWidth className="justify-start bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white">Delete Account</Button>
              </div>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
}
