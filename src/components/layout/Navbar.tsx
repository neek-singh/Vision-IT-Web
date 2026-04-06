"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, Rocket, Sun, Moon, Search, UserCheck, GraduationCap, FileCheck, ClipboardCheck } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { VerificationDropdown } from "./VerificationDropdown";
import { VerificationModal } from "../verification/VerificationModal";
import { AdminLoginModal } from "../admin/AdminLoginModal";
import { useAuth } from "@/context/AuthContext";
import { User as UserIcon, LogOut, Settings, Shield } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Admission", href: "/admission" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  // Admin Portal Trigger (10s Long Press)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [pressProgress, setPressProgress] = useState(0);

  const startPress = () => {
    setPressProgress(0);
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 5000) * 100, 100);
      setPressProgress(progress);
      
      if (progress >= 100) {
        clearInterval(timerRef.current!);
        setPressProgress(0);
        setIsAdminLoginOpen(true);
      }
    }, 100);
  };

  const endPress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPressProgress(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const openModal = (type: string) => {
    setActiveModal(type);
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
        scrolled ? "glass mt-2 mx-4 rounded-2xl py-2" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo with 10s Hidden Trigger */}
        <div 
          className="flex items-center gap-2 group cursor-pointer relative"
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
        >
          <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white p-1 shadow-sm">
            <Image
              src="/logo.png"
              alt="Vision IT Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
            {/* Hidden Progress Indicator */}
            {pressProgress > 0 && (
              <div 
                className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-100 ease-linear"
                style={{ width: `${pressProgress}%` }}
              />
            )}
          </div>
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-primary dark:text-primary-light">
              VISION IT
            </span>
            <span className="text-[10px] font-medium leading-none tracking-[0.2em] text-zinc-500 uppercase">
              Computer Institute
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-primary dark:text-zinc-300 dark:hover:text-primary-light transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary-light transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <VerificationDropdown />

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-primary dark:text-zinc-300 dark:hover:text-primary-light transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary-light transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-2" />

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-light transition-all active:scale-90 relative overflow-hidden"
            aria-label="Toggle Theme"
          >
            <motion.div
              key={theme}
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </motion.div>
          </button>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-primary transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-black text-white shadow-lg overflow-hidden">
                  {profile?.photoURL ? <img src={profile.photoURL} alt="User" /> : profile?.displayName?.[0] || user.email?.[0].toUpperCase()}
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{profile?.displayName?.split(' ')[0] || 'Student'}</span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                     <p className="px-4 py-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50 dark:border-zinc-800/50 mb-1">Account Menu</p>
                     
                     <Link 
                       href="/profile" 
                       onClick={() => setIsUserMenuOpen(false)}
                       className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 text-zinc-700 dark:text-zinc-300 transition-colors group"
                     >
                       <UserIcon className="w-4 h-4 group-hover:text-primary" />
                       <span className="text-sm font-bold">My Profile</span>
                     </Link>

                     {isAdmin && (
                       <Link 
                         href="/neekadmin/dashboard" 
                         onClick={() => setIsUserMenuOpen(false)}
                         className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 text-zinc-700 dark:text-zinc-300 transition-colors group"
                       >
                         <Settings className="w-4 h-4 group-hover:text-primary" />
                         <span className="text-sm font-bold">Admin Panel</span>
                       </Link>
                     )}

                     <button 
                       onClick={() => { logout(); setIsUserMenuOpen(false); }}
                       className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition-colors"
                     >
                       <LogOut className="w-4 h-4" />
                       <span className="text-sm font-bold">Sign Out</span>
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2.5 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-95 flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              Join Us
            </Link>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-light transition-all active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            className="p-2 text-zinc-600 dark:text-zinc-300 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 glass rounded-2xl overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col p-4 gap-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium p-3 text-zinc-800 dark:text-zinc-100 hover:bg-primary/5 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2">
                <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Track & Verify</p>
                <div className="grid grid-cols-1 gap-1">
                  <MobileVerifyItem icon={Search} name="Application Status" onClick={() => openModal("query")} />
                  <MobileVerifyItem icon={UserCheck} name="Faculty Verification" onClick={() => openModal("teacher")} />
                  <MobileVerifyItem icon={GraduationCap} name="Student Verification" onClick={() => openModal("student")} />
                  <MobileVerifyItem icon={FileCheck} name="Certificate Verify" onClick={() => openModal("certificate")} />
                  <MobileVerifyItem icon={ClipboardCheck} name="Marksheet Verify" onClick={() => openModal("marksheet")} />
                </div>
              </div>

              {user ? (
                <div className="mt-4 space-y-2">
                   <Link
                     href="/profile"
                     className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl text-center font-black flex items-center justify-center gap-3 shadow-xl"
                     onClick={() => setIsOpen(false)}
                   >
                     <UserIcon className="w-5 h-5" />
                     My Profile Portal
                   </Link>
                   
                   {/* Administrative Shortcut */}
                   <Link
                     href="/neekadmin"
                     className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-xl text-center font-black flex items-center justify-center gap-3"
                     onClick={() => setIsOpen(false)}
                   >
                     <Shield className="w-4 h-4" />
                     Staff Portal
                   </Link>

                   {isAdmin && (
                     <Link
                       href="/neekadmin/dashboard"
                       className="w-full py-4 bg-primary/10 text-primary border border-primary/20 rounded-xl text-center font-black flex items-center justify-center gap-3"
                       onClick={() => setIsOpen(false)}
                     >
                       <Settings className="w-5 h-5" />
                       Admin Dashboard
                     </Link>
                   )}
                   <button
                     onClick={() => { logout(); setIsOpen(false); }}
                     className="w-full py-4 text-red-500 font-bold text-sm uppercase tracking-widest"
                   >
                     Sign Out
                   </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="mt-4 w-full py-4 bg-primary text-white rounded-xl text-center font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                  onClick={() => setIsOpen(false)}
                >
                  <Rocket className="w-5 h-5" />
                  Join Us
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Verification Modal Portal */}
      <AnimatePresence>
        {activeModal && (
          <VerificationModal 
            isOpen={!!activeModal} 
            onClose={() => setActiveModal(null)} 
            type={activeModal} 
          />
        )}
      </AnimatePresence>

      {/* Admin Login Modal Portal */}
      <AnimatePresence>
        {isAdminLoginOpen && (
          <AdminLoginModal 
            isOpen={isAdminLoginOpen} 
            onClose={() => setIsAdminLoginOpen(false)} 
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileVerifyItem({ icon: Icon, name, onClick }: { icon: any; name: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 text-zinc-700 dark:text-zinc-300 transition-colors w-full text-left group"
    >
      <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-primary/10 group-hover:text-primary transition-all">
        <Icon className="w-4.5 h-4.5" />
      </div>
      <span className="text-sm font-bold">{name}</span>
    </button>
  );
}
