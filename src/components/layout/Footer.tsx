import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Search,
  BookOpen,
  Users,
  Award
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 pt-20 pb-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-primary dark:text-primary-light">
              VISION IT
            </span>
            <span className="text-[10px] font-medium leading-none tracking-[0.2em] text-zinc-500 uppercase">
              Computer Institute
            </span>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Authorized Center of <span className="text-primary font-bold">Drishti Computer Education</span>. Empowering students with modern digital skills and professional computer training.
          </p>
          <div className="flex gap-4">
            <SocialLink icon={<Facebook size={18} />} href="#" />
            <SocialLink icon={<Instagram size={18} />} href="#" />
            <SocialLink icon={<Twitter size={18} />} href="#" />
            <SocialLink icon={<Youtube size={18} />} href="#" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-6 font-geist-mono">
            Explore
          </h4>
          <ul className="space-y-4">
            <FooterLink href="/courses">All Courses</FooterLink>
            <FooterLink href="/admission">Online Admission</FooterLink>
            <FooterLink href="/blog">Latest News</FooterLink>
            <FooterLink href="/about">About Institute</FooterLink>
            <FooterLink href="/contact">Support Center</FooterLink>
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-6 font-geist-mono">
            Top Programs
          </h4>
          <ul className="space-y-4">
            <FooterLink href="/courses/adca">ADCA (1 Year)</FooterLink>
            <FooterLink href="/courses/tally">Tally Prime</FooterLink>
            <FooterLink href="/courses/web">Web Design</FooterLink>
            <FooterLink href="/courses/graphic">Graphic Design</FooterLink>
            <FooterLink href="/courses/basics">Computer Basics</FooterLink>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-6 font-geist-mono">
            Visit Us
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400 text-sm">
              <span>शुभम गिफ्ट गैलरी, कदमपारा चौक, प्रतापपुर, जिला – सूरजपुर (छ.ग.)</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-sm">
              <span>+91 8103170595</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-sm">
              <span>visionitinstitute@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Slogan & Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 md:order-1">
          <p className="text-zinc-500 text-[10px] font-medium tracking-widest uppercase">
            Learn • Practice • Grow
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[10px] font-bold text-zinc-400 hover:text-primary uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] font-bold text-zinc-400 hover:text-primary uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
        <p className="text-zinc-400 text-xs order-1 md:order-2">
          © {currentYear} Vision IT Computer Institute. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-primary hover:border-primary transition-all shadow-sm"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-2 group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-primary transition-colors" />
        {children}
      </Link>
    </li>
  );
}
