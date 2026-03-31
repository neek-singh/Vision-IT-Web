"use client";

import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BlogForm } from "@/components/admin/BlogForm";
import { Newspaper, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  return (
    <AdminLayout>
      <div className="space-y-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="space-y-1">
            <Link 
              href="/neekadmin/dashboard/blog" 
              className="group flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-primary transition-colors mb-4"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Registry
            </Link>
            <div className="flex items-center gap-6">
               <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl">
                 <Newspaper className="w-8 h-8 text-primary" />
               </div>
               <div>
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase">Compose Insight</h2>
                  <p className="text-zinc-500 font-bold text-sm">Drafting a new intellectual asset for the Vision IT digital library.</p>
               </div>
            </div>
          </div>
        </div>

        <BlogForm mode="new" />
      </div>
    </AdminLayout>
  );
}
