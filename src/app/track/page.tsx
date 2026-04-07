"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Bookmark,
  Sparkles,
  SearchCheck,
  HelpCircle
} from "lucide-react";
import { admissionService, AdmissionApplication } from "@/services/admissionService";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const trackStages = [
  { id: "pending", label: "Application Received", sub: "We've got your details!", icon: Bookmark },
  { id: "contacted", label: "Contact Initiated", sub: "Counselor will reach out soon.", icon: Phone },
  { id: "enrolled", label: "Enrollment Finalized", sub: "Welcome to the Visionary community!", icon: ShieldCheck },
];

export default function TrackStatusPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searching, setSearching] = useState(false);
  const [application, setApplication] = useState<AdmissionApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;
    
    if (application?.phoneNumber) {
      unsubscribe = admissionService.subscribeToStudentStatus(application.phoneNumber, (updated) => {
        setApplication(updated);
      });
    }

    return () => unsubscribe?.();
  }, [application?.phoneNumber]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;

    setSearching(true);
    setError(null);
    try {
      const result = await admissionService.getStudentStatus(phoneNumber);
      if (result) {
        setApplication(result);
      } else {
        setApplication(null);
        setError("No application found for this number.");
      }
      setHasSearched(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const getActiveIndex = (status: string) => {
    if (status === 'pending') return 0;
    if (status === 'contacted') return 1;
    if (status === 'enrolled') return 2;
    return -1; // rejected or unknown
  };

  return (
    <main className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Tracking Portal</span>
            </motion.div>
            <h1 className="text-5xl font-black text-foreground mb-6 transition-colors tracking-tight">
              Track Your <span className="text-primary italic">Visionary</span> Journey
            </h1>
            <p className="text-zinc-500 font-medium text-lg max-w-xl mx-auto">
              Enter your registered mobile number to see the live status of your admission application.
            </p>
          </div>

          {/* Search Form */}
          <div className="relative mb-20">
             <form onSubmit={handleSearch} className="relative z-10 flex flex-col md:flex-row gap-4 p-4 bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 rounded-[2.5rem] shadow-3xl">
                <div className="flex-grow relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                  <input 
                    type="tel" 
                    placeholder="Enter 10-digit mobile number..." 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-16 pr-8 py-5 bg-zinc-950 border border-zinc-800 rounded-[1.8rem] text-lg font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={searching || phoneNumber.length < 10}
                  className="px-10 h-16 bg-primary rounded-[1.8rem] flex items-center justify-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  Check Status
                </button>
             </form>
             
             {/* Background Decoration */}
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[120px] -z-10 rounded-full animate-pulse" />
             <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 blur-[120px] -z-10 rounded-full" />
          </div>

          {/* Search Results */}
          <AnimatePresence mode="wait">
             {hasSearched && application && (
               <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -40 }}
                 className="space-y-10"
               >
                  {/* Status Summary Card */}
                  <div className="p-10 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-3xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-5">
                        <CheckCircle2 className="w-48 h-48 text-primary" />
                     </div>
                     
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-2xl">
                              {application.fullName[0]}
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">{application.fullName}</h3>
                              <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
                                 <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest text-[9px]"><MapPin className="w-3 h-3" /> {application.course}</span>
                                 <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Updated {dayjs(application.submittedAt).fromNow()}</span>
                              </div>
                           </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Current Standing</span>
                           <div className={cn(
                             "px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2",
                             application.status === 'enrolled' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 
                             application.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-primary text-white shadow-lg shadow-primary/20'
                           )}>
                              {application.status === 'enrolled' ? <ShieldCheck className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                              {application.status}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Visual Tracker Pipeline */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                     {trackStages.map((stage, idx) => {
                        const activeIdx = getActiveIndex(application.status);
                        const isCurrent = activeIdx === idx;
                        const isPast = activeIdx > idx;

                        return (
                           <div key={stage.id} className="relative group">
                              <div className={cn(
                                "h-full p-8 rounded-3xl border transition-all duration-700 relative z-10",
                                isCurrent ? 'bg-primary/10 border-primary shadow-xl scale-[1.02]' : 
                                isPast ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-zinc-800 opacity-40'
                              )}>
                                 <div className={cn(
                                   "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-700",
                                   isCurrent ? 'bg-primary text-white rotate-12 scale-110' : 
                                   isPast ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-600'
                                 )}>
                                    {isPast ? <CheckCircle2 className="w-6 h-6" /> : <stage.icon className="w-6 h-6" />}
                                 </div>
                                 <h4 className={cn("text-[10px] font-black uppercase tracking-widest mb-2 transition-colors", isCurrent ? 'text-primary' : 'text-zinc-500')}>
                                    Stage 0{idx + 1}
                                 </h4>
                                 <p className="text-white font-black text-sm uppercase tracking-tight mb-2">{stage.label}</p>
                                 <p className="text-[10px] font-bold text-zinc-500 leading-relaxed">{stage.sub}</p>
                              </div>
                              
                              {/* Connector Lines */}
                              {idx < 2 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-[1px] bg-zinc-800 z-0" />
                              )}
                           </div>
                        );
                     })}
                  </div>

                  {/* Final State Message */}
                  {application.status === 'enrolled' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-10 rounded-[3rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center shadow-3xl overflow-hidden relative"
                    >
                       <div className="relative z-10">
                          <h3 className="text-3xl font-black mb-4 italic">Congratulations, Visionary!</h3>
                          <p className="text-emerald-50 font-bold mb-8 max-w-lg mx-auto uppercase text-xs tracking-widest leading-loose">
                            Your verification is complete. Welcome to the institute. Our orientation team will contact you for course materials within 24 hours.
                          </p>
                          <div className="flex items-center justify-center gap-4 font-black">
                             <div className="w-12 h-[1px] bg-white/30" />
                             <span className="text-[10px] uppercase tracking-[0.3em]">Institutional Verification Confirmed</span>
                             <div className="w-12 h-[1px] bg-white/30" />
                          </div>
                       </div>
                       <Sparkles className="absolute -top-10 -right-10 w-48 h-48 opacity-20 rotate-12" />
                    </motion.div>
                  )}
               </motion.div>
             )}

             {hasSearched && !application && error && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-10 rounded-[3rem] bg-red-500/5 border border-red-500/20 text-center"
               >
                  <HelpCircle className="w-12 h-12 text-red-500/50 mx-auto mb-6" />
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">No Records Found</h3>
                  <p className="text-zinc-500 font-medium text-sm mb-8">We couldn't find an application associated with this number.</p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                     <button onClick={() => setHasSearched(false)} className="text-primary font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all flex items-center gap-2">
                        Try Another Number <ArrowRight className="w-4 h-4" />
                     </button>
                     <div className="w-[1px] h-4 bg-zinc-800 hidden md:block" />
                     <a href="/#courses" className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-all">
                        Apply Now
                     </a>
                  </div>
               </motion.div>
             )}
          </AnimatePresence>

          {/* Trust Badges */}
          {!hasSearched && (
            <div className="mt-20 pt-10 border-t border-zinc-800/50 flex flex-wrap items-center justify-center gap-12 opacity-40">
               <div className="flex items-center gap-3 grayscale group-hover:grayscale-0 transition-all">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Data</span>
               </div>
               <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Sync</span>
               </div>
               <div className="flex items-center gap-3">
                  <SearchCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Status</span>
               </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
