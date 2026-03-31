"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { userService, UserProfile } from "@/services/userService";
import { adminService } from "@/services/adminService";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isInitialized: boolean | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<User | null>;
  registerWithEmail: (email: string, pass: string, metadata: any) => Promise<User | null>;
  logout: () => Promise<void>;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin Whitelist
const ADMIN_WHITELIST = [
  "ishwarsingh04080@gmail.com",
  "shubhamgupta.visionit@gmail.com",
  "admin@visionit.com"
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      // 1. Initial administrative check (Check if master admin exists)
      const config = await adminService.getAdminConfig();
      setIsInitialized(!!config);

      // 2. Initial Session Check
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      await handleUserChange(currentUser, config);

      // 3. Listener for Auth Changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const user = session?.user || null;
        await handleUserChange(user, config);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    const handleUserChange = async (currentUser: User | null, config: any) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        
        // Profile Synchronization
        // Supabase Auth stores metadata in user_metadata
        const userProfile = await userService.syncUserProfile(currentUser.id, {
          email: currentUser.email,
          displayName: currentUser.user_metadata?.full_name || currentUser.user_metadata?.display_name || "Student",
          photoURL: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || null,
        });
        setProfile(userProfile);
        
        // Unified Admin Check
        const isWhitelisted = ADMIN_WHITELIST.includes(currentUser.email || "");
        const isMasterConfig = config?.email === currentUser.email;
        const isProfileAdmin = userProfile?.role === "admin";
        
        setIsAdmin(isWhitelisted || isMasterConfig || isProfileAdmin);
      } else {
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
      }
    });
    if (error) throw error;
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const config = await adminService.getAdminConfig();
    const isCurrentlyInitialized = !!config;

    if (isCurrentlyInitialized === false) {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password: pass,
        options: {
          data: {
            role: "admin"
          }
        }
       });
      if (error) throw error;
      
      await adminService.initializeAdmin(email);
      setIsInitialized(true);
      return data.user;
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    return data.user;
  };

  const registerWithEmail = async (email: string, pass: string, metadata: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
    return data.user;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!user) return;
    
    // Update Auth Metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        display_name: data.displayName,
        avatar_url: data.photoURL
      }
    });
    if (authError) throw authError;

    // Update Profile Table
    await userService.updateProfile(user.id, data);
    const updated = await userService.getUserProfile(user.id);
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      isAdmin, 
      isInitialized,
      loginWithGoogle, 
      loginWithEmail,
      registerWithEmail,
      logout,
      updateProfile
    }}>
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
