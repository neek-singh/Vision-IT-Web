"use client";

import React, { useState, useEffect } from "react";
import { faqService, FAQItem } from "@/services/faqService";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  HelpCircle,
  Eye,
  EyeOff,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState<Partial<FAQItem>>({});

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    const data = await faqService.getFaqs(false); // Get all
    setFaqs(data);
    setLoading(false);
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setEditForm(faq);
  };

  const handleSave = async () => {
    setFaqs(prev => prev.map(f => f.id === editingId ? { ...f, ...editForm } as FAQItem : f));
    setEditingId(null);
  };

  const toggleVisibility = (id: string | number) => {
    setFaqs(prev => prev.map(f => 
      f.id === id ? { ...f, is_published: !f.is_published } : f
    ));
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Student FAQs</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage common questions and answers for students.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5" />
          Add Question
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "glass rounded-2xl border transition-all duration-300",
                  editingId === faq.id ? "border-primary ring-1 ring-primary/20" : "border-white/10 hover:border-white/30",
                  !faq.is_published && "opacity-60 grayscale-[0.5]"
                )}
              >
                <div className="p-5">
                  {editingId === faq.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3">
                          <label className="text-[10px] font-bold uppercase text-zinc-500 mb-1 block ml-1">Question</label>
                          <input 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-primary outline-none font-bold"
                            value={editForm.question}
                            onChange={e => setEditForm({...editForm, question: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-zinc-500 mb-1 block ml-1">Category</label>
                          <input 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-primary outline-none"
                            value={editForm.category}
                            onChange={e => setEditForm({...editForm, category: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-zinc-500 mb-1 block ml-1">Answer</label>
                        <textarea 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-2 ring-primary outline-none h-24 resize-none"
                          value={editForm.answer}
                          onChange={e => setEditForm({...editForm, answer: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase text-primary tracking-tighter bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                            {faq.category}
                          </span>
                          <h3 className="font-bold text-lg">{faq.question}</h3>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => handleEdit(faq)}
                          className="p-2 hover:bg-primary/10 text-zinc-400 hover:text-primary rounded-lg transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleVisibility(faq.id)}
                          className="p-2 hover:bg-amber-500/10 text-zinc-400 hover:text-amber-500 rounded-lg transition-all"
                        >
                          {faq.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button className="p-2 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-500 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
