"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CourseForm } from "@/components/admin/CourseForm";
import { courseService } from "@/services/courseService";
import { Course } from "@/data/courses";
import { 
  Loader2, 
  ArrowLeft, 
  Settings, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function EditCoursePage() {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await courseService.getCourseById(id);
      setCourse(data);
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout title="Syncing..." subtitle="Fetching catalog records">
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!course) {
    return (
      <AdminLayout title="Unknown Entity" subtitle="Course record not found">
        <div className="py-20 text-center">
          <p className="text-zinc-500 font-bold mb-8 uppercase text-[10px] tracking-widest">The requested course registry could not be located.</p>
          <Link href="/neekadmin/dashboard/courses" className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">
            Back to Catalog
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title={`Refining ${course.title}`} 
      subtitle={`Updating curriculum for ${course.fullName}`}
    >
      <div className="space-y-10">
        <div className="flex items-center justify-between">
           <Link 
             href="/neekadmin/dashboard/courses"
             className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
           >
             <ArrowLeft className="w-4 h-4" /> Back to Catalog
           </Link>
           
           <div className="flex items-center gap-6">
              <Link 
                href={`/courses/${course.id}`}
                target="_blank"
                className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-blue-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live Preview
              </Link>
              <div className="w-[1px] h-4 bg-zinc-800" />
              <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full">
                 <Settings className="w-4 h-4" />
                 <span className="text-[9px] font-black uppercase tracking-[0.2em]">Curriculum Studio</span>
              </div>
           </div>
        </div>

        <CourseForm mode="edit" initialData={course} />
      </div>
    </AdminLayout>
  );
}
