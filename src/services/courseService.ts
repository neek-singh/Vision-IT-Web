import { supabase } from "@/lib/supabase";
import { Course, coursesData } from "@/data/courses";

const COURSES_TABLE = "courses";

export const courseService = {
  /**
   * Fetches all courses from Supabase.
   */
  async getCourses(): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from(COURSES_TABLE)
        .select("*")
        .order("title", { ascending: true });
      
      if (error) throw error;
      
      return data.map(course => ({
        ...course,
        fullName: course.full_name,
        isPopular: course.is_popular,
        careerPaths: course.career_paths,
        createdAt: course.created_at,
        updatedAt: course.updated_at,
      })) as Course[];
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  },

  /**
   * Real-time listener for all courses.
   */
  subscribeToCourses(callback: (courses: Course[]) => void) {
    const fetchCourses = async () => {
      const courses = await this.getCourses();
      callback(courses);
    };

    fetchCourses();

    const channel = supabase
      .channel("public:courses")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: COURSES_TABLE },
        () => fetchCourses()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Fetches a single course by ID or slug.
   */
  async getCourseById(id: string): Promise<Course | null> {
    try {
      const { data, error } = await supabase
        .from(COURSES_TABLE)
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        if (error.code !== "PGRST116") console.error("Error fetching course:", error);
        return null;
      }

      return {
        ...data,
        fullName: data.full_name,
        isPopular: data.is_popular,
        careerPaths: data.career_paths,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Course;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  },

  /**
   * Adds a new course to Supabase.
   */
  async createCourse(data: Omit<Course, "id">) {
    try {
      const id = data.title.toLowerCase().replace(/\s+/g, '-');
      
      const { error } = await supabase
        .from(COURSES_TABLE)
        .insert({
          id,
          title: data.title,
          description: data.description,
          duration: data.duration,
          level: data.level,
          category: data.category,
          image: data.image,
          icon: data.icon,
          syllabi: data.syllabi,
          career_paths: data.careerPaths,
          is_popular: data.isPopular || false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      return { success: true, id };
    } catch (error: any) {
      console.error("Error creating course:", error);
      throw new Error(error.message || "Failed to create course");
    }
  },

  /**
   * Updates an existing course in Supabase.
   */
  async updateCourse(id: string, data: Partial<Course>) {
    try {
      const updates: any = {
        updated_at: new Date().toISOString(),
      };

      if (data.title !== undefined) updates.title = data.title;
      if (data.description !== undefined) updates.description = data.description;
      if (data.duration !== undefined) updates.duration = data.duration;
      if (data.level !== undefined) updates.level = data.level;
      if (data.category !== undefined) updates.category = data.category;
      if (data.image !== undefined) updates.image = data.image;
      if (data.icon !== undefined) updates.icon = data.icon;
      if (data.syllabi !== undefined) updates.syllabi = data.syllabi;
      if (data.careerPaths !== undefined) updates.career_paths = data.careerPaths;
      if (data.isPopular !== undefined) updates.is_popular = data.isPopular;

      const { error } = await supabase
        .from(COURSES_TABLE)
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error updating course:", error);
      throw new Error(error.message || "Failed to update course");
    }
  },

  /**
   * Deletes a course from Supabase.
   */
  async deleteCourse(id: string) {
    try {
      const { error } = await supabase
        .from(COURSES_TABLE)
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting course:", error);
      throw new Error(error.message || "Failed to delete course");
    }
  },

  /**
   * Migrates the static courses from data/courses.ts to Supabase.
   */
  async migrateStaticCourses() {
    try {
      const courses = Object.values(coursesData);
      const rows = courses.map(course => ({
        id: course.id,
        title: course.title,
        full_name: course.fullName,
        description: course.description,
        duration: course.duration,
        level: course.level,
        category: course.category,
        image: course.image,
        icon: course.icon,
        syllabi: course.syllabi,
        career_paths: course.careerPaths,
        is_popular: course.isPopular || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from(COURSES_TABLE)
        .upsert(rows);

      if (error) throw error;
      return { success: true, count: courses.length };
    } catch (error: any) {
      console.error("Error migrating courses:", error);
      throw new Error(error.message || "Failed to migrate courses");
    }
  }
};
