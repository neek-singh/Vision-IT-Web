import { supabase } from "@/lib/supabase";
import { 
  mockTeachers, 
  mockStudents, 
  mockCertificates, 
  mockMarksheets 
} from "@/data/verification";

export const verificationService = {
  /**
   * Track admission query status from Supabase
   */
  async trackQuery(id: string, mobile: string) {
    const { data, error } = await supabase
      .from("admissions")
      .select("*")
      .eq("phone_number", mobile);
    
    if (error || !data || data.length === 0) return null;
    
    // Find the one that matches or most recent
    const bestMatch = data[0]; 
    return {
      type: "query",
      status: (bestMatch as any).status || "Pending",
      course: (bestMatch as any).course,
      studentName: (bestMatch as any).full_name,
      submittedAt: (bestMatch as any).submitted_at,
    };
  },

  /**
   * Verify Teacher
   */
  async verifyTeacher(id: string) {
    await this._simulateDelay();
    return mockTeachers.find(t => t.id.toLowerCase() === id.toLowerCase()) || null;
  },

  /**
   * Verify Student
   */
  async verifyStudent(id: string) {
    await this._simulateDelay();
    return mockStudents.find(s => s.id.toLowerCase() === id.toLowerCase()) || null;
  },

  /**
   * Verify Certificate
   */
  async verifyCertificate(id: string) {
    await this._simulateDelay();
    return mockCertificates.find(c => c.id.toLowerCase() === id.toLowerCase()) || null;
  },

  /**
   * Verify Marksheet
   */
  async verifyMarksheet(id: string) {
    await this._simulateDelay();
    return mockMarksheets.find(m => m.rollNo.toLowerCase() === id.toLowerCase()) || null;
  },

  /**
   * Simulate a small network delay for UX demo
   */
  async _simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, 800));
  }
};
