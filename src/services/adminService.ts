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
  },

  /**
   * Fetches the dashboard summary statistics in a single call.
   */
  async getDashboardSummary() {
    try {
      const { data, error } = await supabase.rpc("get_dashboard_summary");
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return {
          totalAdmissions: 0,
          totalBlogs: 0,
          unreadInquiries: 0,
          totalCourses: 0
        };
      }

      const summary = data[0];
      return {
        totalAdmissions: Number(summary.total_admissions),
        totalBlogs: Number(summary.total_blogs),
        unreadInquiries: Number(summary.unread_inquiries),
        totalCourses: Number(summary.total_courses)
      };
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      return {
        totalAdmissions: 0,
        totalBlogs: 0,
        unreadInquiries: 0,
        totalCourses: 0
      };
    }
  }
};
