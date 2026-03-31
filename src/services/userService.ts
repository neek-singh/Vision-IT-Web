import { supabase } from "@/lib/supabase";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber?: string;
  role: "student" | "admin" | "teacher";
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export const userService = {
  /**
   * Fetches a user profile from Supabase profiles table.
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();
      
      if (error) {
        if (error.code !== "PGRST116") {
          console.error("Error fetching user profile:", error);
        }
        return null;
      }

      return {
        uid: data.id,
        email: data.email,
        displayName: data.display_name,
        photoURL: data.photo_url,
        phoneNumber: data.phone_number,
        role: data.role,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        lastLogin: data.last_login,
      } as UserProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },

  /**
   * Synchronizes auth state with Supabase profiles.
   * Creates if doesn't exist, updates lastLogin if it does.
   */
  async syncUserProfile(uid: string, data: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const existingProfile = await this.getUserProfile(uid);

      if (!existingProfile) {
        // Initial Enrollment: Assign default 'student' role
        const newProfile = {
          id: uid,
          email: data.email || null,
          display_name: data.displayName || "Student",
          photo_url: data.photoURL || null,
          phone_number: data.phoneNumber || "",
          role: data.role || "student",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        const { error: insertError } = await supabase
          .from("profiles")
          .insert(newProfile);

        if (insertError) throw insertError;
        
        return {
          uid,
          ...data,
          displayName: newProfile.display_name,
          photoURL: newProfile.photo_url,
          role: newProfile.role as "student" | "admin" | "teacher",
          createdAt: newProfile.created_at,
          updatedAt: newProfile.updated_at,
          lastLogin: newProfile.last_login,
        } as UserProfile;
      } else {
// ... existing sync logic ...
        // Sync Login Activity
        const updatedPhotoURL = existingProfile.photoURL || data.photoURL || null;
        const now = new Date().toISOString();
        
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            last_login: now,
            updated_at: now,
            display_name: data.displayName || existingProfile.displayName,
            photo_url: updatedPhotoURL,
          })
          .eq("id", uid);

        if (updateError) throw updateError;

        return { 
          ...existingProfile, 
          ...data, 
          photoURL: updatedPhotoURL,
          lastLogin: now,
          updatedAt: now
        } as UserProfile;
      }
    } catch (error) {
      console.error("Error syncing user profile:", error);
      return null;
    }
  },

  /**
   * Admin Promotion: Manually set a user's role.
   */
  async setUserRole(uid: string, role: "student" | "admin") {
     try {
       const { error } = await supabase
         .from("profiles")
         .update({
           role,
           updated_at: new Date().toISOString(),
         })
         .eq("id", uid);
       
       if (error) throw error;
       return { success: true };
     } catch (err) {
       console.error("Error updating user role:", err);
       throw err;
     }
  },

  /**
   * Uploads a profile image to Supabase Storage and updates the user profile.
   */
  async uploadAvatar(uid: string, file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`; // Simple filename in root of bucket or subfolder

      // 1. Upload the file
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // 3. Update Profile
      await this.updateProfile(uid, { photoURL: publicUrl });
      
      return publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  },

  /**
   * Updates specific profile fields.
   */
  async updateProfile(uid: string, updates: Partial<UserProfile>) {
    try {
      const supabaseUpdates: any = {
        updated_at: new Date().toISOString(),
      };
      
      if (updates.displayName !== undefined) supabaseUpdates.display_name = updates.displayName;
      if (updates.photoURL !== undefined) supabaseUpdates.photo_url = updates.photoURL;
      if (updates.phoneNumber !== undefined) supabaseUpdates.phone_number = updates.phoneNumber;
      if (updates.email !== undefined) supabaseUpdates.email = updates.email;
      if (updates.role !== undefined) supabaseUpdates.role = updates.role;

      const { error } = await supabase
        .from("profiles")
        .update(supabaseUpdates)
        .eq("id", uid);
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
       console.error("Error updating profile:", error);
       throw error;
    }
  },

  /**
   * Fetches all registered user profiles.
   */
  async getAllProfiles(): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return data.map(profile => ({
        uid: profile.id,
        email: profile.email,
        displayName: profile.display_name,
        photoURL: profile.photo_url,
        phoneNumber: profile.phone_number,
        role: profile.role,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        lastLogin: profile.last_login,
      })) as UserProfile[];
    } catch (error) {
      console.error("Error fetching all profiles:", error);
      return [];
    }
  }
};
