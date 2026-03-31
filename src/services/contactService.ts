import { supabase } from "@/lib/supabase";

export interface ContactMessage {
  id?: string;
  name: string;
  mobile: string;
  course: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  isStarred?: boolean;
  receivedAt?: string;
}

export const contactService = {
  /**
   * Submits a message from the public contact form.
   */
  async submitMessage(data: Omit<ContactMessage, "status" | "receivedAt">) {
    try {
      const { data: result, error } = await supabase
        .from("contact_messages")
        .insert({
          ...data,
          status: "unread",
          is_starred: false,
          received_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: result.id };
    } catch (error: any) {
      console.error("Error submitting contact message:", error);
      throw new Error(error.message || "Failed to send message");
    }
  },

  /**
   * Real-time listener for incoming inquiries.
   * NOTE: In Supabase, we fetch initial data THEN subscribe to changes.
   */
  subscribeToMessages(callback: (messages: ContactMessage[]) => void) {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("received_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      callback(data.map(m => ({
        id: m.id,
        name: m.name,
        mobile: m.mobile,
        course: m.course,
        message: m.message,
        status: m.status,
        isStarred: m.is_starred,
        receivedAt: m.received_at
      })) as ContactMessage[]);
    };

    fetchMessages();

    const channel = supabase
      .channel("public:contact_messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Updates the status or priority of an inquiry.
   */
  async updateMessageStatus(id: string, updates: Partial<ContactMessage>) {
    try {
      const supabaseUpdates: any = {};
      if (updates.status !== undefined) supabaseUpdates.status = updates.status;
      if (updates.isStarred !== undefined) supabaseUpdates.is_starred = updates.isStarred;

      const { error } = await supabase
        .from("contact_messages")
        .update(supabaseUpdates)
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error updating message status:", error);
      throw new Error(error.message || "Update failed");
    }
  },

  /**
   * Deletes an inquiry.
   */
  async deleteMessage(id: string) {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting message:", error);
      throw new Error("Deletion failed");
    }
  },

  /**
   * Fetches the count of unread inquiries.
   */
  async getUnreadCount() {
    try {
      const { count, error } = await supabase
        .from("contact_messages")
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread');
      
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Error fetching unread messages count:", error);
      return 0;
    }
  }
};
