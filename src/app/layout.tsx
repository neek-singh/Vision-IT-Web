import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { FramerProvider } from "@/components/providers/FramerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://visionitinstitute.vercel.app"),
  title: {
    default: "Vision IT Computer Institute Pratappur | Best Computer Classes",
    template: "%s | Vision IT Pratappur"
  },
  description: "Vision IT Computer Institute Pratappur offers world-class training for Class 6th to Post-Graduation (PG) students. Recognized DCA, PGDCA, Tally, and Python courses with 100% placement support.",
  keywords: "Computer Institute Pratappur, Class 6th Computer Classes, Computer Classes for Graduates, DCA PGDCA Course Pratappur, Tally Prime GST training Pratappur, Web Development Pratappur, Python Classes Pratappur, Best Computer Coaching Pratappur",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google317c240a3e397d28",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Vision IT Computer Institute Pratappur",
  "image": "https://vision-it-website.vercel.app/logo.png",
  "@id": "https://vision-it-website.vercel.app",
  "url": "https://vision-it-website.vercel.app",
  "telephone": "+918103170595",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kadampara Chowk, Pratappur",
    "addressLocality": "Pratappur",
    "addressRegion": "Chhattisgarh",
    "postalCode": "497223",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.4754,
    "longitude": 83.1876
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "19:00"
  },
  "sameAs": [
    "https://facebook.com/visionitinstitute",
    "https://instagram.com/visionitinstitute"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) theme = 'light';
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <AuthProvider>
          <ThemeProvider>
            <FramerProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </FramerProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
