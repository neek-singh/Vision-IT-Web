import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Vision IT | Computer Institute Pratappur",
  description: "Contact us for world-class IT education at Kadampara Chowk, Pratappur. Call +91 8103170595 for DCA, PGDCA, Tally, and Excel Training.",
  keywords: "Contact Vision IT Pratappur, Best Computer Center Chhattisgarh, Shubham Gupta Computer Center, Pratappur Computer Classes",
  alternates: {
    canonical: "/contact",
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
