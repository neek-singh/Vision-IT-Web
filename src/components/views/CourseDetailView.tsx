"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  CreditCard, 
  Award, 
  BookOpen, 
  ChevronRight,
  Monitor,
  Database,
  Globe,
  Palette,
  Layout,
  FileText,
  BadgeCheck,
  Zap,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Layers,
  GraduationCap,
  Plus,
  Minus,
  ShieldCheck,
  Network
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Course } from "@/data/courses";

interface CourseDetailViewProps {
  course: Course;
}

const IconMap: Record<string, any> = {
  Monitor,
  Database,
  Globe,
  Layout,
  Palette,
  FileText,
  Network
};

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const IconComponent = (course.iconName && IconMap[course.iconName]) || Monitor;

  if (!mounted) {
    return null; // or a simplified loading skeleton
  }

  return (
    <div className="min-h-screen bg-background pb-16 transition-colors duration-500">
      {/* Dynamic Header / Hero */}
      <section className={cn(
        "relative py-12 md:py-16 px-6 overflow-hidden text-white",
        "bg-gradient-to-br",
        course.color
      )}>
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all font-bold text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Academic Path
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Specialized Diploma Program
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                  {course.title}
                </h1>
                <p className="text-xl md:text-2xl font-medium text-white/90">
                  {course.fullName}
                </p>
              </div>
              <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/admission?course=${course.id}`}
                  className="px-8 py-5 bg-white text-zinc-900 rounded-[1.5rem] font-bold text-lg shadow-2xl hover:bg-primary hover:text-white active:scale-95 transition-all flex items-center gap-2 group"
                >
                  Enroll Today
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] bg-black/10 backdrop-blur-md border border-white/10">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">{course.duration}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden lg:flex justify-end"
            >
              <div className="relative w-[500px] h-[350px] group">
                {/* Decorative Elements */}
                <div className={cn(
                   "absolute -inset-4 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700",
                   course.color.replace('from-', 'bg-').split(' ')[0]
                )} />
                
                {/* Image Container */}
                <div className="relative h-full w-full rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating Icon Over Image */}
                  <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                    <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute -top-4 -right-4 px-6 py-2 rounded-full bg-white text-zinc-900 font-black text-xs shadow-xl flex items-center gap-2 z-20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ENROLLMENT OPEN
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Core Details */}
      <section className="max-w-7xl mx-auto px-6 py-12 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-20">
            {/* Syllabus Section (Accordion style as requested) */}
            <div id="syllabus">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Detailed Curriculum</h3>
                  <p className="text-sm text-zinc-500 uppercase font-bold tracking-widest mt-1">What You Will Learn</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {(course.syllabus || course.syllabi || []).map((item: string, idx: number) => (
                  <div 
                    key={idx}
                    className="overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-zinc-800 dark:text-zinc-200">{item}</h4>
                      </div>
                      {openIndex === idx ? <Minus className="w-5 h-5 text-zinc-400" /> : <Plus className="w-5 h-5 text-zinc-400" />}
                    </button>
                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm pt-2">
                             Learn advanced concepts and practical implementation of {item} in a real-world environment. Our sessions include live demonstrations and hands-on lab work to ensure deep understanding.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Outcomes */}
             <div className="p-10 glass bg-white dark:bg-zinc-900 shadow-2xl shadow-primary/5 rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800">
               <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3">
                 <BarChart3 className="w-7 h-7 text-primary" />
                 Professional Career Paths
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {(course.careerPaths || ["Computer Professional", "Office Executive", "Digital Assistant", "Tech Consultant"]).map(role => (
                   <div key={role} className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                     <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                     <span className="font-bold text-zinc-700 dark:text-zinc-300">{role}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            {/* Conversion-Focused Sidebar */}
            <div className="sticky top-24 p-8 glass bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Course Fast-Track
              </h4>
              
              <div className="space-y-6 mb-10">
                <StatBox label="Duration" value={course.duration} icon={<Clock className="w-4 h-4" />} />
                <StatBox label="Certification" value="Verified & Professional" icon={<Award className="w-4 h-4" />} />
                <StatBox label="Estimated Fees" value={course.fees} icon={<CreditCard className="w-4 h-4" />} />
                <StatBox label="Session Mode" value={course.mode} icon={<BookOpen className="w-4 h-4" />} />
              </div>

              <div className="space-y-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Why Enroll Here?</p>
                <div className="space-y-3">
                  {course.benefits.slice(0, 4).map((b: string, i: number) => (
                    <div key={i} className="flex gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/admission?course=${course.id}`}
                className="w-full py-5 bg-gradient-premium text-white rounded-2xl font-bold flex items-center justify-center gap-3 mt-10 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm group"
              >
                Start Your Admission
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 mb-0.5">{label}</p>
        <p className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 leading-none">{value}</p>
      </div>
    </div>
  );
}
