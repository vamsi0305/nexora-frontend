"use client";

import { useState } from "react";
import { api, setAuthToken } from "../lib/api";
import { useAuthStore } from "../lib/store";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setAuth, logout: clearAuth } = useAuthStore();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { access_token, user } = res.data;
      setAuthToken(access_token);
      setAuth(user, access_token);
      toast.success("Logged in successfully!");
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (email: string, password: string, userData: any) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { email, password, ...userData });
      const { access_token, user } = res.data;
      setAuthToken(access_token);
      setAuth(user, access_token);
      toast.success("Account created successfully!");
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {}
    clearAuth();
    setAuthToken(null);
    toast.success("Logged out successfully");
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/recovery", { email });
      toast.success(res.data?.message || "Recovery email sent");
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Failed to send recovery email");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, register: registerUser, logout, resetPassword, loading };
};
