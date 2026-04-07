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
  isInitialized: boolean;
  loginWithEmail: (email: string, password: string) => Promise<any>;
  registerWithEmail: (email: string, password: string, metadata: any) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
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
        await fetchProfile(currentUser.id, currentUser);
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
            await fetchProfile(updatedUser.id, updatedUser);
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

  const fetchProfile = async (id: string, currentUser?: User) => {
    try {
      const userProfile = await userService.getUserProfile(id);
      if (userProfile) {
        setProfile({
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role,
          photoURL: userProfile.photoURL,
          displayName: userProfile.displayName,
          phoneNumber: userProfile.phoneNumber,
          lastLogin: userProfile.lastLogin,
          createdAt: userProfile.createdAt,
        });
      } else if (currentUser) {
        // Fallback for missing profile record
        setProfile({
          id: currentUser.id,
          email: currentUser.email || "",
          name: currentUser.user_metadata?.full_name || currentUser.email?.split("@")[0] || "Student",
          role: "user",
          displayName: currentUser.user_metadata?.full_name || currentUser.email?.split("@")[0] || "Student",
          createdAt: currentUser.created_at,
        });
      }
    } catch (error) {
      console.error("Error fetching profile in AuthContext:", error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    const data = await authService.signInWithEmail(email, password);
    return data;
  };

  const registerWithEmail = async (email: string, password: string, metadata: any) => {
    const data = await authService.signUpWithEmail(email, password, metadata);
    return data;
  };

  const loginWithGoogle = async () => {
    const data = await authService.signInWithGoogle();
    return data;
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
      await fetchProfile(user.id, user);
    }
  };

  const updateProfile = async (updates: Partial<AuthUser>) => {
    if (user) {
      await userService.updateProfile(user.id, updates as any);
      await refreshProfile();
    }
  };

  const logout = signOut;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        isUser,
        isInitialized: !loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        signOut,
        logout,
        updateProfile,
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
