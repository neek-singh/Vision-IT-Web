"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { admissionService, AdmissionApplication } from "@/services/admissionService";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  ChevronRight,
  ArrowRightCircle,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const stages = [
  { id: "pending", name: "New Applications", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { id: "contacted", name: "Contacted", icon: Phone, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "enrolled", name: "Enrolled", icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { id: "rejected", name: "Rejected", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
] as const;

export default function AdmissionsPipeline() {
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("All Courses");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = admissionService.subscribeToAdmissions((data) => {
      setAdmissions(data);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: AdmissionApplication["status"]) => {
    setUpdatingId(id);
    try {
      await admissionService.updateStatus(id, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredAdmissions = admissions.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         app.phoneNumber.includes(searchQuery);
    const matchesCourse = filterCourse === "All Courses" || app.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const getAdmissionsByStage = (stageId: string) => {
    return filteredAdmissions.filter(app => app.status === stageId);
  };

  const courses = Array.from(new Set(admissions.map(app => app.course)));

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Admission Pipeline</h2>
            <p className="text-zinc-500 font-bold text-sm">Manage student enrollment lifecycle in real-time.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all w-64"
              />
            </div>
            <select 
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 outline-none"
            >
              <option>All Courses</option>
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col gap-6">
              {/* Stage Header */}
              <div className={cn(
                "p-6 rounded-3xl border flex items-center justify-between bg-zinc-900/50",
                stage.border
              )}>
                <div className="flex items-center gap-3">
                   <div className={cn("p-2.5 rounded-xl", stage.bg, stage.color)}>
                      <stage.icon className="w-5 h-5" />
                   </div>
                   <h3 className="font-black text-white text-xs uppercase tracking-widest">{stage.name}</h3>
                </div>
                <span className="text-[10px] font-black text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">
                  {getAdmissionsByStage(stage.id).length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-4 min-h-[500px]">
                <AnimatePresence mode="popLayout">
                  {getAdmissionsByStage(stage.id).map((app) => (
                    <motion.div
                      key={app.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group p-6 rounded-[2rem] bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all shadow-xl relative overflow-hidden"
                    >
                      {updatingId === app.id && (
                        <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                           <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white font-black text-sm border border-white/5 uppercase">
                              {app.fullName.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div>
                              <h4 className="text-white font-black text-xs uppercase tracking-tight">{app.fullName}</h4>
                              <p className="text-[10px] text-zinc-500 font-bold">{app.course}</p>
                           </div>
                        </div>
                        <button className="text-zinc-600 hover:text-white transition-colors">
                           <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3 mb-6">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500">
                            <Phone className="w-3 h-3" /> {app.phoneNumber}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                            <Clock className="w-3 h-3" /> Joined {app.submittedAt ? dayjs(app.submittedAt).fromNow() : 'just now'}
                         </div>
                      </div>

                      {/* Stage Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                         {stage.id === 'pending' && (
                           <button 
                             onClick={() => handleStatusUpdate(app.id!, 'contacted')}
                             className="flex-grow flex items-center justify-center gap-2 h-10 rounded-xl bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                           >
                              Contacted <ArrowRightCircle className="w-3 h-3" />
                           </button>
                         )}
                         {stage.id === 'contacted' && (
                           <div className="flex gap-2 w-full">
                              <button 
                                onClick={() => handleStatusUpdate(app.id!, 'enrolled')}
                                className="flex-grow flex items-center justify-center gap-2 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
                              >
                                 Enroll <CheckCircle2 className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(app.id!, 'rejected')}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                              >
                                 <XCircle className="w-4 h-4" />
                              </button>
                           </div>
                         )}
                         {stage.id === 'enrolled' && (
                           <div className="w-full flex items-center justify-center h-10 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                              <UserCheck className="w-4 h-4 mr-2" /> Officially Visionary
                           </div>
                         )}
                         {stage.id === 'rejected' && (
                           <button 
                             onClick={() => handleStatusUpdate(app.id!, 'pending')}
                             className="flex-grow flex items-center justify-center gap-2 h-10 rounded-xl bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all"
                           >
                              Restore <Clock className="w-3 h-3" />
                           </button>
                         )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {getAdmissionsByStage(stage.id).length === 0 && (
                  <div className="py-12 px-6 rounded-[2rem] border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center opacity-50">
                     <stage.icon className="w-8 h-8 text-zinc-700 mb-4" />
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">No candidates here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
