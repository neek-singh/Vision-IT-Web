export interface TeacherData {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  specialization: string;
  summary: string;
  status: "Active" | "Inactive";
  joinedDate: string;
}

export interface StudentData {
  id: string;
  name: string;
  course: string;
  admissionDate: string;
  status: "Enrolled" | "Completed" | "Dropped";
}

export interface CertificateData {
  id: string;
  studentName: string;
  course: string;
  issueDate: string;
  status: "Genuine" | "Revoked";
}

export interface MarksheetData {
  rollNo: string;
  studentName: string;
  course: string;
  subjects: { name: string; marks: number; total: number }[];
  totalMarks: number;
  grade: string;
}

export const mockTeachers: TeacherData[] = [
  { 
    id: "VIT-TCH-001", 
    name: "Ishwar Singh", 
    qualification: "Senior IT Instructor", 
    experience: "3+ Years", 
    specialization: "WEB DEVELOPMENT, APP DEVELOPMENT, ADVANCED COMPUTER",
    summary: "Professional computer educator and institute founder with strong expertise in web and app development. Focused on practical training, live projects, and industry-ready skills.",
    status: "Active", 
    joinedDate: "2021-01-15" 
  },
  { 
    id: "VIT-TCH-002", 
    name: "Miss Mankuwar", 
    qualification: "Computer Faculty", 
    experience: "2+ Years", 
    specialization: "BASIC COMPUTER, MS OFFICE, TALLY",
    summary: "Dedicated computer teacher specializing in basic to intermediate computer education. Focuses on clear concepts and practical learning for students.",
    status: "Active", 
    joinedDate: "2022-03-10" 
  },
  { 
    id: "VIT-TCH-003", 
    name: "Miss Geeta", 
    qualification: "Computer Faculty", 
    experience: "2+ Years", 
    specialization: "COMPUTER FUNDAMENTALS, TYPING, INTERNET",
    summary: "Supportive and beginner-friendly instructor helping students build strong fundamentals in computer and typing skills with step-by-step guidance.",
    status: "Active", 
    joinedDate: "2022-05-20" 
  },
];

export const mockStudents: StudentData[] = [
  { id: "VIT-STD-001", name: "Rahul Sharma", course: "ADCA (Advance Diploma)", admissionDate: "2023-01-20", status: "Enrolled" },
  { id: "VIT-STD-002", name: "Sneha Singh", course: "DCA (Diploma)", admissionDate: "2022-11-05", status: "Completed" },
];

export const mockCertificates: CertificateData[] = [
  { id: "CERT-2023-101", studentName: "Sneha Singh", course: "DCA (Diploma)", issueDate: "2023-11-15", status: "Genuine" },
];

export const mockMarksheets: MarksheetData[] = [
  {
    rollNo: "VIT-STD-002",
    studentName: "Sneha Singh",
    course: "DCA (Diploma)",
    subjects: [
      { name: "Computer Fundamental", marks: 85, total: 100 },
      { name: "MS Office", marks: 92, total: 100 },
      { name: "Operating System", marks: 78, total: 100 },
    ],
    totalMarks: 255,
    grade: "A+",
  },
];
