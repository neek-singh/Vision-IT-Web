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
  title: "Best Computer Institute in Pratappur | DCA, PGDCA, Tally & Python",
  description: "Vision IT Computer Institute in Pratappur offers university-recognized DCA, PGDCA, Tally, and Python courses with 100% placement support. Enroll today for practical IT training.",
  keywords: "Computer Institute Pratappur, Computer Classes in Pratappur, DCA PGDCA Course Pratappur, Tally Prime GST training, Web Development Pratappur, Python Classes Surajpur, Best Computer Coaching Chhattisgarh",
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
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
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
