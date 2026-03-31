import { supabase } from "@/lib/supabase";

const ADMIN_CONFIG_TABLE = "admin_config";
const MAIN_CONFIG_ID = "main_config";

export interface AdminConfig {
  id: string;
  email: string;
  initializedAt: string;
  updatedAt: string;
}

export const adminService = {
  /**
   * Checks if the master admin has been initialized from admin_config table.
   */
  async getAdminConfig(): Promise<AdminConfig | null> {
    try {
      const { data, error } = await supabase
        .from(ADMIN_CONFIG_TABLE)
        .select("*")
        .eq("id", MAIN_CONFIG_ID)
        .limit(1);
      
      if (error) {
        console.error("Error fetching admin config:", error);
        return null;
      }
      
      if (!data || data.length === 0) return null;
      
      const config = data[0];
      return {
        id: config.id,
        email: config.email,
        initializedAt: config.initialized_at,
        updatedAt: config.updated_at
      } as AdminConfig;
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
      const now = new Date().toISOString();
      const { error } = await supabase
        .from(ADMIN_CONFIG_TABLE)
        .upsert({
          id: MAIN_CONFIG_ID,
          email: email,
          initialized_at: now,
          updated_at: now
        });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error initializing admin:", error);
      throw error;
    }
  }
};
