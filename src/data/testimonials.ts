export interface Testimonial {
  name: string;
  course: string;
  content: string;
  avatar: string;
  rating: number;
  year: string;
  is_published?: boolean;
}

export const defaultTestimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    course: "ADCA (Advance Diploma)",
    content: "Vision IT has been a game changer for me. The hands-on training for Tally and Graphic design helped me secure a job within months.",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    rating: 5,
    year: "Batch 2023"
  },
  {
    name: "Sneha Singh",
    course: "DCA (Diploma)",
    content: "The environment is very disciplined and the teachers are highly experienced. Practical center timing helps both students and working professionals.",
    avatar: "https://i.pravatar.cc/150?u=sneha",
    rating: 5,
    year: "Batch 2022"
  },
  {
    name: "Aman Gupta",
    course: "PGDCA Graduate",
    content: "I've learned everything from MS Office to Web Basics here. Pratappur's best institute with modern facilities and ISO certified courses.",
    avatar: "https://i.pravatar.cc/150?u=aman",
    rating: 4,
    year: "Batch 2023"
  }
];
