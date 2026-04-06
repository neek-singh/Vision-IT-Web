import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "teacher" | "student";
  createdAt: string;
  photoURL?: string;
  displayName?: string;
  phoneNumber?: string;
  lastLogin?: string;
}

export const userService = {
  /**
   * Fetches a user profile from the 'users' table.
   */
  async getUserProfile(id: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        if (error.code !== "PGRST116") {
          console.error("Error fetching user profile:", error);
        }
        return null;
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: data.created_at,
        photoURL: data.photo_url,
        displayName: data.name,
        phoneNumber: data.phone_number,
        lastLogin: data.last_login,
      } as UserProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },

  /**
   * Updates specific profile fields.
   */
  async updateProfile(id: string, updates: Partial<UserProfile>) {
    try {
      const supabaseUpdates: any = {};
      
      if (updates.name !== undefined) supabaseUpdates.name = updates.name;
      if (updates.email !== undefined) supabaseUpdates.email = updates.email;
      if (updates.role !== undefined) supabaseUpdates.role = updates.role;

      const { error } = await supabase
        .from("profiles")
        .update(supabaseUpdates)
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
       console.error("Error updating profile:", error);
       throw error;
    }
  },

  /**
   * Fetches all registered user profiles (Admin only).
   */
  async getAllProfiles(): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return data.map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        createdAt: profile.created_at,
        photoURL: profile.photo_url,
        displayName: profile.name, // Mapping name to displayName for compatibility
        phoneNumber: profile.phone_number,
        lastLogin: profile.last_login,
      })) as UserProfile[];
    } catch (error) {
      console.error("Error fetching all profiles:", error);
      return [];
    }
  },

  /**
   * Stub for uploading user avatar
   */
  async uploadAvatar(id: string, file: File): Promise<string> {
    console.log("Stub uploadAvatar called for ID:", id, "with file:", file.name);
    // In a real app, this would upload to Supabase Storage and return the URL
    return "";
  }
};
