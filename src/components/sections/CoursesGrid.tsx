"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Monitor,
  Database,
  Globe,
  Palette,
  Layout,
  FileText,
  Network,
  Cpu,
  Zap,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { coursesData } from "@/data/courses";
import { CourseCard } from "@/components/cards/CourseCard";

const iconMap: Record<string, any> = {
  Monitor: <Monitor className="w-8 h-12" />,
  Database: <Database className="w-8 h-12" />,
  Globe: <Globe className="w-8 h-12" />,
  Layout: <Layout className="w-8 h-12" />,
  Palette: <Palette className="w-8 h-12" />,
  FileText: <FileText className="w-8 h-12" />,
  Network: <Network className="w-8 h-12" />,
  Cpu: <Cpu className="w-8 h-12" />,
};

const topCourses = ["adca", "tally", "web"];
const courses = Object.values(coursesData)
  .filter(c => topCourses.includes(c.id))
  .map(course => ({
    ...course,
    icon: (course.iconName && iconMap[course.iconName]) || <Monitor className="w-8 h-12" />,
    color: course.color.split(' ')[0],
  }));

export function CoursesGrid() {
  return (
    <section className="py-10 bg-surface-secondary px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
          >
            <Zap className="w-3 h-3 fill-primary" />
            Our Academic Programs
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Choose Your <span className="text-gradient">Professional Path</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Vision IT Computer Institute Pratuppur offers industry-standard courses designed for your career success.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <CourseCard key={course.id} course={course} idx={idx} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 p-8 glass rounded-[3rem] bg-gradient-premium flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-primary/30"
        >
          <div className="text-white text-center lg:text-left">
            <h4 className="text-2xl font-bold mb-3">Custom Learning Batch?</h4>
            <p className="text-white/80 max-w-md">
              हम students की जरूरत के अनुसार specialized short-term certificate courses भी offer करते हैं। हमें संपर्क करें।
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-primary rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            Contact Inquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

