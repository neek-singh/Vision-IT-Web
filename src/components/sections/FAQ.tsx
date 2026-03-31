"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  Plus, 
  Minus, 
  Sparkles,
  Search,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: 1,
    question: "How can I apply for admission?",
    answer: "You can apply online via our Admission portal or visit our Pratappur campus in person. For online applications, just fill out the registration form, and our counselor will call you within 24 hours.",
    category: "Admission"
  },
  {
    id: 2,
    question: "Are the certificates government-recognized?",
    answer: "Yes, Vision IT Computer Institute is ISO 9001:2015 certified and provides government-recognized diplomas and certificates that are valid for private sector roles and government exam prerequisites.",
    category: "Certification"
  },
  {
    id: 3,
    question: "Do you offer practical lab sessions?",
    answer: "Absolutely. We maintain a 1:1 student-to-computer ratio. Every theoretical concept is followed by extensive practical lab sessions to ensure hands-on mastery.",
    category: "Learning"
  },
  {
    id: 4,
    question: "What are the timings for batches?",
    answer: "We offer flexible batch timings (Morning & Evening) to accommodate regular students as well as working professionals. Typical sessions run from 8:00 AM to 6:00 PM.",
    category: "Timing"
  },
  {
    id: 5,
    question: "Do you provide job placement support?",
    answer: "Yes, we have a dedicated placement cell that helps students with resume building, mock interviews, and connecting them with local and regional tech firms.",
    category: "Career"
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-12 px-6 bg-surface-secondary overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Header & CTA */}
        <div className="lg:w-[40%] space-y-10 lg:sticky lg:top-24">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Everything You <span className="text-gradient">Need to Know</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed max-w-xl">
              हम students के सभी doubts clear करना चाहते हैं। यहाँ कुछ common questions के answers दिए गए हैं।
            </p>
          </div>

          <div className="p-6 glass bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-primary/5">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Still have doubts?
            </h4>
            <p className="text-sm text-zinc-500 mb-8">If you can't find the answer you're looking for, feel free to reach out to our team directly.</p>
            <Link 
              href="/contact"
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Side: Accordion Grid */}
        <div className="flex-1 space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              layout
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "group rounded-[2rem] border transition-all duration-300 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:shadow-primary/5",
                openId === faq.id 
                  ? "border-primary/50 shadow-2xl shadow-primary/5" 
                  : "border-zinc-200 dark:border-zinc-800"
              )}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-6"
              >
                <div className="flex gap-4 md:gap-6">
                   <div className={cn(
                     "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all",
                     openId === faq.id ? "bg-primary text-white" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-400"
                   )}>
                     <span className="text-xs font-bold leading-none">{idx + 1}</span>
                   </div>
                   <div className="space-y-1">
                     <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{faq.category}</span>
                     <h3 className="text-base md:text-lg font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-primary transition-colors">
                       {faq.question}
                     </h3>
                   </div>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-full border border-zinc-100 dark:border-zinc-800 flex items-center justify-center transition-transform",
                  openId === faq.id && "rotate-180"
                )}>
                  {openId === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-6 pt-0 ml-14 md:ml-16 border-t border-zinc-50 dark:border-zinc-800/50">
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
