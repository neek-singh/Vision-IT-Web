"use client";

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
  Send,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-zinc-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Newsletter / CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[2.5rem] p-8 md:p-12 mb-20 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="max-w-xl text-center lg:text-left space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Ready to upgrade your <span className="text-primary-light">career?</span>
              </h3>
              <p className="text-zinc-400 text-lg">
                Stay updated with new courses, workshops, and career opportunities. Join our circle of 2,000+ students.
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-500 focus:ring-2 ring-primary outline-none transition-all pr-36"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
                  Join Now
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-zinc-500 mt-3 text-center lg:text-left ml-2 uppercase tracking-widest font-medium">
                No spam. Only quality updates.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter text-white">
                  VISION<span className="text-primary italic">IT</span>
                </span>
                <div className="h-1 w-12 bg-primary rounded-full mt-1" />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed pt-4">
                authorized center of <span className="text-white font-bold">Drishti Computer Education</span>. 
                Delivering industry-standard tech education since 2018.
              </p>
            </div>
            
            <div className="flex gap-3">
              <SocialLink icon={<Facebook size={20} />} href="#" label="Facebook" />
              <SocialLink icon={<Instagram size={20} />} href="#" label="Instagram" />
              <SocialLink icon={<Twitter size={20} />} href="#" label="Twitter" />
              <SocialLink icon={<Youtube size={20} />} href="#" label="Youtube" />
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 border-l-2 border-primary pl-4">
              Resources
            </h4>
            <ul className="space-y-5">
              <FooterLink href="/courses">Explore Programs</FooterLink>
              <FooterLink href="/admission">Online Admission</FooterLink>
              <FooterLink href="/verify">Certificate Verification</FooterLink>
              <FooterLink href="/blog">Success Stories</FooterLink>
              <FooterLink href="/contact">Help & Support</FooterLink>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 border-l-2 border-primary pl-4">
              Top Categories
            </h4>
            <ul className="space-y-5">
              <FooterLink href="/courses/adca">Software Engineering</FooterLink>
              <FooterLink href="/courses/tally">FinTech & Accounting</FooterLink>
              <FooterLink href="/courses/web">Full Stack Web</FooterLink>
              <FooterLink href="/courses/graphic">Digital Design</FooterLink>
              <FooterLink href="/courses/basics">Digital Literacy</FooterLink>
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 border-l-2 border-primary pl-4">
              Our Hub
            </h4>
            <div className="glass rounded-3xl p-6 border border-white/5 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-primary flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  शुभम गिफ्ट गैलरी, कदमपारा चौक, प्रतापपुर, सूरजपुर (छ.ग.)
                </p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-2xl text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <span className="text-zinc-300 text-sm font-bold group-hover:text-primary transition-colors">+91 8103170595</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="p-3 bg-white/5 rounded-2xl text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-zinc-300 text-xs font-medium truncate group-hover:text-primary transition-colors">visionitinstitute@gmail.com</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              ISO 9001:2015 Certified
            </div>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Privacy</Link>
              <Link href="/terms" className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Terms</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-zinc-500 text-[11px] font-medium font-geist-mono">
            <Globe className="w-3 h-3" />
            <span>© {currentYear} Vision IT Institute. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string, label: string }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href={href}
        aria-label={label}
        className="flex items-center justify-center w-11 h-11 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-primary hover:border-primary/50 transition-all shadow-xl hover:bg-white/10"
      >
        {icon}
      </Link>
    </motion.div>
  );
}

function FooterLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-zinc-400 hover:text-primary-light transition-all flex items-center gap-3 group translate-x-0 hover:translate-x-1 duration-300"
      >
        <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
        <span className="font-medium">{children}</span>
      </Link>
    </li>
  );
}
