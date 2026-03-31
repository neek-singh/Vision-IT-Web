"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { 
  Shield, 
  Mail, 
  Calendar, 
  Settings, 
  Lock, 
  User as UserIcon,
  ChevronRight,
  Monitor
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProfile() {
  const { user, profile } = useAuth();

  if (!user) return null;

  const sections = [
    {
      title: "Account Information",
      icon: UserIcon,
      items: [
        { label: "Admin ID", value: user.email, icon: Mail },
        { label: "Registered On", value: "March 30, 2026", icon: Calendar },
        { label: "Role", value: "Super Administrator", icon: Shield },
      ]
    },
    {
      title: "Security & Access",
      icon: Lock,
      items: [
        { label: "Password", value: "••••••••••••", icon: Lock },
        { label: "2FA Status", value: "Inactive", icon: Shield },
        { label: "Current Session", value: "Active (India)", icon: Monitor },
      ]
    }
  ];

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Admin Profile</h2>
            <p className="text-zinc-500 font-bold text-sm">Managing your institutional identity and security.</p>
          </div>
          <button className="flex items-center gap-3 px-6 py-3 bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all border border-zinc-700/50 shadow-xl">
             <Settings className="w-4 h-4" />
             Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Profile Header Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1 space-y-6"
          >
            <div className="p-10 rounded-[3rem] bg-zinc-900 border border-zinc-800/50 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center mb-6 shadow-xl relative z-10 group-hover:scale-105 transition-transform">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-12 h-12 text-zinc-500" />
                  )}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-zinc-900" />
               </div>
               <h3 className="text-lg font-black text-white relative z-10">{profile?.displayName || "Vision Admin"}</h3>
               <p className="text-[10px] text-primary font-black uppercase tracking-widest relative z-10 mt-1">Institutional Lead</p>
               
               <div className="mt-8 pt-8 border-t border-zinc-800 w-full space-y-4 relative z-10">
                  <div className="flex items-center justify-between text-xs font-bold capitalize">
                    <span className="text-zinc-500">Status</span>
                    <span className="text-emerald-500">Verified</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold capitalize">
                    <span className="text-zinc-500">Level</span>
                    <span className="text-white">L10</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-8">
            {sections.map((section, idx) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md"
              >
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-3 bg-zinc-800 rounded-xl text-primary">
                     <section.icon className="w-5 h-5" />
                   </div>
                   <h4 className="text-sm font-black text-white uppercase tracking-widest">{section.title}</h4>
                </div>

                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="p-2 bg-zinc-900 rounded-lg text-zinc-500 group-hover:text-primary transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                             <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.value}</p>
                          </div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex items-center gap-6">
               <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500">
                  <Shield className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">Security Protocol</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    Changing the Admin ID or Password requires direct database access or Multi-Factor Authentication. Contact technical support for identity transfers.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
