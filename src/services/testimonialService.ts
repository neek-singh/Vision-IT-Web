import { supabase } from "@/lib/supabase";
import { defaultTestimonials } from "@/data/testimonials";

export interface Testimonial {
  id?: string;
  name: string;
  course: string;
  content: string;
  avatar: string;
  rating: number;
  year: string;
  is_published: boolean;
  createdAt?: string;
}

const TESTIMONIALS_TABLE = "testimonials";

export const testimonialService = {
  /**
   * Fetches all testimonials from Supabase.
   */
  async getTestimonials(onlyPublished: boolean = false): Promise<Testimonial[]> {
    try {
      let query = supabase
        .from(TESTIMONIALS_TABLE)
        .select("*")
        .order("created_at", { ascending: false });
      
      if (onlyPublished) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      if (!data || data.length === 0) {
        return defaultTestimonials as any; // Fallback to static data
      }

      return data.map(t => ({
        ...t,
        is_published: t.is_published ?? true
      })) as Testimonial[];
    } catch (error) {
      console.error("Error fetching testimonials, falling back to static data:", error);
      return defaultTestimonials as any;
    }
  },

  /**
   * Toggles testimonial visibility.
   */
  async toggleVisibility(id: string, isPublished: boolean) {
    try {
      const { error } = await supabase
        .from(TESTIMONIALS_TABLE)
        .update({ is_published: isPublished })
        .eq("id", id);
      
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error toggling visibility:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Real-time listener for testimonials.
   */
  subscribeToTestimonials(callback: (testimonials: Testimonial[]) => void) {
    const fetchTestimonials = async () => {
      const testimonials = await this.getTestimonials();
      callback(testimonials);
    };

    fetchTestimonials();

    const channel = supabase
      .channel(`public:${TESTIMONIALS_TABLE}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: TESTIMONIALS_TABLE },
        () => fetchTestimonials()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Creates a new testimonial.
   */
  async createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt">) {
    try {
      const { data, error } = await supabase
        .from(TESTIMONIALS_TABLE)
        .insert(testimonial)
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: data.id };
    } catch (error: any) {
      console.error("Error creating testimonial:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates an existing testimonial.
   */
  async updateTestimonial(id: string, updates: Partial<Testimonial>) {
    try {
      const { error } = await supabase
        .from(TESTIMONIALS_TABLE)
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error updating testimonial:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Deletes a testimonial.
   */
  async deleteTestimonial(id: string) {
    try {
      const { error } = await supabase
        .from(TESTIMONIALS_TABLE)
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting testimonial:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Migrates static testimonials for initialization.
   */
  async migrateStaticTestimonials(testimonials: Testimonial[]) {
    try {
      for (const item of testimonials) {
        // Check if exists by name and content
        const { data: existing } = await supabase
          .from(TESTIMONIALS_TABLE)
          .select("id")
          .eq("name", item.name)
          .eq("content", item.content)
          .limit(1);
        
        if (!existing || existing.length === 0) {
          await this.createTestimonial(item);
        }
      }
      return { success: true };
    } catch (error: any) {
      console.error("Error migrating testimonials:", error);
      throw new Error(error.message);
    }
  }
};
