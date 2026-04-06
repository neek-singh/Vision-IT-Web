"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { defaultFaculty } from "@/data/faculty";
import { facultyService, FacultyMember } from "@/services/facultyService";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Linkedin, 
  Mail, 
  Briefcase, 
  GraduationCap,
  RefreshCw,
  Loader2,
  Database,
  Eye,
  EyeOff,
  X,
  Save,
  User,
  Type,
  FileText,
  Calendar,
  Link as LinkIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FacultyManagementPage() {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMember, setEditingMember] = useState<FacultyMember | null>(null);
  const [formValues, setFormValues] = useState<Partial<FacultyMember>>({
    name: "",
    role: "",
    specialization: "",
    experience: "",
    summary: "",
    image: "",
    linkedIn: "",
    email: "",
    is_published: true
  });

  useEffect(() => {
    const unsub = facultyService.subscribeToFaculty((data) => {
      setMembers(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleOpenModal = (member?: FacultyMember) => {
    if (member) {
      setEditingMember(member);
      setFormValues(member);
    } else {
      setEditingMember(null);
      setFormValues({
        name: "",
        role: "",
        specialization: "",
        experience: "",
        summary: "",
        image: "",
        linkedIn: "",
        email: "",
        is_published: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await facultyService.toggleVisibility(id, !currentStatus);
    } catch (err: any) {
      alert("Failed to toggle visibility: " + err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.role) {
      alert("Name and Role are required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingMember) {
        await facultyService.updateMember(editingMember.id, formValues);
      } else {
        await facultyService.createMember({
          ...formValues as any,
          id: Math.random().toString(36).substr(2, 9), // Simple ID generator if not UUID
        });
      }
      handleCloseModal();
    } catch (err: any) {
      alert("Operation failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMigrate = async () => {
    if (!confirm("Import default faculty data?")) return;
    setMigrating(true);
    try {
      await facultyService.migrateStaticFaculty(defaultFaculty as any);
    } catch (err: any) {
      alert("Migration failed: " + err.message);
    } finally {
      setMigrating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this faculty member?")) return;
    try {
      await facultyService.deleteMember(id);
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <AdminLayout title="Faculty Roster" subtitle="Manage your team of professional instructors">
      <div className="space-y-8">
        {/* Header Stats & Actions */}
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
             <button 
               onClick={() => handleOpenModal()}
               className="px-6 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
             >
                <Plus className="w-4 h-4" />
                Add Instructor
             </button>
          </div>
        </div>

        {/* Members Grid */}
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
                          <div className="flex items-center gap-2 text-wrap pr-4">
                             <h4 className="text-xl font-black text-white">{member.name}</h4>
                             {!member.is_published && (
                                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[8px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-700 whitespace-nowrap">Hidden</span>
                             )}
                          </div>
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{member.role}</span>
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-600 border border-zinc-700 flex-shrink-0">
                          <Briefcase className="w-5 h-5" />
                       </div>
                    </div>
                    
                    <p className="text-[11px] text-zinc-400 font-medium leading-relaxed flex-grow border-l-2 border-primary/20 pl-4 mb-6 line-clamp-3">
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
                          <button 
                            onClick={() => handleDelete(member.id)}
                            className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-red-500 transition-colors"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleOpenModal(member)}
                            className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-primary transition-colors"
                          >
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

      {/* Faculty Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {editingMember ? "Edit Instructor" : "Add New Instructor"}
                  </h3>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Enter the professional details for the faculty roster
                  </p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input 
                      type="text"
                      required
                      value={formValues.name}
                      onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                      placeholder="e.g. Dr. Satish Singh"
                      className="w-full bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="w-3 h-3" /> Professional Role
                    </label>
                    <input 
                      type="text"
                      required
                      value={formValues.role}
                      onChange={(e) => setFormValues({...formValues, role: e.target.value})}
                      placeholder="e.g. Senior Faculty"
                      className="w-full bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Type className="w-3 h-3" /> Specialization
                    </label>
                    <input 
                      type="text"
                      value={formValues.specialization}
                      onChange={(e) => setFormValues({...formValues, specialization: e.target.value})}
                      placeholder="e.g. Programming & Database"
                      className="w-full bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Experience
                    </label>
                    <input 
                      type="text"
                      value={formValues.experience}
                      onChange={(e) => setFormValues({...formValues, experience: e.target.value})}
                      placeholder="e.g. 5+ Years"
                      className="w-full bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Professional Summary
                  </label>
                  <textarea 
                    rows={4}
                    value={formValues.summary}
                    onChange={(e) => setFormValues({...formValues, summary: e.target.value})}
                    placeholder="Short professional biography..."
                    className="w-full bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" /> LinkedIn URL
                    </label>
                    <input 
                      type="url"
                      value={formValues.linkedIn}
                      onChange={(e) => setFormValues({...formValues, linkedIn: e.target.value})}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input 
                      type="email"
                      value={formValues.email}
                      onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                      placeholder="staff@visionit.com"
                      className="w-full bg-white/5 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-3xl border border-primary/10">
                  <div className="flex items-center gap-4 text-primary">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      {formValues.is_published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest">Public Visibility</h4>
                      <p className="text-[10px] font-bold opacity-70">Toggle shown on website</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFormValues({...formValues, is_published: !formValues.is_published})}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      formValues.is_published ? "bg-primary" : "bg-zinc-700"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full absolute top-1 transition-all",
                      formValues.is_published ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>

                <div className="mt-10 flex gap-4">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-grow px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {editingMember ? "Update Instructor" : "Register Instructor"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
