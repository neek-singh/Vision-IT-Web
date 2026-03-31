import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, Loader2, AlertCircle, Phone, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Schema depends on type
const getValidationSchema = (type: string) => {
  if (type === "query") {
    return z.object({
      id: z.string().min(1, "Registration ID is required"),
      mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit mobile number"),
    });
  }
  return z.object({
    id: z.string().min(1, "Verification ID / Roll No is required"),
  });
};

interface VerificationFormProps {
  type: string;
  onSearch: (data: any) => Promise<void>;
  isLoading: boolean;
  onReset: () => void;
  prefillId?: string;
}

export function VerificationForm({ type, onSearch, isLoading, onReset, prefillId }: VerificationFormProps) {
  const schema = getValidationSchema(type);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<{ id: string, mobile?: string }>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (prefillId) {
      setValue("id", prefillId);
      onSearch({ id: prefillId });
    }
  }, [prefillId, setValue]);

  const onSubmit = (data: any) => {
    onSearch(data);
  };

  const labels: Record<string, string> = {
    query: "Application Tracking",
    teacher: "Faculty Verification",
    student: "Student Enrollment",
    certificate: "Authenticity Check",
    marksheet: "Marksheet Verification",
  };

  const placeholders: Record<string, string> = {
    query: "Enter Form ID",
    teacher: "Ex. VIT-TCH-001",
    student: "Ex. VIT-STD-001",
    certificate: "Ex. CERT-2023-101",
    marksheet: "Ex. VIT-ROLL-001",
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
         <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
           {labels[type]}
         </h2>
         <p className="text-sm text-zinc-500 dark:text-zinc-400">
           Enter details below to pull official records from Vision IT database.
         </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
           {/* Primary ID Input */}
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Fingerprint className="w-3 h-3" />
                Identification ID / Roll No
              </label>
              <div className="relative">
                <input
                  {...register("id")}
                  onChange={() => onReset()}
                  className={cn(
                    "w-full px-6 py-4.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all text-zinc-900 dark:text-zinc-100 outline-none text-base font-medium placeholder:text-zinc-300",
                    errors.id && "border-red-500/50"
                  )}
                  placeholder={placeholders[type]}
                />
              </div>
              {errors.id && (
                 <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">
                   {errors.id.message as string}
                 </p>
              )}
           </div>

           {/* Mobile Input for Query Tracking only */}
           {type === "query" && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-2"
             >
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Phone className="w-3 h-3" />
                  Registered Mobile Number
                </label>
                <input
                  {...register("mobile")}
                  className={cn(
                    "w-full px-6 py-4.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all text-zinc-900 dark:text-zinc-100 outline-none text-base",
                    errors.mobile && "border-red-500/50"
                  )}
                  placeholder="10-digit number"
                />
                {errors.mobile && (
                   <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">
                     {errors.mobile.message as string}
                   </p>
                )}
             </motion.div>
           )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-gradient-premium text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all group"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Verify Details
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
