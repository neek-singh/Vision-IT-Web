export interface TeacherData {
  id: string;
  name: string;
  qualification: string;
  experience: string;
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
  { id: "VIT-TCH-001", name: "Sunil Kumar", qualification: "MCA", experience: "8 Years", status: "Active", joinedDate: "2018-06-15" },
  { id: "VIT-TCH-002", name: "Pooja Gupta", qualification: "B.Tech IT", experience: "5 Years", status: "Active", joinedDate: "2020-03-10" },
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
