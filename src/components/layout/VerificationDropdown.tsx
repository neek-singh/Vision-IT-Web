"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronDown, 
  Search, 
  UserCheck, 
  GraduationCap, 
  FileCheck, 
  ClipboardCheck,
  ShieldAlert,
  Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { VerificationModal } from "../verification/VerificationModal";

const verificationItems = [
  { id: "query", name: "Track Application", icon: Search, desc: "Check admission status" },
  { id: "teacher", name: "Teacher Verify", icon: UserCheck, desc: "Check faculty profile" },
  { id: "student", name: "Student Verify", icon: GraduationCap, desc: "Enrollment status" },
  { id: "certificate", name: "Certificate", icon: FileCheck, desc: "Verify diploma authenticity" },
  { id: "marksheet", name: "Marksheet", icon: ClipboardCheck, desc: "Verify academic grades" },
];

export function VerificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-semibold transition-all px-4 py-2 rounded-xl group relative overflow-hidden",
          isOpen 
            ? "text-primary bg-primary/5 dark:text-primary-light dark:bg-primary/10" 
            : "text-zinc-600 hover:text-primary dark:text-zinc-300 dark:hover:text-primary-light"
        )}
      >
        <Fingerprint className="w-4 h-4 group-hover:scale-110 transition-transform" />
        Track & Verify
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
        
        {/* Animated underlines only for active state */}
        <AnimatePresence>
          {isOpen && (
            <motion.span 
              layoutId="nav-underline"
              className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-primary-light"
            />
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full left-0 mt-3 w-72 glass bg-white dark:bg-zinc-900 rounded-[2rem] p-4 shadow-2xl border border-zinc-100 dark:border-zinc-800 backdrop-blur-2xl z-[60]"
          >
            <div className="space-y-1.5">
               <p className="px-4 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Institutional Verification</p>
               {verificationItems.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => {
                     setActiveModal(item.id);
                     setIsOpen(false);
                   }}
                   className="w-full text-left flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all group lg:hover:pl-6"
                 >
                   <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-primary-light transition-all shadow-sm">
                      <item.icon className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:translate-x-0.5 transition-transform">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">{item.desc}</p>
                   </div>
                 </button>
               ))}
            </div>

            {/* Footer Alert */}
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 px-2">
               <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 text-amber-600 dark:text-amber-500 border border-amber-500/10">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <p className="text-[10px] font-bold uppercase tracking-wider">Secure Registry Portal</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification Modal Portal-like component */}
      <AnimatePresence>
        {activeModal && (
          <VerificationModal
            isOpen={!!activeModal}
            onClose={() => setActiveModal(null)}
            type={activeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
