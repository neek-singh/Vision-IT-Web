"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Linkedin, 
  Mail,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

import { facultyService, FacultyMember } from "@/services/facultyService";

export function Faculty({ initialMembers }: { initialMembers?: FacultyMember[] }) {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>(initialMembers || []);
  const [loading, setLoading] = useState(!initialMembers);

  useEffect(() => {
    if (initialMembers) return;

    // Only show published faculty members to the public
    const unsub = facultyService.subscribeToFaculty((data) => {
      setFacultyMembers(data.filter(m => m.is_published));
      setLoading(false);
    });
    return () => unsub();
  }, [initialMembers]);

  return (
    <section className="py-12 bg-surface-secondary px-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-primary/[0.02] dark:bg-primary/[0.04] -skew-x-12 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 text-zinc-900 dark:text-white">
          <div className="max-w-2xl space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
            >
              <UserCheck className="w-3 h-3" />
              Expert Mentors
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Meet Your <span className="text-gradient">Professional Team</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
              Experience matters. Our faculty brings industry knowledge and personalized teaching to every batch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {facultyMembers.map((member, idx) => (
            <FacultyCard 
               key={member.id} 
               member={member} 
               index={idx} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacultyCard({ member, index }: { member: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group p-6 md:p-8 glass bg-white dark:bg-zinc-900 shadow-2xl shadow-primary/5 rounded-[3.5rem] relative overflow-hidden border border-zinc-100 dark:border-zinc-800"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px] -z-10" />
      
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Placeholder Avatar Icon (No Images) */}
        <div className="relative w-24 h-24 shrink-0 group-hover:scale-110 transition-transform duration-700">
          <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 rounded-3xl -rotate-6 scale-105 group-hover:rotate-0 transition-all duration-500" />
          <div className="w-full h-full rounded-3xl bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-primary/30 border border-zinc-200 dark:border-zinc-800 relative z-10 glass">
            <GraduationCap className="w-10 h-10" />
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
              {member.name}
            </h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
               <p className="text-[10px] font-black text-primary uppercase tracking-widest">{member.role}</p>
               <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
               <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">{member.experience}</p>
            </div>
          </div>

          <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
             {member.summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {member.specialization.split(", ").map((tag: string) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex gap-3">
              <SocialIcon icon={<Linkedin className="w-3.5 h-3.5" />} />
              <SocialIcon icon={<Mail className="w-3.5 h-3.5" />} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
      {label}
    </span>
  );
}

function SocialIcon({ icon }: { icon: any }) {
  return (
     <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-primary transition-all active:scale-90">
       {icon}
     </button>
  )
}
