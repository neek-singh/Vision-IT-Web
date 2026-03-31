"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { defaultTestimonials } from "@/data/testimonials";
import { testimonialService, Testimonial } from "@/services/testimonialService";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Quote, 
  RefreshCw, 
  Loader2, 
  Database,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TestimonialManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    const unsub = testimonialService.subscribeToTestimonials((data) => {
      setTestimonials(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleMigrate = async () => {
    if (!confirm("Import default student stories?")) return;
    setMigrating(true);
    try {
      await testimonialService.migrateStaticTestimonials(defaultTestimonials as any);
    } catch (err) {
      alert("Migration failed");
    } finally {
      setMigrating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await testimonialService.deleteTestimonial(id);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout title="Student Voice" subtitle="Manage student success stories and visual testimonials">
      <div className="space-y-8">
        <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Star className="w-6 h-6 fill-amber-500" />
             </div>
             <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Growth Engine</h3>
                <p className="text-2xl font-black text-amber-500">{testimonials.length} Success Stories</p>
             </div>
          </div>
          
          <div className="flex gap-3">
             {testimonials.length === 0 && !loading && (
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
                New Success Story
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 animate-pulse" />
              ))
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={testimonial.id || testimonial.name}
                  className="p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 group relative flex flex-col"
                >
                  <div className="absolute top-6 right-8 text-primary/10">
                     <Quote className="w-12 h-12" />
                  </div>

                  <div className="flex gap-1 mb-6">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-3 h-3", i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-zinc-800")} />
                     ))}
                  </div>

                  <p className="text-[11px] text-zinc-400 font-medium italic leading-relaxed mb-8 flex-grow">
                     "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
                     <div className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-700">
                        <img src={testimonial.avatar} alt="" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-grow">
                        <h5 className="text-[11px] font-black text-white uppercase tracking-wider">{testimonial.name}</h5>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
                           <GraduationCap className="w-3.5 h-3.5 text-primary" />
                           {testimonial.course}
                        </div>
                     </div>
                     <div className="flex gap-1">
                        <button 
                          onClick={() => handleDelete(testimonial.id!)}
                          className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                           <Edit3 className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 bg-zinc-900/30 rounded-[3rem] border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600">
                 <Database className="w-12 h-12 mb-4 opacity-20" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em]">No success stories found</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
}
