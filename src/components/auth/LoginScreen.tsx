"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "@/services/authService";
import { Mail, Lock, LogIn, ShieldCheck, Chrome } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 font-sans text-zinc-100 selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome to <span className="text-indigo-400">Vision IT</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">Access your dashboard and LMS</p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-8 flex rounded-xl bg-white/[0.03] p-1 shadow-inner">
          <button
            onClick={() => setActiveTab("user")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
              activeTab === "user"
                ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LogIn className="h-4 w-4" />
            User Access
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
              activeTab === "admin"
                ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin Login
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "user" ? (
            <UserLogin key="user-login" loading={loading} setLoading={setLoading} />
          ) : (
            <AdminLogin key="admin-login" loading={loading} setLoading={setLoading} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function UserLogin({ loading, setLoading }: { loading: boolean; setLoading: (l: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signInWithEmail(email, password);
      toast.success("Welcome back!");
      window.location.href = "/dashboard";
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (error: any) {
      toast.error("Google Sign-in failed");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      onSubmit={handleLogin}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider pl-1">Email</label>
        <div className="relative group">
          <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none ring-indigo-500/20 transition-all focus:border-indigo-500/50 focus:ring-4"
            placeholder="name@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider pl-1">Password</label>
        <div className="relative group">
          <Lock className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none ring-indigo-500/20 transition-all focus:border-indigo-500/50 focus:ring-4"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Continue"}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] py-3 text-sm font-medium text-white transition-all hover:bg-white/[0.05]"
      >
        <Chrome className="h-4 w-4 text-indigo-400" />
        Google Account
      </button>
    </motion.form>
  );
}

function AdminLogin({ loading, setLoading }: { loading: boolean; setLoading: (l: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.sendAdminOTP(email);
      setOtpSent(true);
      toast.success("Magic Link / OTP sent to your email!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP. Are you an admin?");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyOTP(email, otp);
      toast.success("Admin authorized!");
      window.location.href = "/admin/dashboard";
    } catch (error: any) {
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  if (otpSent) {
    return (
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleVerify}
        className="space-y-4"
      >
        <div className="space-y-1.5 text-center">
          <p className="text-sm text-zinc-400">Enter the verification code sent to {email}</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center text-2xl tracking-[1em] rounded-xl border border-white/5 bg-white/[0.03] py-4 pl-4 text-white placeholder-zinc-700 outline-none ring-indigo-500/20 transition-all focus:border-indigo-500/50 focus:ring-4"
            placeholder="000000"
            maxLength={6}
            required
          />
        </div>
        <button
          disabled={loading}
          className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-500 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Confirm Code"}
        </button>
        <button
          type="button"
          onClick={() => setOtpSent(false)}
          className="w-full text-xs text-zinc-500 hover:text-zinc-300"
        >
          Wrong email? Go back
        </button>
      </motion.form>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      onSubmit={handleSendOTP}
      className="space-y-4"
    >
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200/70">
        <ShieldCheck className="mb-1 h-3 w-3 inline mr-1" />
        Admin authentication is restricted to whitelisted emails only. No password required.
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider pl-1">Admin Email</label>
        <div className="relative group">
          <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none ring-purple-500/20 transition-all focus:border-purple-500/50 focus:ring-4"
            placeholder="admin@visionit.com"
            required
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-500 disabled:opacity-50"
      >
        {loading ? "Checking Authorization..." : "Send Verification Code"}
      </button>
    </motion.form>
  );
}
