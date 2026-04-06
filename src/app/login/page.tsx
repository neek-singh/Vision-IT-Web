"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

function LoginContent() {
  const { loginWithGoogle, loginWithEmail, user } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/profile";

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  if (user) return null;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
      router.push(redirect);
    } catch (err: any) {
      console.error("Login Error:", err);
      // Show the actual error message from Supabase
      setError(err?.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      router.push(redirect);
    } catch (err: any) {
      setError("Google Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white dark:bg-zinc-950 flex flex-col lg:flex-row relative overflow-hidden transition-colors duration-500">
      {/* Visual Side (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 lg:p-16">
         <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 mix-blend-multiply z-10" />
         <img 
           src="/images/institutional-auth-banner.png" 
           alt="Vision IT Campus" 
           className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[10s] ease-in-out select-none"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-white/20 dark:to-zinc-950/20 z-20" />
         
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-30 max-w-md"
         >
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-6 shadow-2xl shadow-primary/40">V</div>
            <h2 className="text-4xl font-black text-zinc-950 dark:text-white leading-none tracking-tighter uppercase italic mb-4">
               Your Digital <br/><span className="text-primary italic">Future</span> Starts Here.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-bold text-[11px] uppercase tracking-widest leading-relaxed">
               Access your global student identity and track your academic journey across the Vision IT ecosystem.
            </p>
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-zinc-950 lg:bg-transparent z-0" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative z-10"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 group"
          >
            <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
              <ChevronLeft className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Back to Institute</span>
          </Link>

          <div className="glass bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-3xl">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight mb-2 uppercase italic">Student Portal</h1>
              <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-[0.2em]">Enter credentials for secure access</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-500"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-[9px] font-black uppercase tracking-wider">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest ml-4">Institutional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-700 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@visionit.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-800 text-[12px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest ml-4">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-700 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-800 text-[12px]"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-primary/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In Now <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
               <div className="flex-grow h-px bg-zinc-200 dark:bg-zinc-800/50" />
               <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em] whitespace-nowrap">OR</span>
               <div className="flex-grow h-px bg-zinc-200 dark:bg-zinc-800/50" />
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3.5 bg-zinc-100 dark:bg-white text-zinc-950 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-zinc-200 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 group border border-zinc-200 dark:border-transparent"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sync with Google
            </button>

            <p className="text-center mt-6 text-[9px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.2em] leading-loose">
              Exploring for the first time? <br/>
              <Link href="/register" className="text-primary hover:underline italic">Create Global Profile</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="h-screen flex items-center justify-center text-zinc-500 text-[10px] uppercase font-black tracking-widest italic">Loading login portal...</div>}>
      <LoginContent />
    </React.Suspense>
  );
}

