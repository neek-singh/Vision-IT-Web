"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Zap,
  Layout,
  PieChart,
  BarChart3,
  TrendingUp,
  MailWarning
} from "lucide-react";
import Link from "next/link";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  AreaChart,
  Area
} from "recharts";

const reportData = [
  { time: "12PM", blue: 30, purple: 45 },
  { time: "2PM", blue: 50, purple: 55 },
  { time: "4PM", blue: 45, purple: 65 },
  { time: "6PM", blue: 70, purple: 60 },
  { time: "8PM", blue: 65, purple: 85 },
  { time: "10PM", blue: 90, purple: 80 },
];

function RegisterContent() {
  const { registerWithEmail, loginWithGoogle, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  if (user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerWithEmail(formData.email, formData.password, {
        full_name: formData.name,
        display_name: formData.name
      });
    } catch (err: any) {
      setError(err?.message || "Registration failed.");
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
      
      {/* Left Column: Sign Up Form */}
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
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Sign Up</h1>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Create your identity and access your personal <span className="text-indigo-600 font-bold italic">Learning Dashboard</span> today.
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
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-grow h-[1px] bg-zinc-100" />
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">or Sign up with Email</span>
            <div className="flex-grow h-[1px] bg-zinc-100" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block ml-1">Name*</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-zinc-100 rounded-2xl text-sm font-bold text-zinc-800 outline-none focus:border-indigo-600 transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block ml-1">Email*</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="mail@website.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Min. 8 character"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-zinc-100 rounded-2xl text-sm font-bold text-zinc-800 outline-none focus:border-indigo-600 transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
               <input type="checkbox" required className="mt-1 w-5 h-5 rounded-lg border-2 border-zinc-100 text-indigo-600 focus:ring-indigo-600 cursor-pointer" />
               <p className="text-xs font-bold text-zinc-500 leading-relaxed">
                  I agree to the <Link href="/terms" className="text-indigo-600 hover:underline">Terms & Conditions</Link> and recognize the institutional privacy policy.
               </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-zinc-500">
            Already have an Account? <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-center md:text-left">
          © 2026 Vision IT Institute. All rights reserved.
        </div>
      </div>

      {/* Right Column: Reports Dashboard Visual */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 relative overflow-hidden flex-col items-center justify-center p-12 lg:p-24">
        
        {/* Abstract Background patterns */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        
        <div className="relative w-full max-w-2xl">
          
          {/* Status Pill: Bounced Emails */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-10 right-4 lg:right-20 px-6 py-4 bg-white rounded-2xl shadow-2xl z-20 flex items-center gap-4"
          >
             <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <MailWarning className="w-5 h-5" />
             </div>
             <div>
                <p className="text-xl font-black text-zinc-900 leading-none">1,723</p>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Bounced Notifications</p>
             </div>
          </motion.div>

          {/* Main Dashboard Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20"
          >
             {/* Window Header */}
             <div className="px-8 py-5 border-b border-zinc-50 flex items-center justify-between">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-amber-400" />
                   <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em]">Institutional Command Center</div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400">
                      <Layout className="w-4 h-4" />
                   </div>
                </div>
             </div>

             <div className="flex">
                {/* Sidebar Mock */}
                <div className="w-20 border-r border-zinc-50 p-6 space-y-8 flex flex-col items-center">
                   <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><TrendingUp className="w-4 h-4" /></div>
                   <div className="w-8 h-8 rounded-xl bg-zinc-50 text-zinc-300 flex items-center justify-center"><BarChart3 className="w-4 h-4" /></div>
                   <div className="w-8 h-8 rounded-xl bg-zinc-50 text-zinc-300 flex items-center justify-center"><PieChart className="w-4 h-4" /></div>
                </div>

                {/* Content Area */}
                <div className="flex-grow p-8 space-y-8">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-zinc-900 tracking-tight">Active Reports</h3>
                      <div className="flex -space-x-2">
                         {[1, 2, 3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full bg-zinc-100 border-2 border-white overflow-hidden ring-2 ring-transparent hover:ring-indigo-200 transition-all cursor-pointer">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Admin${i}`} alt="User" />
                           </div>
                         ))}
                         <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white border-2 border-white">+14</div>
                      </div>
                   </div>

                   <div className="h-48 w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={reportData}>
                          <defs>
                            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#D1D5DB', fontWeight: 'bold' }} />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="blue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBlue)" />
                          <Area type="monotone" dataKey="purple" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPurple)" />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Clicks</p>
                         <p className="text-xl font-black text-zinc-900">$23,215.22</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                         <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Mass Emails</p>
                         <div className="flex items-center justify-between">
                            <p className="text-xl font-black">32</p>
                            <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-md">Spam</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>

          <div className="mt-16 text-center space-y-4">
             <h2 className="text-4xl font-black text-white leading-tight">Turn your ideas <br/> into reality.</h2>
             <p className="text-indigo-100 font-medium text-sm max-w-md mx-auto leading-relaxed opacity-80">
                Consistent quality and experience across all platforms and devices. Track your progress with centralized institutional analytics.
             </p>
             
             {/* Pagination mimics */}
             <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
                <div className="w-6 h-1.5 rounded-full bg-white transition-all" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense fallback={<div className="h-screen bg-white flex items-center justify-center text-zinc-500 text-xs font-black uppercase tracking-widest animate-pulse">Synchronizing Portal...</div>}>
      <RegisterContent />
    </React.Suspense>
  );
}
