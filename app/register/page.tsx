"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { Upload, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const DOMAINS = [
  "Technology", "Environment", "Health", "Education", 
  "Infrastructure", "Arts & Culture", "Business", "Social Impact"
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const { register, loading } = useAuth();
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    college: "",
    department: "",
    year: "",
    city: "Kakinada",
    domain_interests: [] as string[],
    avatar_file: null as File | null,
    avatar_preview: "",
  });

  const nextStep = () => setStep((s) => Math.min(6, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const success = await register(email, password, {
      full_name: formData.name,
      phone_number: formData.phone_number || "0000000000",
      college: formData.college,
      department: formData.department,
      year: formData.year,
      city: formData.city,
      domain_interests: formData.domain_interests
    });
    
    if (success) {
      router.push("/feed");
    }
  };

  const toggleDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domain_interests: prev.domain_interests.includes(domain)
        ? prev.domain_interests.filter(d => d !== domain)
        : [...prev.domain_interests, domain]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ 
        ...formData, 
        avatar_file: file,
        avatar_preview: URL.createObjectURL(file) 
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-heading font-bold mb-4">Personal Details</h2>
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#7C3AED]/50 flex items-center justify-center bg-[#05050F]/50 overflow-hidden relative group">
                {formData.avatar_preview ? (
                  <img src={formData.avatar_preview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="text-[#7C3AED] w-8 h-8 group-hover:scale-110 transition-transform" />
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <span className="text-xs text-[#94A3B8]">Upload Photo (Optional)</span>
            </div>
            <Input label="Full Name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} autoFocus />
            <Input label="Phone Number (Optional)" placeholder="+91 90000 00000" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
            <Button fullWidth onClick={nextStep} disabled={!formData.name}>Next</Button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-heading font-bold mb-4">Email Address</h2>
            <form onSubmit={(e) => { e.preventDefault(); if (email) nextStep(); }} className="space-y-6">
              <Input type="email" label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
              <div className="flex gap-4">
                <Button variant="ghost" onClick={prevStep} type="button">Back</Button>
                <Button fullWidth type="submit" disabled={!email}>Next</Button>
              </div>
            </form>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-heading font-bold mb-4">Secure your account</h2>
            <div className="relative">
              <Input label="Password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
              <button type="button" className="absolute right-3 top-9 text-[#94A3B8]" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Input label="Confirm Password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button fullWidth onClick={nextStep} disabled={!password || password !== confirmPassword}>Next</Button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-heading font-bold mb-4">College Details</h2>
            <Input label="College / University" placeholder="JNTU Kakinada" value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Department" placeholder="CSE" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
              <Input label="Year" placeholder="3rd Year" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button fullWidth onClick={nextStep}>Next</Button>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-heading font-bold mb-2">What interests you?</h2>
            <p className="text-sm text-[#94A3B8] mb-4">Select at least one domain.</p>
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map(domain => (
                <button
                  key={domain}
                  onClick={() => toggleDomain(domain)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.domain_interests.includes(domain) ? "bg-[#7C3AED] text-white" : "bg-[#100B1E] border border-white/10 text-[#94A3B8] hover:border-[#7C3AED]/50"
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <Button variant="ghost" onClick={prevStep}>Back</Button>
              <Button fullWidth onClick={nextStep} disabled={formData.domain_interests.length === 0}>Next</Button>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-heading font-bold mb-4">Your City</h2>
            <Input label="Base City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep} disabled={loading}>Back</Button>
              <Button fullWidth onClick={handleRegister} disabled={loading}>
                {loading ? "Creating Account..." : "Finish Setup"}
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center -mt-10 px-4">
      <div className="w-full max-w-md glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
            initial={{ width: "16%" }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="mb-8">
          <span className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">Step {step} of 6</span>
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {step === 1 && (
          <div className="mt-8 text-center pt-6 border-t border-white/10">
            <p className="text-sm text-[#94A3B8]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#06B6D4] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
