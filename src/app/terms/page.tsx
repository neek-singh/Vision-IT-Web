"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen bg-background transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest"
          >
            <BookOpen className="w-4 h-4" />
            Enrollment Terms
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Last Updated: March 31, 2026</p>
        </div>

        {/* Content Section */}
        <div className="glass rounded-[2.5rem] p-8 md:p-12 bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 space-y-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10" />
          
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
            Vision IT Computer Institute Pratuppur में admission लेने से पहले, कृपया निम्नलिखित नियमों और शर्तों (Terms & Conditions) को ध्यानपूर्वक पढ़ें।
          </p>

          <TermBlock 
            icon={<AlertCircle className="text-amber-500" />}
            title="1. Admission & Enrollment"
            points={[
              "All admissions are subject to eligibility and document verification.",
              "Students must provide accurate and verifiable information in the admission form.",
              "Management reserves the right to refuse admission to any candidate.",
              "Admission is confirmed only after the payment of the registration fee."
            ]}
          />

          <TermBlock 
            icon={<FileText className="text-blue-500" />}
            title="2. Fee Structure & Refunds"
            points={[
              "Fees must be paid on or before the specified due dates.",
              "Late fee payment may attract a penalty or temporary suspension of classes.",
              "Registration fees and course fees are non-refundable once the course has commenced.",
              "Dues must be cleared before the final examination and certification."
            ]}
          />

          <TermBlock 
            icon={<CheckCircle2 className="text-emerald-500" />}
            title="3. Attendance & Conduct"
            points={[
              "Maintaining at least 75% attendance is mandatory for certificate eligibility.",
              "Students must maintain discipline and professional conduct inside the institute premises.",
              "Damage to institute property (computers, furniture, etc.) will be compensated by the student.",
              "Unauthorized software installation or misuse of internet is strictly prohibited."
            ]}
          />

          <TermBlock 
            icon={<AlertCircle className="text-red-500" />}
            title="4. Certification"
            points={[
              "Certificates will only be issued upon successful completion of the course and final assessment.",
              "Vision IT certificates are verified through our online registry portal.",
              "Institute is not responsible for certificates obtained through unofficial channels."
            ]}
          />

          <div className="p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
             <div className="flex items-center gap-3 text-primary mb-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Policy Update Notice</h4>
             </div>
             <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                Vision IT Computer Institute reserves the right to modify these terms and conditions at any time without prior notice. The updated terms will be published on our website immediately.
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function TermBlock({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((point, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-50 dark:border-zinc-800 group hover:shadow-lg transition-all hover:border-emerald-500/20">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
