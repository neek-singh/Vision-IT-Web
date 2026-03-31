"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { courseService } from "@/services/courseService";
import { Course } from "@/data/courses";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Clock, 
  CreditCard,
  FileText,
  Database,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  MoreVertical,
  BookOpen,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CourseAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [migrating, setMigrating] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  useEffect(() => {
    const unsubscribe = courseService.subscribeToCourses((updatedCourses) => {
      setCourses(updatedCourses);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await courseService.toggleVisibility(id, !currentStatus);
      setNotification({ type: 'success', message: `Course ${!currentStatus ? 'published' : 'hidden'} successfully.` });
    } catch (err: any) {
      setNotification({ type: 'error', message: "Failed to update visibility." });
    } finally {
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleMigrate = async () => {
    if (!confirm("This will import all courses from the static file to Firestore. Continue?")) return;
    
    setMigrating(true);
    try {
      const result = await courseService.migrateStaticCourses();
      setNotification({ type: 'success', message: `Successfully migrated ${result.count} courses!` });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || "Migration failed." });
    } finally {
      setMigrating(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await courseService.deleteCourse(id);
      setNotification({ type: 'success', message: "Course deleted successfully." });
    } catch (err: any) {
      setNotification({ type: 'error', message: "Failed to delete course." });
    } finally {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    (c as any).fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Course Curriculum" subtitle="Manage your academic offerings and syllabus">
      <div className="space-y-8">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-grow max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {courses.length === 0 && !loading && (
              <button 
                onClick={handleMigrate}
                disabled={migrating}
                className="px-6 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-3 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-white hover:border-zinc-700 transition-all disabled:opacity-50"
              >
                {migrating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Import Defaults
              </button>
            )}
            <Link 
              href="/neekadmin/dashboard/courses/new"
              className="px-8 h-14 bg-primary rounded-2xl flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Course
            </Link>
          </div>
        </div>

        {/* Status Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "p-4 rounded-2xl border flex items-center gap-3 text-[10px] font-black uppercase tracking-widest",
                notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
              )}
            >
              {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Registry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {loading ? (
             [1,2,3].map(i => (
                <div key={i} className="h-64 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800 animate-pulse" />
             ))
           ) : filteredCourses.length > 0 ? (
             filteredCourses.map((course) => (
               <motion.div 
                 layout
                 key={course.id}
                 className={cn(
                    "group relative h-full flex flex-col p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 hover:border-primary/30 transition-all duration-500 shadow-xl",
                    !(course as any).is_published && "opacity-60 grayscale-[0.5]"
                 )}
               >
                 {/* ID / Badge */}
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest border border-white/5">
                        ID: {course.id}
                      </div>
                      {!(course as any).is_published && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[8px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-700">Hidden</span>
                      )}
                    </div>
                    {course.tag && (
                      <div className={cn("px-4 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest", course.tag.color)}>
                        {course.tag.text}
                      </div>
                    )}
                 </div>

                 {/* Icon Representation */}
                 <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg", course.color || "from-zinc-700 to-zinc-900")}>
                    <BookOpen className="w-6 h-6" />
                 </div>

                 <div className="flex-grow space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">{course.title}</h3>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed line-clamp-1">{(course as any).fullName || course.title}</p>
                 </div>

                 {/* Operational Stats */}
                 <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.2em]">Duration</span>
                       <p className="text-[10px] font-black text-zinc-400 flex items-center gap-2 max-w-full truncate"><Clock className="w-3 h-3 text-primary" /> {course.duration}</p>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.2em]">Fees Profile</span>
                       <p className="text-[10px] font-black text-zinc-400 flex items-center gap-2 max-w-full truncate"><CreditCard className="w-3 h-3 text-emerald-500" /> {course.fees?.split('–')[0].trim() || "Contact Us"}</p>
                    </div>
                 </div>

                 {/* Interaction Overlay */}
                 <div className="mt-8 flex items-center gap-3">
                    <button 
                      onClick={() => handleToggleVisibility(course.id, (course as any).is_published ?? true)}
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                        ((course as any).is_published ?? true) ? "bg-white/5 text-zinc-600 hover:text-white" : "bg-primary/20 text-primary hover:bg-primary/30"
                      )}
                      title={((course as any).is_published ?? true) ? "Hide from website" : "Show on website"}
                    >
                      {((course as any).is_published ?? true) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <Link 
                      href={`/neekadmin/dashboard/courses/edit/${course.id}`}
                      className="flex-grow h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center gap-2 text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Studio
                    </Link>
                    <button 
                      onClick={() => handleDelete(course.id, course.title)}
                      className="w-12 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link 
                      href={`/courses/${course.id}`}
                      target="_blank"
                      className="w-12 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-zinc-600 hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                 </div>
               </motion.div>
             ))
           ) : (
             <div className="lg:col-span-3 py-20 text-center">
                <Database className="w-16 h-16 text-zinc-800 mx-auto mb-6 opacity-20" />
                <h3 className="text-xl font-black text-zinc-500 uppercase tracking-tight">Curriculum Empty</h3>
                <p className="text-zinc-700 font-bold mb-8 uppercase text-[10px] tracking-widest">No matching courses found in the registry.</p>
                <button 
                   onClick={() => setSearch("")}
                   className="text-primary font-black text-[10px] uppercase tracking-[0.3em] hover:opacity-70"
                >
                   Reset Registry
                </button>
             </div>
           )}
        </div>
      </div>
    </AdminLayout>
  );
}
