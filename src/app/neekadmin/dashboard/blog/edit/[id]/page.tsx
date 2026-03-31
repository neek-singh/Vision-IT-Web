"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BlogForm } from "@/components/admin/BlogForm";
import { blogService, BlogPost } from "@/services/blogService";
import { Newspaper, ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getPostById(id as string);
        if (data) {
          setBlog(data);
        } else {
          setError("Blog post not found.");
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching the post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

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
               <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl hover:border-primary/20 transition-all">
                 <Newspaper className="w-8 h-8 text-primary" />
               </div>
               <div>
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase">Refine Insight</h2>
                  <p className="text-zinc-500 font-bold text-sm">UPDATING {blog?.title || "article"} with the latest institutional knowledge.</p>
               </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <Loader2 className="w-12 h-12 text-primary animate-spin" />
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Accessing Secure Records...</p>
          </div>
        ) : error ? (
           <div className="max-w-xl mx-auto p-12 bg-red-500/5 border border-red-500/10 rounded-[3rem] text-center space-y-6">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h3 className="text-xl font-black text-white uppercase">{error}</h3>
              <p className="text-sm text-zinc-500 font-medium">The requested blog post could not be retrieved from our servers.</p>
              <Link 
                href="/neekadmin/dashboard/blog"
                className="inline-block px-8 py-3 bg-zinc-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest"
              >
                Return to Safety
              </Link>
           </div>
        ) : blog && (
          <BlogForm mode="edit" initialData={blog} />
        )}
      </div>
    </AdminLayout>
  );
}
