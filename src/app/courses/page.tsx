"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { coursesData, Course } from "@/data/courses";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CourseCard } from "@/components/cards/CourseCard";
import { 
  Cpu, 
  Database, 
  Globe, 
  Palette, 
  Layout, 
  FileText, 
  Search, 
  Clock, 
  Target,
  ArrowRight,
  Monitor,
  PenTool,
  Network,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  CreditCard,
  Users,
  CheckCircle2,
  Zap,
  IndianRupee
} from "lucide-react";

import { courseService } from "@/services/courseService";

const iconMap: Record<string, any> = {
  Monitor: <Monitor className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  Network: <Network className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
};

const getCategory = (course: Course) => {
  if (course.id === "web") return "Development";
  if (course.id === "graphic") return "Creative";
  if (course.id === "tally") return "Accounting";
  if (course.id === "adca" || course.id === "dca") return "Professional";
  if (course.id === "office" || course.id === "typing" || course.id === "fundamentals") return "Skills";
  return "General";
};

const categories = ["All", "Professional", "Accounting", "Development", "Creative", "Skills"];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    // Initial static load
    const staticCourses = Object.values(coursesData).map(c => ({
      ...c,
      category: getCategory(c),
      icon: (c.iconName && iconMap[c.iconName]) || <Monitor className="w-8 h-8" />,
    }));
    setCourses(staticCourses);

    // Fetch dynamic updates
    const fetchDynamic = async () => {
      const dynamic = await courseService.getCourses(true); // onlyPublished = true
      if (dynamic && dynamic.length > 0) {
        const mapped = dynamic.map(c => ({
          ...c,
          category: getCategory(c),
          icon: (c.iconName && iconMap[c.iconName]) || <Monitor className="w-8 h-8" />,
        }));
        setCourses(mapped);
      }
    };
    fetchDynamic();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-16 pt-6">
      {/* Header */}
      <section className="py-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3 h-3" />
            Empower Your Future
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Explore Our <span className="text-gradient">Professional</span> Courses
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-2xl mx-auto">
            हम beginner to advanced level तक training देते हैं, ताकि हर learner अपनी learning journey को आसानी से complete कर सके।
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-lg mx-auto mt-8 relative group"
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors text-xs" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a course (e.g. Tally, Web, ADCA)..." 
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-primary/5 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-[10px] font-bold uppercase tracking-widest"
            >
              Clear
            </button>
          )}
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 pb-6">
        <div className="max-w-7xl mx-auto flex overflow-x-auto pb-4 gap-3 no-scrollbar justify-start md:justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                activeCategory === category 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-primary/50"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6">
        {filteredCourses.length > 0 ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCourses.map((course, idx) => (
              <CourseCard key={course.id} course={course} idx={idx} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto py-20 text-center space-y-4"
          >
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">No courses found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              We couldn't find any courses matching your current filters. Try searching for something else.
            </p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="text-primary font-bold text-sm hover:underline mt-4"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Custom Inquiry */}
      <section className="max-w-7xl mx-auto px-6 mt-10 mb-12">
        <div className="p-8 glass rounded-[3.5rem] bg-gradient-premium relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -z-10" />
          <div className="space-y-4 max-w-xl text-white text-left">
            <h4 className="text-2xl md:text-3xl font-bold tracking-tight">Need a custom plan?</h4>
            <p className="opacity-80 leading-relaxed font-medium text-base">
              हम students की जरूरत के अनुसार short-term and long-term courses भी provide करते हैं। Learn what matters most to your career.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-10 py-5 bg-white text-primary rounded-2xl font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shrink-0"
          >
            Request Guidance
            <Target className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
