import { supabase } from "@/lib/supabase";

export interface AdmissionApplication {
  id?: string;
  userId?: string; // Link to authenticated user
  fullName: string;
  fatherName: string;
  phoneNumber: string;
  email?: string;
  course: string;
  address: string;
  dob: string;
  status: "pending" | "contacted" | "enrolled" | "rejected";
  submittedAt: string;
  source: string;
  metadata?: Record<string, any>;
}

export interface AdmissionData {
  userId?: string;
  fullName: string;
  fatherName: string;
  phoneNumber: string;
  email?: string;
  course: string;
  address: string;
  dob: string;
}

const ADMISSIONS_TABLE = "admissions";

export const admissionService = {
  /**
   * Submits a new student admission application to Supabase.
   */
  async submitApplication(data: AdmissionData, metadata?: Record<string, any>) {
    try {
      const { data: result, error } = await supabase
        .from(ADMISSIONS_TABLE)
        .insert({
          user_id: data.userId || null,
          full_name: data.fullName,
          father_name: data.fatherName,
          phone_number: data.phoneNumber,
          email: data.email || null,
          course: data.course,
          address: data.address,
          dob: data.dob,
          status: "pending",
          submitted_at: new Date().toISOString(),
          source: "website_online_form",
          metadata: metadata || {},
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: result.id };
    } catch (error: any) {
      console.error("Error submitting admission:", error);
      throw new Error(error.message || "Failed to submit application");
    }
  },

  /**
   * Checks if a phone number has already submitted an application.
   */
  async checkDuplicate(phoneNumber: string) {
    const { data, error } = await supabase
      .from(ADMISSIONS_TABLE)
      .select("id")
      .eq("phone_number", phoneNumber)
      .limit(1);
    
    if (error) {
      console.error("Error checking duplicate:", error);
      return false;
    }
    return data.length > 0;
  },

  /**
   * Updates the status of an admission application.
   */
  async updateStatus(id: string, status: AdmissionApplication["status"]) {
    try {
      const { error } = await supabase
        .from(ADMISSIONS_TABLE)
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error updating admission status:", error);
      throw new Error(error.message || "Failed to update status");
    }
  },

  /**
   * Real-time listener for all admissions.
   */
  subscribeToAdmissions(callback: (admissions: AdmissionApplication[]) => void) {
    const fetchAdmissions = async () => {
      const { data, error } = await supabase
        .from(ADMISSIONS_TABLE)
        .select("*")
        .order("submitted_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching admissions:", error);
        return;
      }

      callback(data.map(m => ({
        id: m.id,
        userId: m.user_id,
        fullName: m.full_name,
        fatherName: m.father_name,
        phoneNumber: m.phone_number,
        email: m.email,
        course: m.course,
        address: m.address,
        dob: m.dob,
        status: m.status,
        submittedAt: m.submitted_at,
        source: m.source,
        metadata: m.metadata
      })) as AdmissionApplication[]);
    };

    fetchAdmissions();

    const channel = supabase
      .channel("public:admissions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: ADMISSIONS_TABLE },
        () => fetchAdmissions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Reads a single student status by phone number.
   */
  async getStudentStatus(phoneNumber: string) {
    const { data, error } = await supabase
      .from(ADMISSIONS_TABLE)
      .select("*")
      .eq("phone_number", phoneNumber)
      .order("submitted_at", { ascending: false })
      .limit(1);
    
    if (error || data.length === 0) return null;
    
    const m = data[0];
    return {
      id: m.id,
      userId: m.user_id,
      fullName: m.full_name,
      fatherName: m.father_name,
      phoneNumber: m.phone_number,
      email: m.email,
      course: m.course,
      address: m.address,
      dob: m.dob,
      status: m.status,
      submittedAt: m.submitted_at,
      source: m.source,
      metadata: m.metadata
    } as AdmissionApplication;
  },

  /**
   * Fetches all applications for a student by userId or phoneNumber.
   */
  async getStudentApplications(userId?: string, phoneNumber?: string): Promise<AdmissionApplication[]> {
    try {
      let query = supabase.from(ADMISSIONS_TABLE).select("*");
      
      if (userId && phoneNumber) {
        query = query.or(`user_id.eq.${userId},phone_number.eq.${phoneNumber}`);
      } else if (userId) {
        query = query.eq("user_id", userId);
      } else if (phoneNumber) {
        query = query.eq("phone_number", phoneNumber);
      } else {
        return [];
      }

      const { data, error } = await query.order("submitted_at", { ascending: false });
      
      if (error) throw error;
      
      return data.map(m => ({
        id: m.id,
        userId: m.user_id,
        fullName: m.full_name,
        fatherName: m.father_name,
        phoneNumber: m.phone_number,
        email: m.email,
        course: m.course,
        address: m.address,
        dob: m.dob,
        status: m.status,
        submittedAt: m.submitted_at,
        source: m.source,
        metadata: m.metadata
      })) as AdmissionApplication[];
    } catch (error) {
      console.error("Error fetching student applications:", error);
      return [];
    }
  },

  /**
   * Real-time listener for a specific student status.
   */
  subscribeToStudentStatus(phoneNumber: string, callback: (application: AdmissionApplication | null) => void) {
    const fetchStatus = async () => {
      const status = await this.getStudentStatus(phoneNumber);
      callback(status);
    };

    fetchStatus();

    const channel = supabase
      .channel(`status:${phoneNumber}`)
      .on(
        "postgres_changes",
        { 
          event: "*", 
          schema: "public", 
          table: ADMISSIONS_TABLE,
          filter: `phone_number=eq.${phoneNumber}` 
        },
        () => fetchStatus()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Fetches summary statistics for admissions.
   */
  async getStats() {
    try {
      const { count: total, error: totalError } = await supabase
        .from(ADMISSIONS_TABLE)
        .select('*', { count: 'exact', head: true });
      
      const { count: pending, error: pendingError } = await supabase
        .from(ADMISSIONS_TABLE)
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: enrolled, error: enrolledError } = await supabase
        .from(ADMISSIONS_TABLE)
        .select('*', { count: 'exact', head: true })
        .eq('status', 'enrolled');

      if (totalError || pendingError || enrolledError) throw totalError || pendingError || enrolledError;

      return {
        total: total || 0,
        pending: pending || 0,
        enrolled: enrolled || 0
      };
    } catch (error) {
      console.error("Error fetching admission stats:", error);
      return { total: 0, pending: 0, enrolled: 0 };
    }
  }
};
