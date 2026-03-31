import { supabase } from "@/lib/supabase";

const ADMIN_CONFIG_ID = "admin_config";

export interface AdminConfig {
  email: string;
  isInitialized: boolean;
  createdAt: string;
}

export const adminService = {
  /**
   * Checks if the master admin has been initialized.
   */
  async getAdminConfig(): Promise<AdminConfig | null> {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("id", ADMIN_CONFIG_ID)
        .single();
      
      if (error && error.code !== "PGRST116") { // PGRST116 is code for 'no rows returned'
        console.error("Error fetching admin config:", error);
        return null;
      }
      
      return data?.value as AdminConfig || null;
    } catch (error) {
      console.error("Error getting admin config:", error);
      return null;
    }
  },

  /**
   * Initializes the master admin configuration.
   */
  async initializeAdmin(email: string) {
    try {
      const config: AdminConfig = {
        email,
        isInitialized: true,
        createdAt: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("settings")
        .upsert({
          id: ADMIN_CONFIG_ID,
          value: config,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error initializing admin:", error);
      throw error;
    }
  }
};
