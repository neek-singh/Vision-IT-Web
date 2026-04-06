import { supabase } from "@/lib/supabase";

export interface HeroSlide {
  id: string | number;
  title: string;
  description: string;
  subtext: string;
  cta1: { text: string; href: string };
  cta2: { text: string; href: string };
  image: string;
  accent: string;
  display_order?: number;
  is_published?: boolean;
}

const table = "hero_slides";

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Best Computer Institute in Pratappur for DCA, PGDCA & IT",
    description: "Vision IT Computer Institute Pratappur में सीखिए modern computer education, practical training और career-oriented courses 100% placement support के साथ।",
    subtext: "अपना डिजिटल करियर आज ही शुरू करें।",
    cta1: { text: "Join Now", href: "/admission" },
    cta2: { text: "Enroll Now", href: "/admission" },
    image: "/slides/slide1.png",
    accent: "text-blue-600"
  },
  {
    id: 2,
    title: "Practical Training • Expert Guidance • 100+ Placements",
    description: "हमारे institute में हर student को मिलता है step-by-step guidance, hands-on practice और easy learning environment success की गारंटी के साथ।",
    subtext: "Best Computer Classes in Pratappur at Kadampara Chowk.",
    cta1: { text: "View Courses", href: "/courses" },
    cta2: { text: "Book Free Demo", href: "/contact" },
    image: "/slides/slide2.png",
    accent: "text-emerald-600"
  },
  {
    id: 3,
    title: "Computer Courses for Govt. Jobs & IT Industry",
    description: "DCA, PGDCA, Tally Prime, Python, और Web Designing जैसे useful courses के साथ अपने future को strong बनाइए।",
    subtext: "Learn today, lead tomorrow with Vision IT.",
    cta1: { text: "Admission Open", href: "/admission" },
    cta2: { text: "Contact Us", href: "/contact" },
    image: "/slides/slide3.png",
    accent: "text-indigo-600"
  }
];

export const heroService = {
  async getSlides(onlyPublished = true) {
    try {
      let query = supabase.from(table).select("*").order("display_order", { ascending: true });
      
      if (onlyPublished) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;
      
      if (error || !data || data.length === 0) {
        return defaultSlides;
      }

      return data.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        subtext: s.subtext,
        cta1: { text: s.cta1_text, href: s.cta1_href },
        cta2: { text: s.cta2_text, href: s.cta2_href },
        image: s.image_url,
        accent: s.accent_color,
      })) as HeroSlide[];
    } catch (error) {
      console.error("Error fetching hero slides:", error);
      return defaultSlides;
    }
  }
};
