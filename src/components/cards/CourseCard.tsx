"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Clock, IndianRupee, CheckCircle2, Users, ChevronRight } from "lucide-react";
import { Course } from "@/data/courses";

interface CourseCardProps {
  course: any; // Type 'any' for now or 'Course' if mapped correctly
  idx: number;
}

export function CourseCard({ course, idx }: CourseCardProps) {
  // Use first 4 core modules from syllabus
  const coreModules = course.syllabus?.slice(0, 4) || [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative h-full flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200/60 dark:border-zinc-800 shadow-xl shadow-zinc-200/30 dark:shadow-none hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
    >
      {/* Featured Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Batch / Tag Overlay */}
        {course.tag && (
          <div className="absolute top-4 right-4 z-20">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-lg backdrop-blur-md bg-opacity-90",
              course.tag.color
            )}>
              {course.tag.text}
            </span>
          </div>
        )}

        {/* Icon Overlay */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-2xl backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
            course.color.replace('from-', 'bg-').split(' ')[0],
            "border border-white/20 text-white"
          )}>
            {course.icon && React.isValidElement(course.icon) 
              ? React.cloneElement(course.icon as React.ReactElement<any>, { className: "w-6 h-6" })
              : null
            }
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="p-7 pb-4">
        <div className="space-y-1">
          <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight leading-none group-hover:text-primary transition-colors">
            {course.title}
          </h4>
          <p className="text-[10px] font-bold text-blue-500/70 dark:text-blue-400/60 uppercase tracking-widest leading-none">
            {course.fullName}
          </p>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mt-4 line-clamp-2">
          {course.description}
        </p>
      </div>

      {/* Info Grid */}
      <div className="px-7 pb-4">
        <div className="bg-zinc-50 dark:bg-white/5 rounded-2xl p-5 grid grid-cols-2 gap-y-4 gap-x-2 border border-zinc-100 dark:border-white/5 shadow-inner">
          <CourseMetaItem 
            icon={<Clock className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />} 
            label="DURATION" 
            value={course.duration} 
          />
          <CourseMetaItem 
            icon={<IndianRupee className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />} 
            label="FEES" 
            value={course.fees.split(' ')[0]} 
          />
          <CourseMetaItem 
            icon={<CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />} 
            label="CERTIFICATE" 
            value={course.certificate.length > 18 ? "ISO Verified" : course.certificate} 
          />
          <CourseMetaItem 
            icon={<Users className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />} 
            label="MODE" 
            value={course.mode.split(' ')[0]} 
          />
        </div>
      </div>

      {/* Core Modules Tags */}
      <div className="px-7 pb-6 flex-grow">
        <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
          CORE MODULES
        </p>
        <div className="flex flex-wrap gap-2">
          {coreModules.map((item: string, i: number) => (
             <span key={i} className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200/50 dark:border-white/5 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
                {item}
             </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-7 pt-0 flex gap-3">
        <Link
          href={`/courses/${course.id}`}
          className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          Details
          <ChevronRight className="w-4 h-4" />
        </Link>
        <Link 
          href="/admission"
          className="flex-1 py-3.5 bg-white dark:bg-transparent border-2 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl text-xs font-black flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-all active:scale-95"
        >
          Quick Enroll
        </Link>
      </div>
    </motion.div>
  );
}

function CourseMetaItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-100 dark:border-white/5">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.1em] leading-none mb-1">
          {label}
        </span>
        <p className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 leading-none truncate max-w-[80px]">
          {value}
        </p>
      </div>
    </div>
  );
}
