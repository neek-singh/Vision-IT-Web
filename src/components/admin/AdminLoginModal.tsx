"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, LogIn, ArrowRight, ShieldAlert, Loader2, Mail, Lock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const { user, isAdmin, isInitialized, loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const isFirstTime = isInitialized === false;

  useEffect(() => {
    if (user && isAdmin && isOpen) {
      onClose();
      router.push("/neekadmin/dashboard");
    }
    
    if (user && !isAdmin && isOpen && isInitialized === true) {
      setError("Unauthorized. This email is not the master admin.");
    }
  }, [user, isAdmin, isOpen, onClose, router, isInitialized]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (isFirstTime && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError(null);
      setIsLoggingIn(true);
      await loginWithEmail(email, password);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password.");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
      setIsLoggingIn(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/10">
            {isFirstTime ? <CheckCircle2 className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
          </div>
          
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">
              {isFirstTime ? "Initial Admin Setup" : "Admin Login"}
            </h2>
            <p className="text-zinc-500 font-bold text-sm tracking-wide mt-2">
              {isFirstTime 
                ? "Set your master administrator credentials to lock the portal." 
                : "Secure institutional access for authorized technicians."}
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-4 pt-2 text-left">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest"
                >
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="Master Admin Email"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-medium text-white outline-none focus:ring-2 focus:ring-primary/20 hover:border-zinc-700 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder={isFirstTime ? "Create Master Password" : "Access Password"}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-medium text-white outline-none focus:ring-2 focus:ring-primary/20 hover:border-zinc-700 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {isFirstTime && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="relative group pt-1"
                >
                  <CheckCircle2 className="absolute left-4 top-[calc(50%+4px)] -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Confirm Master Password"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-medium text-white outline-none focus:ring-2 focus:ring-primary/20 hover:border-zinc-700 transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </motion.div>
              )}
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full group relative flex items-center justify-center gap-4 bg-white text-zinc-950 font-black p-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isFirstTime ? "INITIALIZE SYSTEM" : "SIGN IN AS ADMIN"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100" />
                </>
              )}
            </button>
            
            <p className="text-[9px] text-zinc-600 font-black text-center uppercase tracking-[0.3em] pt-4 leading-loose">
              {isFirstTime 
                ? "This account will become the permanent master identity" 
                : "Authorized Personnel Only \u2022 E2E Protected"}
            </p>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </motion.div>
    </div>
  );
}
