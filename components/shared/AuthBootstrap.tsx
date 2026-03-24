"use client";

import { useEffect } from "react";
import { api, setAuthToken } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export const AuthBootstrap = () => {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!token) {
      setAuthToken(null);
      return;
    }

    setAuthToken(token);

    if (!isAuthenticated) {
      api.get("/users/me")
        .then((res) => {
          setAuth(res.data, token);
        })
        .catch(() => {
          setAuthToken(null);
          logout();
        });
    }
  }, [token, isAuthenticated, setAuth, logout]);

  return null;
};
