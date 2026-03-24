"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, resetPassword, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const success = await login(email, password);
    if (success) {
      router.push("/feed");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }
    await resetPassword(email);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center -mt-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center mb-4">
            <span className="font-heading font-bold text-white text-2xl">N</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-[#94A3B8]">Sign in to Nexora using your email.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <div className="relative">
            <Input 
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-[#94A3B8] hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#06B6D4] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={loading || !email || !password}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#94A3B8]">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#06B6D4] hover:underline font-medium">
              Join Nexora
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
