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
    title: "Pratappur का No. 1 Computer Institute - Ab Career Banao Digital!",
    description: "Class 6th ke students hon ya PG (Graduates)—Vision IT Pratappur mein seekhiye industry-leading courses placement support ke saath.",
    subtext: "अपना डिजिटल करियर आज ही शुरू करें।",
    cta1: { text: "Enroll Now", href: "/admission" },
    cta2: { text: "Book Free Demo", href: "/contact" },
    image: "/slides/slide1.png",
    accent: "text-blue-600"
  },
  {
    id: 2,
    title: "Practical Training • Expert Guidance • Local Placement",
    description: "Hum focus karte hain hands-on practical training par taaki aap pehle din se hi job-ready banein. Seekho Tally, Python aur Full Stack.",
    subtext: "Best Computer Classes in Pratappur at Kadampara Chowk.",
    cta1: { text: "View Courses", href: "/courses" },
    cta2: { text: "WhatsApp Us", href: "https://wa.me/91XXXXXXXXXX" },
    image: "/slides/slide2.png",
    accent: "text-emerald-600"
  },
  {
    id: 3,
    title: "Computer Courses for Govt. Jobs & Modern IT Industry",
    description: "DCA, PGDCA, aur Tally Prime jaise verified courses ke saath apne future ko strong banaiye Vision IT Pratappur ke saath.",
    subtext: "Learn today, lead tomorrow with Vision IT.",
    cta1: { text: "Admission Open", href: "/admission" },
    cta2: { text: "Call Centre", href: "tel:+91XXXXXXXXXX" },
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
