import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission 2026 | Vision IT Computer Institute Pratappur",
  description: "Secure your seat for 2026! Apply for DCA, PGDCA, Tally Prime, and Python courses at Vision IT Computer Institute Pratappur. Affordable fees and ISO certified certification.",
  keywords: "Computer Course Admission Pratappur, DCA Admission 2026, PGDCA Admission 2026, Learn Tally Pratappur, Best Computer Center Pratappur",
  alternates: {
    canonical: "/admission",
  }
};

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
