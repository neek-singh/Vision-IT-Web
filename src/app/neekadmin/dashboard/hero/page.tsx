"use client";

import React, { useState, useEffect } from "react";
import { heroService, HeroSlide } from "@/services/heroService";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroManagement() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Partial<HeroSlide>>({});

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const data = await heroService.getSlides(false); // Get all, including unpublished
    setSlides(data);
    setLoading(false);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setEditForm(slide);
  };

  const handleSave = async () => {
    // In a real implementation, this would call heroService.updateSlide
    // For now, we update local state to simulate the dynamic feel
    setSlides(prev => prev.map(s => s.id === editingId ? { ...s, ...editForm } as HeroSlide : s));
    setEditingId(null);
    // TODO: Implement actual Supabase update in heroService
  };

  const toggleVisibility = (id: string | number) => {
    setSlides(prev => prev.map(s => 
      s.id === id ? { ...s, is_published: !s.is_published } : s
    ));
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Hero Sliders</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage the main announcement area of your homepage.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5" />
          Add New Slide
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "glass rounded-3xl overflow-hidden border transition-all duration-300",
                  editingId === slide.id ? "border-primary shadow-xl" : "border-white/20 hover:border-white/40 shadow-sm",
                  !slide.is_published && "opacity-60 saturate-50"
                )}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Slide Preview / Image */}
                    <div className="w-full lg:w-48 h-32 rounded-2xl overflow-hidden relative bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                      {slide.image ? (
                        <img src={slide.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-zinc-400">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <div className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white font-bold uppercase">
                          Slide {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow space-y-4">
                      {editingId === slide.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-primary outline-none col-span-2 font-bold"
                            value={editForm.title}
                            onChange={e => setEditForm({...editForm, title: e.target.value})}
                            placeholder="Slide Title"
                          />
                          <textarea 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-primary outline-none col-span-2 h-20 resize-none"
                            value={editForm.description}
                            onChange={e => setEditForm({...editForm, description: e.target.value})}
                            placeholder="Description"
                          />
                          <input 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-primary outline-none"
                            value={editForm.subtext}
                            onChange={e => setEditForm({...editForm, subtext: e.target.value})}
                            placeholder="Highlight Text (e.g. Join Now)"
                          />
                          <input 
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-primary outline-none"
                            value={editForm.accent}
                            onChange={e => setEditForm({...editForm, accent: e.target.value})}
                            placeholder="Accent Color Class"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold">{slide.title}</h3>
                            {!slide.is_published && (
                              <span className="px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase border border-yellow-500/20">
                                Hidden
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">{slide.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                            <span>CTA 1: {slide.cta1.text} ({slide.cta1.href})</span>
                            <span>•</span>
                            <span>CTA 2: {slide.cta2.text} ({slide.cta2.href})</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 justify-end lg:justify-start">
                      {editingId === slide.id ? (
                        <>
                          <button 
                            onClick={handleSave}
                            className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="p-3 bg-zinc-500 text-white rounded-2xl shadow-lg shadow-zinc-500/20 hover:scale-105 transition-transform"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEdit(slide)}
                            className="p-3 glass hover:bg-primary/10 text-primary rounded-2xl transition-all"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => toggleVisibility(slide.id)}
                            className="p-3 glass hover:bg-amber-500/10 text-amber-500 rounded-2xl transition-all"
                          >
                            {slide.is_published ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                          <button className="p-3 glass hover:bg-rose-500/10 text-rose-500 rounded-2xl transition-all">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
