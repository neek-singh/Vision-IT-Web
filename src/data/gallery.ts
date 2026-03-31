export interface GalleryItem {
  id: number;
  category: "institute" | "lab" | "events" | "students";
  title: string;
  src: string;
}

export const galleryCategories = [
  { id: "all", label: "All Photos" },
  { id: "institute", label: "Institute" },
  { id: "lab", label: "Computer Lab" },
  { id: "events", label: "Events & Exams" },
  { id: "students", label: "Our Students" },
];

export const galleryItems: GalleryItem[] = [
  { id: 1, category: "lab", title: "Advanced Computer Lab", src: "/blog/tally.png" },
  { id: 2, category: "institute", title: "Main Campus Entrance", src: "/blog/success.png" },
  { id: 3, category: "events", title: "Exam Session 2026", src: "/blog/career.png" },
  { id: 4, category: "lab", title: "Digital Research Center", src: "/blog/tally.png" },
  { id: 5, category: "students", title: "Practical Workshop", src: "/blog/success.png" },
  { id: 6, category: "events", title: "Certificate Distribution", src: "/blog/career.png" },
];
