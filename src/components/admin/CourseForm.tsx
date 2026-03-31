"use client";

import React, { useState } from "react";
import { Course } from "@/data/courses";
import { courseService } from "@/services/courseService";
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  BookOpen, 
  Clock, 
  CreditCard, 
  Award, 
  Monitor, 
  Tag as TagIcon, 
  Palette,
  Layout,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  TrendingUp,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CourseFormProps {
  initialData?: Course;
  mode: "new" | "edit";
}

export function CourseForm({ initialData, mode }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    fullName: initialData?.fullName || "",
    description: initialData?.description || "",
    duration: initialData?.duration || "6 Months",
    fees: initialData?.fees || "₹5,000",
    certificate: initialData?.certificate || "Government Verified",
    mode: initialData?.mode || "Offline / Hybrid",
    color: initialData?.color || "from-blue-600 to-indigo-700",
    iconName: initialData?.iconName || "Monitor",
    image: initialData?.image || "",
    tagText: initialData?.tag?.text || "",
    tagColor: initialData?.tag?.color || "bg-primary",
    syllabus: initialData?.syllabus || [""],
    benefits: initialData?.benefits || [""],
    careerPaths: initialData?.careerPaths || [""],
  });

  const handleArrayChange = (field: "syllabus" | "benefits" | "careerPaths", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "syllabus" | "benefits" | "careerPaths") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: "syllabus" | "benefits" | "careerPaths", index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [""] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const coursePayload = {
        title: formData.title,
        fullName: formData.fullName,
        description: formData.description,
        duration: formData.duration,
        fees: formData.fees,
        certificate: formData.certificate,
        mode: formData.mode,
        color: formData.color,
        iconName: formData.iconName,
        image: formData.image,
        syllabus: formData.syllabus.filter(s => s.trim() !== ""),
        benefits: formData.benefits.filter(b => b.trim() !== ""),
        careerPaths: formData.careerPaths.filter(c => c.trim() !== ""),
        tag: formData.tagText ? { text: formData.tagText, color: formData.tagColor } : undefined,
      };

      if (mode === "edit" && initialData?.id) {
        await courseService.updateCourse(initialData.id, coursePayload);
      } else {
        await courseService.createCourse(coursePayload);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/neekadmin/dashboard/courses");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to save course.");
    } finally {
      setLoading(false);
    }
  };

  const icons = [
    { name: "Monitor", icon: Monitor },
    { name: "Database", icon: Layout },
    { name: "Globe", icon: Globe },
    { name: "TrendingUp", icon: TrendingUp },
    { name: "Briefcase", icon: Briefcase },
  ];

  const colors = [
    { name: "Ocean Blue", className: "from-blue-600 to-indigo-700" },
    { name: "Vitality Green", className: "from-emerald-500 to-teal-700" },
    { name: "Sunset Gold", className: "from-amber-400 to-orange-600" },
    { name: "Tech Indigo", className: "from-indigo-500 to-blue-700" },
    { name: "Creative Rose", className: "from-pink-500 to-rose-700" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-6xl mx-auto pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Identity */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Course Essence</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Define the core identity</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Course Title (Short)</label>
                <input 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="ADCA, Tally, etc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Course Full Name</label>
                <input 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Advanced Diploma in..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Marketing Pitch</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-3xl text-sm font-medium leading-relaxed text-zinc-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Why should students join this course?"
              />
            </div>
          </div>

          {/* List Editors: Syllabus, Benefits */}
          <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-10">
             <div className="space-y-6">
                <label className="flex items-center justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4">
                   Digital Syllabus
                   <button 
                     type="button"
                     onClick={() => addArrayItem("syllabus")}
                     className="p-1 px-3 bg-primary/10 text-primary rounded-lg flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
                   >
                     <Plus className="w-3 h-3" /> Add Topic
                   </button>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {formData.syllabus.map((topic, idx) => (
                     <div key={idx} className="relative group">
                        <input 
                          value={topic}
                          onChange={(e) => handleArrayChange("syllabus", idx, e.target.value)}
                          className="w-full pl-6 pr-12 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs font-bold text-white focus:ring-1 focus:ring-primary outline-none"
                          placeholder={`Topic 0${idx + 1}`}
                        />
                        <button 
                          type="button"
                          onClick={() => removeArrayItem("syllabus", idx)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                   ))}
                </div>
             </div>

             <div className="space-y-6">
                <label className="flex items-center justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest px-4">
                   Career Paths
                   <button 
                     type="button"
                     onClick={() => addArrayItem("careerPaths")}
                     className="p-1 px-3 bg-blue-500/10 text-blue-500 rounded-lg flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all"
                   >
                     <Plus className="w-3 h-3" /> Add Role
                   </button>
                </label>
                <div className="flex flex-wrap gap-3">
                   {formData.careerPaths.map((role, idx) => (
                     <div key={idx} className="relative flex items-center">
                        <input 
                          value={role}
                          onChange={(e) => handleArrayChange("careerPaths", idx, e.target.value)}
                          className="pl-4 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] font-black uppercase text-white outline-none focus:border-blue-500 transition-all"
                          placeholder="Role Name"
                        />
                        <button 
                          type="button"
                          onClick={() => removeArrayItem("careerPaths", idx)}
                          className="absolute right-2 text-zinc-600 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Meta & Theming */}
        <div className="lg:col-span-5 space-y-8">
           <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-8">
              <div className="flex items-center gap-3">
                 <Palette className="w-5 h-5 text-primary" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Thematic Branding</h4>
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Card Color Palette</label>
                    <div className="flex flex-wrap gap-3">
                       {colors.map((c) => (
                         <button
                           key={c.className}
                           type="button"
                           onClick={() => setFormData({...formData, color: c.className})}
                           className={cn(
                             "w-10 h-10 rounded-full bg-gradient-to-br transition-all hover:scale-110",
                             c.className,
                             formData.color === c.className ? "ring-4 ring-white ring-offset-4 ring-offset-zinc-900" : "opacity-40"
                           )}
                           title={c.name}
                         />
                       ))}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Icon Representation</label>
                    <div className="grid grid-cols-5 gap-3">
                       {icons.map((item) => (
                         <button
                           key={item.name}
                           type="button"
                           onClick={() => setFormData({...formData, iconName: item.name})}
                           className={cn(
                             "p-3 rounded-xl border flex items-center justify-center transition-all",
                             formData.iconName === item.name 
                               ? "bg-primary border-primary text-white shadow-lg" 
                               : "bg-zinc-950 border-zinc-800 text-zinc-600 hover:text-white"
                           )}
                         >
                           <item.icon className="w-5 h-5" />
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3 mb-2">
                 <Layout className="w-4 h-4 text-zinc-500" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Operational Details</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                       <Clock className="w-3 h-3" /> Duration
                    </label>
                    <input 
                       value={formData.duration}
                       onChange={(e) => setFormData({...formData, duration: e.target.value})}
                       className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white outline-none"
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                       <CreditCard className="w-3 h-3" /> Fees Range
                    </label>
                    <input 
                       value={formData.fees}
                       onChange={(e) => setFormData({...formData, fees: e.target.value})}
                       className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white outline-none"
                    />
                 </div>
              </div>

              <div className="space-y-1.5">
                 <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                    <Award className="w-3 h-3" /> Certification Status
                 </label>
                 <input 
                    value={formData.certificate}
                    onChange={(e) => setFormData({...formData, certificate: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white outline-none"
                 />
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4">
                 <div className="flex items-center gap-3">
                    <input 
                       value={formData.tagText}
                       onChange={(e) => setFormData({...formData, tagText: e.target.value})}
                       className="flex-grow px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px] font-black uppercase text-white outline-none"
                       placeholder="Special Tag (e.g. Popular)"
                    />
                    <select 
                      value={formData.tagColor}
                      onChange={(e) => setFormData({...formData, tagColor: e.target.value})}
                      className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-[10px] font-bold text-zinc-400 outline-none"
                    >
                       <option value="bg-primary">Orange</option>
                       <option value="bg-emerald-500">Green</option>
                       <option value="bg-blue-500">Blue</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Actions Card */}
           <div className="p-8 rounded-[3rem] bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
              <button 
                type="submit"
                disabled={loading || success}
                className="w-full h-16 bg-primary rounded-3xl flex items-center justify-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {mode === "new" ? "Launch Course" : "Deploy Updates"}
              </button>
              
              <button 
                type="button"
                onClick={() => router.back()}
                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center gap-3 text-zinc-500 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all font-black"
              >
                <X className="w-5 h-5" />
                Cancel Operation
              </button>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Operation Successful!
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </form>
  );
}
