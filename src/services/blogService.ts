import { supabase } from "@/lib/supabase";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const BLOG_TABLE = "blogs";

export const blogService = {
  /**
   * Fetches all blog posts from Supabase.
   */
  async getPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from(BLOG_TABLE)
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        author: post.author,
        category: post.category,
        readTime: post.read_time,
        image: post.image,
        tags: post.tags,
        isFeatured: post.is_featured,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      })) as BlogPost[];
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  },

  /**
   * Fetches a single blog post by ID.
   */
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from(BLOG_TABLE)
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        if (error.code !== "PGRST116") console.error("Error fetching blog by ID:", error);
        return null;
      }

      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: data.date,
        author: data.author,
        category: data.category,
        readTime: data.read_time,
        image: data.image,
        tags: data.tags,
        isFeatured: data.is_featured,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as BlogPost;
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      return null;
    }
  },

  /**
   * Creates a new blog post.
   */
  async createPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) {
    try {
      const { data: result, error } = await supabase
        .from(BLOG_TABLE)
        .insert({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          date: data.date,
          author: data.author,
          category: data.category,
          read_time: data.readTime,
          image: data.image,
          tags: data.tags,
          is_featured: data.isFeatured || false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: result.id };
    } catch (error: any) {
      console.error("Error creating blog:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Updates an existing blog post.
   */
  async updatePost(id: string, data: Partial<BlogPost>) {
    try {
      const updates: any = {
        updated_at: new Date().toISOString(),
      };
      
      if (data.title !== undefined) updates.title = data.title;
      if (data.excerpt !== undefined) updates.excerpt = data.excerpt;
      if (data.content !== undefined) updates.content = data.content;
      if (data.date !== undefined) updates.date = data.date;
      if (data.author !== undefined) updates.author = data.author;
      if (data.category !== undefined) updates.category = data.category;
      if (data.readTime !== undefined) updates.read_time = data.readTime;
      if (data.image !== undefined) updates.image = data.image;
      if (data.tags !== undefined) updates.tags = data.tags;
      if (data.isFeatured !== undefined) updates.is_featured = data.isFeatured;

      const { error } = await supabase
        .from(BLOG_TABLE)
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error updating blog:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Deletes a blog post.
   */
  async deletePost(id: string) {
    try {
      const { error } = await supabase
        .from(BLOG_TABLE)
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting blog:", error);
      throw new Error(error.message);
    }
  },

  /**
   * Real-time listener for blog posts.
   */
  subscribeToPosts(callback: (posts: BlogPost[]) => void) {
    const fetchPosts = async () => {
      const posts = await this.getPosts();
      callback(posts);
    };

    fetchPosts();

    const channel = supabase
      .channel("public:blogs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: BLOG_TABLE },
        () => fetchPosts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Migrates static blog data to Supabase.
   */
  async migrateStaticData(posts: BlogPost[]) {
    try {
      for (const post of posts) {
        // Check if exists
        const { data: existing } = await supabase
          .from(BLOG_TABLE)
          .select("id")
          .eq("title", post.title)
          .single();
        
        if (!existing) {
          await this.createPost(post);
        }
      }
      return { success: true };
    } catch (error: any) {
      console.error("Error migrating blogs:", error);
      throw new Error(error.message);
    }
  }
};
