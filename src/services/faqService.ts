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
    question: "Best computer institute in Pratappur कौन सा है?",
    answer: "Vision IT Computer Institute Pratappur का सबसे भरोसेमंद शिक्षा केंद्र है। हम Kadampara Chowk पर DCA, PGDCA, और Tally जैसे कोर्सेज के लिए best practical training प्रदान करते हैं।",
    category: "General"
  },
  {
    id: 2,
    question: "क्या DCA और PGDCA के सर्टिफिकेट Government Jobs के लिए मान्य हैं?",
    answer: "हाँ, Vision IT द्वारा दिए जाने वाले DCA और PGDCA डिप्लोमा यूनिवर्सिटी से मान्यता प्राप्त हैं। यह CG Vyapam, SSC, Banking, और अन्य सभी सरकारी और प्राइवेट नौकरियों के लिए पूरी तरह मान्य हैं।",
    category: "Certification"
  },
  {
    id: 3,
    question: "क्या beginners Python या Web Development सीख सकते हैं?",
    answer: "बिल्कुल! हमारे कोर्सेज zero level से शुरू होते हैं। अगर आपको कंप्यूटर की बेसिक जानकारी भी नहीं है, तो भी आप Python और Full Stack Development आसानी से सीख सकते हैं।",
    category: "Courses"
  },
  {
    id: 4,
    question: "क्या Surajpur या Wadrafnagar के छात्र भी जॉइन कर सकते हैं?",
    answer: "हाँ, हमारे सेंटर पर Surajpur, Wadrafnagar, Rajpur, और Bhaiyathan के बहुत से छात्र पढ़ते हैं। हमारा लोकेशन Kadampara Chowk बहुत ही सुलभ है।",
    category: "Location"
  },
  {
    id: 5,
    question: "कोर्स की फीस कितनी है?",
    answer: "Vision IT Pratappur में कोर्सेज की फीस बहुत कम और किफायती है। हम गरीब और मेधावी छात्रों के लिए विशेष स्कॉलरशिप और किश्तों (EMI) की सुविधा भी देते हैं।",
    category: "Fees"
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
