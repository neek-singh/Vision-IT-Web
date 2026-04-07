"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Zap,
  Twitter,
  Instagram,
  MessageCircle,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";

const progressData = [
  { month: "Jan", progress: 45 },
  { month: "Feb", progress: 52 },
  { month: "Mar", progress: 48 },
  { month: "Apr", progress: 61 },
  { month: "May", progress: 55 },
  { month: "Jun", progress: 67 },
  { month: "Jul", progress: 75 },
];

function LoginContent() {
  const { loginWithGoogle, loginWithEmail, user } = useAuth();
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
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError("Google connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans selection:bg-indigo-100 selection:text-indigo-600">
      
      {/* Left Column: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-white relative">
        <div className="max-w-md w-full mx-auto space-y-10">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 group cursor-pointer w-fit" onClick={() => router.push("/")}>
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 fill-current" />
             </div>
             <span className="text-xl font-bold tracking-tight text-zinc-900 uppercase">Vision IT</span>
          </div>

          {/* Header Text */}
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Login</h1>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Unlock your academic dashboard and monitor your <span className="text-indigo-600 font-bold italic">Student Progress</span> in real-time.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              {error}
            </motion.div>
          )}

          {/* Social Auth */}
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-6 border-2 border-zinc-100 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-grow h-[1px] bg-zinc-100" />
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">or Sign in with Email</span>
            <div className="flex-grow h-[1px] bg-zinc-100" />
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block ml-1">Email*</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="email" 
                  placeholder="mail@website.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-zinc-100 rounded-2xl text-sm font-bold text-zinc-800 outline-none focus:border-indigo-600 transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block ml-1">Password*</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Min. 8 character"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-zinc-100 rounded-2xl text-sm font-bold text-zinc-800 outline-none focus:border-indigo-600 transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold">
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-zinc-100 text-indigo-600 focus:ring-indigo-600 cursor-pointer" />
                  <span className="text-zinc-600 group-hover:text-indigo-600 transition-colors">Remember me</span>
               </label>
               <Link href="/forgot-password" title="Forget password?" className="text-indigo-600 hover:text-indigo-700 transition-colors">Forget password?</Link>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-zinc-500">
            Not registered yet? <Link href="/register" className="text-indigo-600 hover:underline">Create an Account</Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-center md:text-left">
          © 2026 Vision IT Institute. All rights reserved.
        </div>
      </div>

      {/* Right Column: Visual Dashboard */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 relative overflow-hidden flex-col items-center justify-center p-12 lg:p-24">
        
        {/* Abstract Background patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
        
        <div className="relative w-full max-w-lg">
          
          {/* Floating Indicators */}
          <div className="absolute -top-12 -left-12 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl animate-bounce-slow">
            <Award className="w-6 h-6 text-white" />
          </div>
          
          {/* Social Icons scattered */}
          <div className="absolute top-1/4 -right-8 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-indigo-600 animate-pulse">
             <Twitter className="w-5 h-5 fill-current" />
          </div>
          <div className="absolute bottom-1/4 -left-8 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-pink-600">
             <Instagram className="w-6 h-6" />
          </div>
          <div className="absolute top-2/3 -right-4 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center text-blue-500">
             <MessageCircle className="w-4 h-4 fill-current" />
          </div>

          {/* Cards Area */}
          <div className="space-y-6">
            
            {/* 1. Rewards Card */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="ml-auto w-10/12 p-8 bg-white rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6"
            >
               <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 w-full">Current Achievement</h4>
               <div className="flex items-center gap-6 w-full">
                  <div className="w-20 h-20 rounded-full border-4 border-indigo-50 p-1">
                    <div className="w-full h-full rounded-full bg-zinc-100 overflow-hidden">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Student" className="w-full h-full" />
                    </div>
                  </div>
                  <div className="space-y-1">
                     <p className="text-3xl font-black text-zinc-900 leading-tight">172,832</p>
                     <p className="text-xs font-bold text-zinc-400">Total Learning Points</p>
                  </div>
                  <div className="ml-auto">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* 2. Analytics Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
               className="w-full p-8 bg-white rounded-[2.5rem] shadow-2xl space-y-6"
            >
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Student Progress</p>
                     <p className="text-2xl font-black text-zinc-900 leading-tight">75% Completion</p>
                  </div>
                  <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                     Q2 2026
                  </div>
               </div>
               
               <div className="h-48 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <Line 
                        type="monotone" 
                        dataKey="progress" 
                        stroke="#4f46e5" 
                        strokeWidth={4} 
                        dot={{ fill: '#4f46e5', r: 4, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                      <XAxis dataKey="month" hide />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
               </div>
            </motion.div>

          </div>

          <div className="mt-16 text-center space-y-4">
             <h2 className="text-4xl font-black text-white leading-tight">Turn your ideas <br/> into reality.</h2>
             <p className="text-indigo-100 font-medium text-sm max-w-sm mx-auto leading-relaxed opacity-80">
                Consistent quality and experience across all platforms and devices. Track your Vision IT journey effortlessly.
             </p>
             
             {/* Pagination mimics */}
             <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
                <div className="w-6 h-1.5 rounded-full bg-white transition-all" />
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="h-screen bg-white flex items-center justify-center text-zinc-500 text-xs font-black uppercase tracking-widest animate-pulse">Initializing Portal...</div>}>
      <LoginContent />
    </React.Suspense>
  );
}
