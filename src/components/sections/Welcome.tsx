"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function Welcome() {
  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden bg-background transition-colors duration-500">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-primary" />
                Welcome to Vision IT
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Pratappur का सबसे भरोसेमंद <span className="text-gradient">Computer Training</span> सेंटर
              </h2>
            </div>

            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed text-justify">
              <p>
                Agar aap <strong>Pratappur</strong> mein ek aisa computer institute ki talash kar rahe hain jahan theory se zyada practical knowledge di jaati hai, toh aap sahi jagah aaye hain. <strong className="text-zinc-900 dark:text-white font-bold">Vision IT Computer Institute Pratappur</strong> pichle kai saalon se Pratappur aur aas-paas ke areas jaise <strong>Wadrafnagar, Surajpur, aur Balrampur</strong> ke students ka ekmatra bharosa bana hua hai.
              </p>
              <p>
                Humara maqsad sirf certificate dena nahi, balki aapko job-ready banana hai. <strong className="text-zinc-900 dark:text-white font-bold">Class 6th ke students hon ya PG (Graduate) level ke</strong>, Vision IT Pratappur par hum provide karte hain industry-leading courses jaise DCA, PGDCA, Junior Special, aur Tally Prime with GST. Hum sirf theory nahi, balki <strong className="text-primary font-bold">Hands-on Practical Training</strong> par focus karte hain taaki aap industry ke kisi bhi professional se peeche na rahein.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-900 dark:text-white font-bold">500+</span>
                  <span className="text-xs text-zinc-500">Students Trained</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-900 dark:text-white font-bold">Expert</span>
                  <span className="text-xs text-zinc-500">Faculty Members</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="p-8 rounded-[2.5rem] bg-surface-secondary border border-zinc-200/50 dark:border-zinc-800/50 space-y-4 hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Recognition</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Our DCA/PGDCA certificates are university recognized and valid for all Govt Jobs.</p>
            </div>
            
            <div className="p-8 rounded-[2.5rem] bg-primary text-white space-y-4 shadow-2xl shadow-primary/20 translate-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Practical Lab</h3>
              <p className="text-white/80 text-sm leading-relaxed">Dedicated PC for every student with high-speed internet and power backup.</p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-surface-secondary border border-zinc-200/50 dark:border-zinc-800/50 space-y-4 sm:-translate-y-6 hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">1:1 Attention</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Small batches ensuring every student receives personal guidance and clarity.</p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 space-y-4 sm:translate-y-0">
              <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Career First</h3>
              <p className="opacity-70 text-sm leading-relaxed">Focus on placement support and resume building for local IT and Govt sectors.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
