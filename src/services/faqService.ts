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
    question: "Vision IT Pratappur kahan located hai?",
    answer: "Hum Kadampara Chowk, Pratappur mein located hain. Aap easily Google Maps par humein dhund sakte hain. Humara location Wadrafnagar aur Surajpur road se bahut hi connectable hai.",
    category: "General"
  },
  {
    id: 2,
    question: "Kya DCA aur PGDCA ke certificates Government Jobs ke liye valid hain?",
    answer: "Ji haan, Vision IT Pratappur ke Certificates University se recognized aur ISO Certified hote hain. Ye sabhi state/central govt jobs aur private sectors mein 100% valid hain.",
    category: "Certification"
  },
  {
    id: 3,
    question: "12th pass students ke liye best computer course kaun sa hai?",
    answer: "Pratappur mein 12th pass students ke liye DCA (Diploma in Computer Application) aur Tally Prime with GST sabse zyada demand wale courses hain jo turret job dilane mein help karte hain.",
    category: "Courses"
  },
  {
    id: 4,
    question: "Fees installment mein pay karne ki suvidha hai?",
    answer: "Bilkul! Vision IT Pratappur mein hum flexible installment plans aur affordable fees offer karte hain taaki har student ko behtar education mil sake.",
    category: "Fees"
  },
  {
    id: 5,
    question: "Kya humein placement support milega?",
    answer: "Haan, Vision IT Pratappur apne har student ko job search, resume building aur interview preparation mein full support deta hai. Humare kai students local businesses mein successful hain.",
    category: "Career"
  },
  {
    id: 6,
    question: "Free Demo class available hai?",
    answer: "Absolutely! Aap aaj hi centre visit karke ya call karke apni Free Demo seat book kar sakte hain aur humari teaching style dekh sakte hain.",
    category: "General"
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
