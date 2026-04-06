"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { authService, AuthUser } from "@/services/authService";
import { userService } from "@/services/userService";

interface AuthContextType {
  user: User | null;
  profile: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  isUser: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role === "admin";
  const isUser = profile?.role === "user";

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      
      // 1. Get Initial Session
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
        setLoading(false);
      }

      // 2. Set up Auth Listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const updatedUser = session?.user || null;
          setUser(updatedUser);

          if (updatedUser) {
            await fetchProfile(updatedUser.id);
          } else {
            setProfile(null);
            setLoading(false);
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    initAuth();
  }, []);

  const fetchProfile = async (id: string) => {
    try {
      const userProfile = await userService.getUserProfile(id);
      if (userProfile) {
        setProfile({
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role,
        });
      }
    } catch (error) {
      console.error("Error fetching profile in AuthContext:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    await authService.signOut();
    setUser(null);
    setProfile(null);
    setLoading(false);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        isUser,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
