import { supabase } from "@/lib/supabase";

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  summary: string;
  image?: string;
  linkedIn?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

const FACULTY_TABLE = "faculty";

export const facultyService = {
  /**
   * Fetches all faculty members from Supabase.
   */
  async getFaculty(): Promise<FacultyMember[]> {
    try {
      const { data, error } = await supabase
        .from(FACULTY_TABLE)
        .select("*")
        .order("name", { ascending: true });
      
      if (error) throw error;
      
      return data.map(m => ({
        id: m.id,
        name: m.name,
        role: m.role,
        specialization: m.specialization,
        experience: m.experience,
        summary: m.summary,
        image: m.image,
        linkedIn: m.linked_in,
        email: m.email,
        createdAt: m.created_at,
        updatedAt: m.updated_at
      })) as FacultyMember[];
    } catch (error) {
      console.error("Error fetching faculty:", error);
      return [];
    }
  },

  /**
   * Real-time listener for faculty members.
   */
  subscribeToFaculty(callback: (faculty: FacultyMember[]) => void) {
    const fetchFaculty = async () => {
      const faculty = await this.getFaculty();
      callback(faculty);
    };

    fetchFaculty();

    const channel = supabase
      .channel(`public:${FACULTY_TABLE}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: FACULTY_TABLE },
        () => fetchFaculty()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Creates a new faculty member.
   */
  async createMember(member: Omit<FacultyMember, "createdAt" | "updatedAt">) {
    try {
      const { error } = await supabase
        .from(FACULTY_TABLE)
        .insert({
          id: member.id,
          name: member.name,
          role: member.role,
          specialization: member.specialization,
          experience: member.experience,
          summary: member.summary,
          image: member.image,
          linked_in: member.linkedIn,
          email: member.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error creating faculty member:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates an existing faculty member.
   */
  async updateMember(id: string, updates: Partial<FacultyMember>) {
    try {
      const dbUpdates: any = {
        updated_at: new Date().toISOString()
      };
      
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.role !== undefined) dbUpdates.role = updates.role;
      if (updates.specialization !== undefined) dbUpdates.specialization = updates.specialization;
      if (updates.experience !== undefined) dbUpdates.experience = updates.experience;
      if (updates.summary !== undefined) dbUpdates.summary = updates.summary;
      if (updates.image !== undefined) dbUpdates.image = updates.image;
      if (updates.linkedIn !== undefined) dbUpdates.linked_in = updates.linkedIn;
      if (updates.email !== undefined) dbUpdates.email = updates.email;

      const { error } = await supabase
        .from(FACULTY_TABLE)
        .update(dbUpdates)
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error updating faculty member:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Deletes a faculty member.
   */
  async deleteMember(id: string) {
    try {
      const { error } = await supabase
        .from(FACULTY_TABLE)
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting faculty member:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Migrates static faculty members for initialization.
   */
  async migrateStaticFaculty(members: FacultyMember[]) {
    try {
      for (const item of members) {
        // Check if exists
        const { data: existing } = await supabase
          .from(FACULTY_TABLE)
          .select("id")
          .eq("id", item.id)
          .limit(1);
        
        if (!existing || existing.length === 0) {
          await this.createMember(item);
        }
      }
      return { success: true };
    } catch (error: any) {
      console.error("Error migrating faculty:", error);
      throw new Error(error.message);
    }
  }
};
