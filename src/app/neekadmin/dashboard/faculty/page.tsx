"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { defaultFaculty } from "@/data/faculty";
import { facultyService, FacultyMember } from "@/services/facultyService";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  UserPlus, 
  Linkedin, 
  Mail, 
  Briefcase, 
  GraduationCap,
  RefreshCw,
  Loader2,
  Database,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FacultyManagementPage() {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    const unsub = facultyService.subscribeToFaculty((data) => {
      setMembers(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await facultyService.toggleVisibility(id, !currentStatus);
    } catch (err) {
      alert("Failed to toggle visibility");
    }
  };

  const handleMigrate = async () => {
    if (!confirm("Import default faculty data?")) return;
    setMigrating(true);
    try {
      await facultyService.migrateStaticFaculty(defaultFaculty as any);
    } catch (err) {
      alert("Migration failed");
    } finally {
      setMigrating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this faculty member?")) return;
    try {
      await facultyService.deleteMember(id);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout title="Faculty Roster" subtitle="Manage your team of professional instructors">
      <div className="space-y-8">
        <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <GraduationCap className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Total Staff</h3>
                <p className="text-2xl font-black text-primary">{members.length}</p>
             </div>
          </div>
          
          <div className="flex gap-3">
             {members.length === 0 && !loading && (
                <button 
                  onClick={handleMigrate}
                  disabled={migrating}
                  className="px-6 h-12 bg-zinc-800 hover:bg-zinc-700 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-300 transition-all border border-zinc-700/50 shadow-lg"
                >
                  {migrating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  Import Defaults
                </button>
             )}
             <button className="px-6 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4" />
                Add Instructor
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 animate-pulse" />
              ))
            ) : members.length > 0 ? (
              members.map((member) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={member.id}
                  className={cn(
                    "p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 group relative overflow-hidden transition-all duration-500",
                    !member.is_published && "opacity-50 grayscale-[0.5]"
                  )}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <h4 className="text-xl font-black text-white">{member.name}</h4>
                             {!member.is_published && (
                                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[8px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-700">Hidden</span>
                             )}
                          </div>
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{member.role}</span>
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-600 border border-zinc-700">
                          <Briefcase className="w-5 h-5" />
                       </div>
                    </div>
                    
                    <p className="text-[11px] text-zinc-400 font-medium leading-relaxed flex-grow border-l-2 border-primary/20 pl-4 mb-6">
                       {member.summary}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                       <div className="flex gap-2">
                          <button 
                            onClick={() => handleToggleVisibility(member.id, member.is_published)}
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                              member.is_published ? "bg-zinc-800 text-zinc-500 hover:text-white" : "bg-primary/20 text-primary hover:bg-primary/30"
                            )}
                            title={member.is_published ? "Hide from website" : "Show on website"}
                          >
                            {member.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                             <Trash2 className="w-4 h-4" onClick={() => handleDelete(member.id)} />
                          </button>
                          <button className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                             <Edit3 className="w-4 h-4" />
                          </button>
                       </div>
                       <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{member.experience} Exp</div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 bg-zinc-900/30 rounded-[3rem] border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600">
                 <Database className="w-12 h-12 mb-4 opacity-20" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">No faculty registered</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
}
