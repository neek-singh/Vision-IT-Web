"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  CheckCircle2, 
  Heart, 
  Award, 
  Users, 
  GraduationCap,
  Sparkles,
  ArrowRight,
  Monitor,
  Lightbulb,
  IndianRupee,
  Clock,
  Briefcase,
  UserCheck,
  ShieldCheck,
  BookOpen,
  Calculator,
  FileText,
  Keyboard,
  Server,
  Globe,
  Palette,
  Cpu,
  Wifi,
  Layout,
  Smile,
  Zap,
  TrendingUp,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Share2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { mockTeachers } from "@/data/verification";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-16 pt-6 transition-colors duration-200">
      {/* Hero Section */}
      <section className="py-8 md:py-10 px-6 relative overflow-hidden bg-background">
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-primary/[0.03] dark:bg-primary/[0.05] -skew-x-12 -z-10" />
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3" />
            Our Story & Commitment
          </motion.div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-4xl leading-[1.1]">
            Building the Future of <span className="text-gradient">Pratappur's Tech Talents</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Vision IT Computer Institute Pratappur ek trusted and professional computer training institute hai jahan Class 6th ke school students se lekar Graduates aur PG candidates tak sabhi ko modern digital skills pradan ki jaati hai.
          </p>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="px-6 mb-16 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <SectionCard 
            icon={<Target className="w-8 h-8" />} 
            title="Our Mission" 
            text="Humara mission hai ki Pratappur ke har student ko ek aisa platform mile jahan wo confidence ke saath computer seekh sake aur apne career mein aage badh sake."
            accent="bg-blue-600"
            points={[
              "Strong computer basics develop karna",
              "Practical skills improve karna",
              "Employment opportunities ke liye taiyar rehna",
              "Digital India ki journey mein yogdaan dena"
            ]}
          />
          <SectionCard 
            icon={<Eye className="w-8 h-8" />} 
            title="Our Vision" 
            text="Humara vision hai ki Pratappur aur aas-paas ke kshetron ke students ko world-class computer education mile aur wo digital era mein hamesha aage rahein."
            accent="bg-indigo-600"
            points={[
              "Real-world practical knowledge",
              "Job-ready and future-ready learners",
              "Building real confidence in technology",
              "Community growth through education"
            ]}
          />
        </div>
      </section>

      {/* Why Choose Us Detailed */}

      {/* Meet Our Experts Section */}
      <section className="py-24 bg-background px-6 transition-colors duration-200 overflow-hidden relative border-t border-zinc-100 dark:border-zinc-900">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/[0.03] to-transparent -z-10" />
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <GraduationCap className="w-3 h-3" />
              Verified Expert Faculty
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              Learn from the <span className="text-gradient">Best Trainers</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto text-base md:text-lg px-4 leading-relaxed"
            >
              Vision IT Computer Institute Pratappur की सफलता का रहस्य हमारी dedicated faculty है, जो students के future के लिए committed हैं।
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {mockTeachers.map((teacher, index) => (
              <FacultyProfileCard 
                key={teacher.id}
                name={teacher.name}
                qualification={teacher.qualification}
                experience={teacher.experience}
                summary={teacher.summary}
                specialization={teacher.specialization}
                delay={0.1 + (index * 0.05)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/[0.01] -z-10 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              What We <span className="text-gradient">Offer</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
            >
              हमारे institute में students के लिए कई useful courses available हैं, जो उन्हें modern digital world के लिए तैयार करते हैं।
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <OfferCard icon={<BookOpen />} title="Basic Computer Course" delay={0.1} />
            <OfferCard icon={<Calculator />} title="Tally / Accounting Course" delay={0.15} />
            <OfferCard icon={<FileText />} title="MS Office" delay={0.2} />
            <OfferCard icon={<Keyboard />} title="Typing" delay={0.25} />
            <OfferCard icon={<Layout />} title="DCA" delay={0.3} />
            <OfferCard icon={<Server />} title="PGDCA" delay={0.35} />
            <OfferCard icon={<Globe />} title="Web Designing" delay={0.4} />
            <OfferCard icon={<Palette />} title="Graphic Designing" delay={0.45} />
            <OfferCard icon={<Cpu />} title="Computer Fundamentals" delay={0.5} />
            <OfferCard icon={<Wifi />} title="Internet and Digital Skills" delay={0.55} />
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-500 italic pt-8"
          >
            इसके अलावा, students की जरूरत के अनुसार short-term and long-term courses भी available हो सकते हैं।
          </motion.p>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-surface-secondary px-6 transition-colors duration-200 overflow-hidden relative">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              Connect With Us on <span className="text-gradient">Social Media</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
            >
              Vision IT Computer Institute Pratappur के साथ जुड़े रहें और पाएँ latest updates, new batch announcements, और computer tips।
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SocialMediaCard 
              icon={<Facebook />} 
              title="Facebook Page" 
              text="Institute updates, event photos aur student success stories ke liye follow karein."
              color="#1877F2"
              delay={0.2}
            />
            <SocialMediaCard 
              icon={<Instagram />} 
              title="Instagram" 
              text="Daily computer tips, learning reels aur motivational content ke liye connect rahein."
              color="#E4405F"
              delay={0.3}
            />
            <SocialMediaCard 
              icon={<MessageCircle />} 
              title="WhatsApp Group" 
              text="New batch info aur direct communication ke liye hamare official group mein join karein."
              color="#25D366"
              delay={0.4}
            />
            <SocialMediaCard 
              icon={<Youtube />} 
              title="YouTube Channel" 
              text="Free computer learning videos aur practical guidance ke liye subscribe karein."
              color="#FF0000"
              delay={0.5}
            />
          </div>

          {/* Taglines Marquee-style */}
          <div className="flex flex-wrap justify-center gap-4 pt-10">
            <TaglineItem text="Learn Digital Skills – Stay Connected with Vision IT." />
            <TaglineItem text="Follow • Learn • Grow with Vision IT Computer Institute." />
            <TaglineItem text="Your Digital Learning Partner." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 px-6">
        <div className="max-w-5xl mx-auto p-8 glass rounded-[3rem] text-center space-y-6 bg-gradient-premium shadow-2xl shadow-primary/20">
          <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Ready to Build Your Digital Future?
          </h4>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            Agar aap ek aise computer institute ki talash mein hain jahan quality education aur practical learning mile, toh Vision IT Pratappur aapke liye sabse sahi choice hai. Aaj hi join karein!
          </p>
          <Link
            href="/admission"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionCard({ icon, title, text, points, accent }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 glass rounded-[3rem] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl h-full flex flex-col"
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-8", accent)}>
        {icon}
      </div>
      <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider">{title}</h4>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 flex-1">{text}</p>
      <ul className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        {points.map((p: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ValueItem({ icon, title, text }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
        <div className="w-[18px] h-[18px]">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{title}</h5>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function PrincipleItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200">
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="text-xs font-bold tracking-tight">{text}</span>
    </div>
  );
}

function OfferCard({ icon, title, delay }: { icon: React.ReactNode, title: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="p-6 glass rounded-3xl bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center gap-4 group"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" }) : icon}
      </div>
      <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">{title}</h5>
    </motion.div>
  );
}

function FacultyFeatureCard({ icon, title, text, delay }: { icon: React.ReactNode, title: string, text: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-8 glass bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 rounded-[2rem] flex flex-col gap-6 group hover:shadow-xl transition-all"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-7 h-7" }) : icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{title}</h4>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

function SocialMediaCard({ icon, title, text, color, delay }: { icon: React.ReactNode, title: string, text: string, color: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-8 glass rounded-[2.5rem] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 group relative overflow-hidden h-full"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none" 
        style={{ backgroundColor: color }}
      />
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        style={{ backgroundColor: color }}
      >
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-7 h-7" }) : icon}
      </div>
      <div className="space-y-3 flex-1">
        <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{text}</p>
      </div>
      <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-primary transition-colors">
        Connect Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

function TaglineItem({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="px-6 py-3 glass rounded-full bg-primary/5 border-primary/10 text-primary text-xs font-bold tracking-tight hover:bg-primary/10 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        {text}
      </div>
    </motion.div>
  );
}

function FacultyProfileCard({ name, qualification, experience, summary, specialization, delay }: { name: string, qualification: string, experience: string, summary: string, specialization: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 glass rounded-[3rem] bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start gap-8 hover:shadow-2xl transition-all duration-500 overflow-hidden">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent p-[2px] shrink-0">
          <div className="w-full h-full rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-primary overflow-hidden">
            <GraduationCap className="w-10 h-10 opacity-30 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active Instructor</span>
            </div>
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">{name}</h4>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-bold text-primary tracking-tight uppercase">{qualification}</p>
              <div className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 flex items-center gap-1.5">
                <Award className="w-3 h-3" />
                {experience} EXPERIENCE
              </p>
            </div>
          </div>
          
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            {summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {specialization.split(", ").map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[9px] font-black text-primary/70 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

