"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { userService } from "@/services/userService";

export default function RegisterPage() {
  const { user, registerWithEmail } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (formData.mobile.length < 10) {
      return setError("Please enter a valid mobile number");
    }

    setLoading(true);
    setError(null);
    try {
      await registerWithEmail(formData.email, formData.password, {
        full_name: formData.name,
        display_name: formData.name,
        mobile: formData.mobile
      });
      
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen bg-white dark:bg-zinc-950 flex flex-col lg:flex-row relative overflow-hidden transition-colors duration-500">
      {/* Visual Side (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden items-center justify-center p-12 lg:p-16">
         <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 mix-blend-multiply z-10" />
         <img 
           src="/C:\Users\as007\.gemini\antigravity\brain\83576405-744a-492c-bede-075275f2253d\institutional_auth_banner_1774861590455_1774867170772.png" 
           alt="Vision IT Campus" 
           className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[12s] ease-in-out select-none"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-white/20 dark:to-zinc-950/20 z-20" />
         
         <motion.div 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           className="relative z-30"
         >
            <div className="w-16 h-16 bg-primary dark:bg-white/10 backdrop-blur-xl border border-primary/20 dark:border-white/20 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-6 shadow-2xl shadow-primary/40">V</div>
            <h2 className="text-4xl font-black text-zinc-950 dark:text-white leading-tight tracking-tighter uppercase italic mb-4">
               Begin Your <br/><span className="text-primary italic">Global</span> Journey.
            </h2>
            <div className="space-y-3">
               <FeatureItem text="Unlimited Learning Resources" />
               <FeatureItem text="Direct Mentorship Access" />
               <FeatureItem text="Verified Certifications" />
            </div>
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-zinc-950 lg:bg-transparent z-0" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[44rem] relative z-10"
        >
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 group"
          >
            <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
              <ChevronLeft className="w-3 h-3" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Back to Portal</span>
          </Link>

          <div className="glass bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-3xl">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight mb-2 uppercase italic">Create Profile</h1>
              <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-[0.2em]">Synchronize with the global student identity</p>
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

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RegisterInput 
                  label="Full Name" 
                  icon={<User className="w-3.5 h-3.5" />} 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex. Rajkumar"
                  required
                />
                <RegisterInput 
                  label="Mobile Number" 
                  icon={<Phone className="w-3.5 h-3.5" />} 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  required
                />
              </div>

              <RegisterInput 
                label="Institutional Email" 
                icon={<Mail className="w-3.5 h-3.5" />} 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RegisterInput 
                  label="Create Password" 
                  icon={<Lock className="w-3.5 h-3.5" />} 
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <RegisterInput 
                  label="Confirm Access" 
                  icon={<Lock className="w-3.5 h-3.5" />} 
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-primary/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Complete Enrollment <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </form>

            <p className="text-center mt-6 text-[9px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.2em] leading-loose">
              Already have an active profile? <br/>
              <Link href="/login" className="text-primary hover:underline italic">Return to Sign In Terminal</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
       <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <ArrowRight className="w-3 h-3" />
       </div>
       <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{text}</span>
    </div>
  );
}

function RegisterInput({ label, icon, ...props }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-4">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-primary transition-colors">
          {icon}
        </div>
        <input 
          {...props}
          className="w-full pl-14 pr-6 py-5 bg-zinc-950/50 border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-800"
        />
      </div>
    </div>
  );
}
