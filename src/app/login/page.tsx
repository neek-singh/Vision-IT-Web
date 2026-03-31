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

export default function LoginPage() {
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
      console.error(err);
      setError("Invalid credentials. Please verify your email and password.");
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
           src="/C:\Users\as007\.gemini\antigravity\brain\83576405-744a-492c-bede-075275f2253d\institutional_auth_banner_1774861590455_1774867170772.png" 
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
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
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
