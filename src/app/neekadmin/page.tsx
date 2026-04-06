"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, Mail, LogIn, ArrowRight, ShieldAlert } from "lucide-react";

export default function AdminEntrance() {
  const { user, loading, isAdmin, loginWithGoogle, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push("/neekadmin/dashboard");
    }
    
    if (!loading && user && !isAdmin) {
      setError("Unauthorized. Your email is not whitelisted for admin access.");
    }
  }, [user, loading, isAdmin, router]);

  const handleLogin = async () => {
    try {
      setError(null);
      await loginWithGoogle();
    } catch (err) {
      setError("Could not sign in. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-2xl shadow-primary/20" />
        <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs">Initializing Secure Portal</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900/50 backdrop-blur-3xl border border-zinc-800 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/10 mb-2">
            <ShieldCheck className="w-10 h-10" />
          </div>
          
          <div>
             <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">Vision Portal</h1>
             <p className="text-zinc-500 font-bold text-sm leading-relaxed tracking-wide">
               Access high-level institutional controls and student telemetry.
             </p>
          </div>

          <div className="w-full space-y-4 pt-4">
            <AnimatePresence>
              {error && (
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                  
                  {user && (
                    <button 
                      onClick={() => logout()}
                      className="w-full py-3 bg-zinc-800 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-all"
                    >
                      Sign Out & Try Another Account
                    </button>
                  )}
                </div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleLogin}
              className="w-full group relative flex items-center justify-center gap-4 bg-white text-zinc-950 font-black p-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              <LogIn className="w-5 h-5 absolute left-6 opacity-50 group-hover:opacity-100 transition-all" />
              <span>SIGN IN AS ADMIN</span>
              <ArrowRight className="w-5 h-5 absolute right-6 group-hover:translate-x-1 transition-transform opacity-30 group-hover:opacity-100" />
            </button>

            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] pt-4">
              Authorized Personnel Only &bull; E2E Encrypted
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 right-0 p-8 opacity-5">
           <Lock className="w-32 h-32 text-white" />
        </div>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => router.push("/")}
        className="mt-12 text-zinc-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2"
      >
        Return to Institute Website
      </motion.button>
    </div>
  );
}
