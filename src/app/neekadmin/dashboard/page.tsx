"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  Newspaper, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  MousePointer2,
  Eye,
  Plus,
  MessageSquare
} from "lucide-react";
import { coursesData } from "@/data/courses";
import { admissionService } from "@/services/admissionService";
import { blogService } from "@/services/blogService";
import { contactService } from "@/services/contactService";

export default function AdminDashboard() {
  const courses = Object.values(coursesData);
  const [counts, setCounts] = React.useState({
    admissions: 0,
    blogs: 0,
    inquiries: 0
  });

  React.useEffect(() => {
    const fetchCounts = async () => {
      const authStats = await admissionService.getStats();
      const blogCount = await blogService.getPostsCount();
      const contactCount = await contactService.getUnreadCount();
      
      setCounts({
        admissions: authStats.total,
        blogs: blogCount,
        inquiries: contactCount
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { name: "Total Admissions", value: counts.admissions.toString(), change: "Live", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Global Courses", value: courses.length.toString(), change: "Stable", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { name: "Insights Published", value: counts.blogs.toString(), change: "Sync", icon: Newspaper, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Unread Inquiries", value: counts.inquiries.toString(), change: "New", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">System Overview</h2>
            <p className="text-zinc-500 font-bold text-sm">Welcome back, Captain. Here's what's happening at Vision IT.</p>
          </div>
          <button className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
             <Plus className="w-4 h-4" />
             Quick Action
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                   {stat.change} <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
              <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">{stat.name}</h3>
              <p className="text-4xl font-black text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Recent Activity / Chart Placeholder */}
           <div className="lg:col-span-8 rounded-[3rem] bg-zinc-900/50 border border-zinc-800/50 p-10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-black text-white tracking-tight uppercase">Institutional Growth</h3>
                 <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest"><div className="w-2 h-2 rounded-full bg-primary" /> Admissions</span>
                    <span className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest"><div className="w-2 h-2 rounded-full bg-zinc-700" /> Inquiries</span>
                 </div>
              </div>
              <div className="h-64 flex items-end gap-2 overflow-hidden px-4">
                 {[...Array(24)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ height: 0 }}
                     animate={{ height: `${Math.random() * 80 + 20}%` }}
                     transition={{ delay: i * 0.02, type: "spring", stiffness: 50 }}
                     className="flex-grow bg-primary/20 rounded-t-lg relative group overflow-hidden"
                   >
                      <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-100 transition-all translate-y-full group-hover:translate-y-0" />
                   </motion.div>
                 ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
           </div>

           {/* Sidebar Stats */}
           <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800/50 hover:border-primary/20 transition-all">
                 <h3 className="text-sm font-black text-white tracking-widest uppercase mb-6 flex items-center gap-3">
                   <Calendar className="w-5 h-5 text-primary" /> Active Enrollment
                 </h3>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <span className="text-zinc-500 text-xs font-bold">DCA Course</span>
                       <span className="text-white font-black text-sm">42 Students</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-3/4 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-zinc-500 text-xs font-bold">ADCA Special</span>
                       <span className="text-white font-black text-sm">28 Students</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-1/2 rounded-full" />
                    </div>
                 </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-800/50 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all rotate-12">
                   <MousePointer2 className="w-20 h-20 text-white" />
                 </div>
                 <h3 className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase mb-2">Live Insights</h3>
                 <p className="text-2xl font-black text-white mb-6">Real-time engagement meta</p>
                 <button className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all">
                    View Live Feed <ArrowUpRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
