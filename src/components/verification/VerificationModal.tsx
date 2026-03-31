"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, FileText, Download, ShieldCheck } from "lucide-react";
import { VerificationForm } from "./VerificationForm";
import { ResultCard } from "./ResultCard";
import { verificationService } from "@/services/verificationService";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string; // teacher, student, certificate, marksheet, query
  prefillId?: string;
}

export function VerificationModal({ isOpen, onClose, type, prefillId }: VerificationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (formData: any) => {
    setIsLoading(true);
    setHasSearched(true);
    setResult(null);

    try {
      let data = null;
      switch (type) {
        case "query":
          data = await verificationService.trackQuery(formData.id, formData.mobile);
          break;
        case "teacher":
          data = await verificationService.verifyTeacher(formData.id);
          break;
        case "student":
          data = await verificationService.verifyStudent(formData.id);
          break;
        case "certificate":
          data = await verificationService.verifyCertificate(formData.id);
          break;
        case "marksheet":
          data = await verificationService.verifyMarksheet(formData.id);
          break;
      }
      setResult(data);
    } catch (error: any) {
      toast.error("Verification system error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setResult(null);
    setHasSearched(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-y-auto scrollbar-hide border border-white/20 dark:border-zinc-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-16">
          <VerificationForm 
            type={type} 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            onReset={resetSearch}
            prefillId={prefillId}
          />

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-sm font-bold text-primary animate-pulse uppercase tracking-[0.2em]">Contacting Registry...</p>
              </motion.div>
            )}

            {!isLoading && hasSearched && !result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-10 rounded-[2.5rem] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
                   <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-bold text-red-900 dark:text-red-400">Record Not Found</h3>
                   <p className="text-red-600 dark:text-red-400/70 text-sm max-w-xs mx-auto">
                     The provided ID does not match any official Vision IT records. Please check the spelling or contact support.
                   </p>
                </div>
              </motion.div>
            )}

            {!isLoading && result && (
              <div className="space-y-6">
                <ResultCard type={type} data={result} />
                
                {/* Certificate Download Action */}
                {type === "certificate" && result.status === "Genuine" && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800"
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                           <FileText className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="font-bold text-zinc-900 dark:text-zinc-100">Official E-Certificate</p>
                           <p className="text-xs text-zinc-500">ISO 9001:2015 Digitally Verified</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => toast.success("PDF Generation is in progress...")}
                       className="w-full md:w-auto px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.05] active:scale-95 transition-all text-sm group"
                     >
                        <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        Download PDF Copy
                     </button>
                   </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
