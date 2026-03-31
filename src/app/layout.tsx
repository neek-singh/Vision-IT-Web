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
  title: "Vision IT Computer Institute | Pratuppur's Leading Computer Training Center",
  description: "Vision IT Computer Institute, Pratuppur is a trusted computer training center offering courses like ADCA, Tally, DCA, Web Designing, and more. Learn, Practice, Grow.",
  keywords: "Computer Institute Pratuppur, Computer Training UP, ADCA Course, Tally Prime, Web Designing, Vision IT Computer",
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
