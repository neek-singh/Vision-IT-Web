import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building the Future of Pratappur's Tech Talents",
  description: "Vision IT Computer Institute Pratappur is a ISO 9001:2015 certified computer training center. We offer specialized training for school and college students at affordable prices.",
  keywords: "About Vision IT Pratappur, Best Training Center Pratappur, Practical Computer Institute, ISO Certified Institute Pratappur",
  alternates: {
    canonical: "/about",
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
