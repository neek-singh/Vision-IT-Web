import { supabase } from "@/lib/supabase";

export interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
  category: string;
  display_order?: number;
  is_published?: boolean;
}

const table = "faqs";

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    question: "How can I apply for admission?",
    answer: "You can apply online via our Admission portal or visit our Pratappur campus in person. For online applications, just fill out the registration form, and our counselor will call you within 24 hours.",
    category: "Admission"
  },
  {
    id: 2,
    question: "Are the certificates government-recognized?",
    answer: "Yes, Vision IT Computer Institute is ISO 9001:2015 certified and provides government-recognized diplomas and certificates that are valid for private sector roles and government exam prerequisites.",
    category: "Certification"
  },
  {
    id: 3,
    question: "Do you offer practical lab sessions?",
    answer: "Absolutely. We maintain a 1:1 student-to-computer ratio. Every theoretical concept is followed by extensive practical lab sessions to ensure hands-on mastery.",
    category: "Learning"
  }
];

export const faqService = {
  async getFaqs(onlyPublished = true) {
    try {
      let query = supabase.from(table).select("*").order("display_order", { ascending: true });
      
      if (onlyPublished) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;
      
      if (error || !data || data.length === 0) {
        return defaultFaqs;
      }

      return data.map(f => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
      })) as FAQItem[];
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return defaultFaqs;
    }
  }
};
