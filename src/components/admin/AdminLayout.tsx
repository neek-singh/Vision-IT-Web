"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Newspaper, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronRight,
  MessageSquare,
  GraduationCap,
  Quote,
  Shield,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { name: "Dashboard", href: "/neekadmin/dashboard", icon: LayoutDashboard },
  { name: "Admissions", href: "/neekadmin/dashboard/admissions", icon: Users },
  { name: "Inquiries", href: "/neekadmin/dashboard/contacts", icon: MessageSquare },
  { name: "Courses", href: "/neekadmin/dashboard/courses", icon: BookOpen },
  { name: "Faculty", href: "/neekadmin/dashboard/faculty", icon: GraduationCap },
  { name: "Testimonials", href: "/neekadmin/dashboard/testimonials", icon: Quote },
  { name: "Blog Posts", href: "/neekadmin/dashboard/blog", icon: Newspaper },
  { name: "User Registry", href: "/neekadmin/dashboard/users", icon: Shield },
  { name: "Admin Profile", href: "/neekadmin/dashboard/profile", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { user, profile, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);


  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/neekadmin");
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 border border-red-500/20">
          <Shield className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Access Restricted</h2>
          <p className="text-zinc-500 text-sm font-bold">You do not have administrative privileges. Redirecting to portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex relative overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "w-72 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl flex flex-col fixed h-screen overflow-y-auto z-[70] transition-transform duration-300 lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
              V
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">Vision IT</h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Admin Portal</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-zinc-500 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group",
                pathname === link.href 
                  ? "bg-primary text-white shadow-xl shadow-primary/20" 
                  : "text-zinc-500 hover:bg-white/5 hover:text-zinc-100"
              )}
            >
              <link.icon className={cn("w-5 h-5", pathname === link.href ? "text-white" : "group-hover:text-primary")} />
              <span className="text-sm font-bold">{link.name}</span>
              {pathname === link.href && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold">
               {profile?.name?.[0].toUpperCase()}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-bold truncate">{profile?.name || "Admin"}</p>
              <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-400 hover:bg-red-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 min-h-screen bg-zinc-950 w-full overflow-x-hidden">
        {/* Header */}
        <header className="h-20 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between gap-4">
           {/* Mobile Menu Toggle */}
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
           >
             <Menu className="w-6 h-6" />
           </button>

           <div className="hidden md:flex relative flex-grow max-w-md group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
             <input 
               type="text" 
               placeholder="Search insights..." 
               className="w-full pl-12 pr-4 py-2 bg-white/5 border border-zinc-800/50 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
             />
           </div>

           <div className="flex items-center gap-2 md:gap-4 ml-auto">
             <button className="w-10 h-10 rounded-xl bg-white/5 border border-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-primary transition-all relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50" />
             </button>
             <Link 
               href="/" 
               className="hidden sm:inline-flex px-5 py-2.5 rounded-xl border border-zinc-800 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-950 transition-all"
             >
               View Website
             </Link>
           </div>
        </header>

        <div className="p-4 md:p-8">
           {(title || subtitle) && (
             <div className="mb-6 md:mb-10">
               {title && <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-1 uppercase">{title}</h2>}
               {subtitle && <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">{subtitle}</p>}
             </div>
           )}
           {children}
        </div>
      </main>
    </div>
  );
}
