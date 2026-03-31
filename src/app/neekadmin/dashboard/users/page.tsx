"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { userService, UserProfile } from "@/services/userService";
import { 
  Users, 
  Search, 
  Shield, 
  User as UserIcon, 
  Mail, 
  Calendar,
  MoreVertical,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function UserManagementPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await userService.getAllProfiles();
      setProfiles(data);
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  const handleRoleChange = async (uid: string, newRole: "student" | "admin" | "teacher") => {
    if (!confirm(`Change user role to ${newRole}?`)) return;
    try {
      await userService.updateProfile(uid, { role: newRole as any });
      setProfiles(profiles.map(p => p.uid === uid ? { ...p, role: newRole } : p));
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const filtered = profiles.filter(p => 
    p.displayName?.toLowerCase().includes(search.toLowerCase()) || 
    p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="User Registry" subtitle="Manage access control and user profiles">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        {/* Users Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">User</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Access Role</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Joined</th>
                  <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-8 py-6 h-20 bg-zinc-900/50" />
                    </tr>
                  ))
                ) : filtered.map((profile) => (
                  <tr key={profile.uid} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-700">
                          {profile.photoURL ? (
                            <img src={profile.photoURL} alt="" className="w-full h-full rounded-xl object-cover" />
                          ) : (
                            <UserIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{profile.displayName || "Unknown"}</p>
                          <p className="text-[10px] text-zinc-500 font-medium">{profile.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                         "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                         profile.role === 'admin' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : 
                         profile.role === 'teacher' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                         "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                       )}>
                         {profile.role}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-[8px] text-zinc-600 uppercase tracking-tighter italic">
                          Last seen: {new Date(profile.lastLogin).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleRoleChange(profile.uid, 'admin')}
                            className="p-2 bg-zinc-800 hover:bg-amber-500/20 hover:text-amber-500 rounded-lg transition-all"
                            title="Make Admin"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleRoleChange(profile.uid, 'student')}
                            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all"
                            title="Make Student"
                          >
                            <UserIcon className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
