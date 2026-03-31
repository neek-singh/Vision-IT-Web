"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CourseForm } from "@/components/admin/CourseForm";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCoursePage() {
  return (
    <AdminLayout 
      title="Launch New Curriculum" 
      subtitle="Design a professional course offering from scratch"
    >
      <div className="space-y-10">
        <div className="flex items-center justify-between">
           <Link 
             href="/neekadmin/dashboard/courses"
             className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
           >
             <ArrowLeft className="w-4 h-4" /> Back to Registry
           </Link>
           
           <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">New Masterclass Offering</span>
           </div>
        </div>

        <CourseForm mode="new" />
      </div>
    </AdminLayout>
  );
}
