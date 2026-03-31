export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  summary: string;
  linkedIn?: string;
  email?: string;
  is_published?: boolean;
}

export const defaultFaculty: FacultyMember[] = [
  {
    id: "VIT-TCH-001",
    name: "Ishwar Singh",
    role: "SENIOR IT INSTRUCTOR",
    specialization: "WEB DEVELOPMENT, APP DEVELOPMENT, ADVANCED COMPUTER",
    experience: "3+ YEARS",
    summary: "Professional computer educator and institute founder with strong expertise in web and app development. Focused on practical training, live projects, and industry-ready skills."
  },
  {
    id: "VIT-TCH-002",
    name: "Miss Mankuwar",
    role: "COMPUTER FACULTY",
    specialization: "BASIC COMPUTER, MS OFFICE, TALLY",
    experience: "2+ YEARS",
    summary: "Dedicated computer teacher specializing in basic to intermediate computer education. Focuses on clear concepts and practical learning for students."
  },
  {
    id: "VIT-TCH-003",
    name: "Miss Geeta",
    role: "COMPUTER FACULTY",
    specialization: "COMPUTER FUNDAMENTALS, TYPING, INTERNET",
    experience: "2+ YEARS",
    summary: "Supportive and beginner-friendly instructor helping students build strong fundamentals in computer and typing skills with step-by-step guidance."
  }
];
