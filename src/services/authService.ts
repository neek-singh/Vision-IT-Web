import { supabase } from "@/lib/supabase";

export type UserRole = "admin" | "user";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export const authService = {
  /**
   * User login with Email + Password
   */
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * User registration with Email + Password
   */
  async signUpWithEmail(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Login with Google OAuth
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Admin Login Step 1: Send OTP (Magic Link)
   * First checks if email is whitelisted
   */
  async sendAdminOTP(email: string) {
    // 1. Check whitelist first via RPC
    const { data: isWhitelisted, error: rpcError } = await supabase.rpc(
      "is_admin_whitelisted",
      { check_email: email }
    );

    if (rpcError) throw rpcError;
    if (!isWhitelisted) {
      throw new Error("This email is not authorized for Admin access.");
    }

    // 2. Send OTP (Magic Link/OTP)
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Use 'otp' for code-based or empty for magic link
        // Here we use default Magic Link behavior as per plan, but can be switched to OTP code
        emailRedirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });
    
    if (error) throw error;
    return data;
  },

  /**
   * Verify Admin OTP Code (If using code-based OTP)
   */
  async verifyOTP(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "magiclink", // or 'signup', 'invite', 'recovery', 'email'
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign Out
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get Current Session User Profile
   */
  async getCurrentProfile(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
    };
  },
};
