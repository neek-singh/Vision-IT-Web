"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Newspaper, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Loader2, 
  Database, 
  AlertCircle, 
  ExternalLink,
  Eye,
  EyeOff
} from "lucide-react";
import { blogService, BlogPost } from "@/services/blogService";
import { blogPosts as staticBlogPosts } from "@/data/blog";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = blogService.subscribeToPosts((data) => {
      setPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await blogService.toggleVisibility(id, !currentStatus);
    } catch (err) {
      alert("Failed to toggle visibility");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this insight? This action cannot be undone.")) {
      try {
        await blogService.deletePost(id);
      } catch (error) {
        alert("Failed to delete the post.");
      }
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    try {
      await blogService.migrateStaticData(Object.values(staticBlogPosts) as any);
      alert("Migration complete! Static data is now synced to Supabase.");
    } catch (error) {
      alert("Migration failed. Please check your network or Supabase policies.");
    } finally {
      setMigrating(false);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) || 
    post.category.toLowerCase().includes(search.toLowerCase()) ||
    post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Blog Registry" subtitle={`Reviewing ${posts.length} published intellectual assets`}>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Article Management</h2>
            <p className="text-zinc-500 font-bold text-sm">Create and curate your thought leadership.</p>
          </div>
          <div className="flex items-center gap-4">
            {posts.length === 0 && !loading && (
              <button 
                onClick={handleMigrate}
                disabled={migrating}
                className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-primary/50 hover:text-white transition-all disabled:opacity-50"
              >
                {migrating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                Migrate Static
              </button>
            )}
            <Link 
              href="/neekadmin/dashboard/blog/new"
              className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
               <Plus className="w-4 h-4" />
               Create Insight
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
           <div className="p-8 border-b border-zinc-800/50 bg-zinc-900/20 flex items-center justify-between">
              <div className="relative w-80 group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Filter articles..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 bg-transparent border-none text-sm font-medium outline-none text-white" 
                 />
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Live Sync Active</p>
              </div>
           </div>
           
           <div className="divide-y divide-zinc-800/50 min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                   <Loader2 className="w-10 h-10 text-primary animate-spin" />
                   <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Fetching Knowledge...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center px-10">
                   <div className="p-6 bg-zinc-800/50 rounded-full">
                     <AlertCircle className="w-12 h-12 text-zinc-700" />
                   </div>
                   <div>
                     <h3 className="text-xl font-black text-white tracking-tight uppercase mb-2">No Insights Found</h3>
                     <p className="text-zinc-500 text-sm font-medium">Try a different search or create a new blog post.</p>
                   </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, idx) => (
                    <motion.div 
                      key={post.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        "p-6 flex items-center justify-between hover:bg-white/5 transition-all group duration-500",
                        !post.is_published && "opacity-50 grayscale-[0.5]"
                      )}
                    >
                      <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-zinc-800 overflow-hidden border border-zinc-700 relative group-hover:border-primary/50 transition-all shadow-lg flex-shrink-0">
                            {post.image ? (
                              <img src={post.image} alt="Blog" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                <Newspaper className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                               <h3 className="text-sm font-black text-white truncate max-w-md">{post.title}</h3>
                               {!post.is_published && (
                                 <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[8px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-700">Draft</span>
                               )}
                               {post.isFeatured && (
                                 <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded-md border border-primary/20">Featured</span>
                               )}
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                <span className="text-zinc-400 group-hover:text-primary transition-colors">{post.category}</span>
                                <span>&bull;</span>
                                <span>{post.date}</span>
                                <span className="hidden md:inline">&bull;</span>
                                <span className="hidden md:inline text-zinc-600">{post.readTime}</span>
                            </div>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                          <div className="hidden lg:block text-right">
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Impact Author</p>
                            <p className="text-xs font-bold text-zinc-400">{post.author}</p>
                          </div>
                          <div className="flex items-center gap-2">
                             <button 
                                onClick={() => handleToggleVisibility(post.id, post.is_published ?? true)}
                                className={cn(
                                  "p-2.5 transition-all rounded-xl shadow-inner",
                                  post.is_published ? "text-zinc-600 hover:text-white" : "text-primary hover:text-primary/70 bg-primary/5"
                                )}
                                title={post.is_published ? "Unpublish and hide" : "Publish to live site"}
                             >
                                {post.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                             </button>
                             <Link 
                                href={`/blog/${post.id}`} 
                                target="_blank"
                                className="p-2.5 text-zinc-600 hover:text-blue-400 transition-all rounded-xl hover:bg-blue-400/5 shadow-inner"
                             >
                                <ExternalLink className="w-4 h-4" />
                             </Link>
                             <Link 
                                href={`/neekadmin/dashboard/blog/edit/${post.id}`}
                                className="p-2.5 text-zinc-600 hover:text-emerald-400 transition-all rounded-xl hover:bg-emerald-400/5 shadow-inner"
                             >
                                <Edit className="w-4 h-4" />
                             </Link>
                             <button 
                                onClick={() => handleDelete(post.id)}
                                className="p-2.5 text-zinc-600 hover:text-red-500 transition-all rounded-xl hover:bg-red-500/5 shadow-inner"
                             >
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
           </div>
        </div>
        
        <div className="p-8 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-6 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="p-5 bg-indigo-500/20 rounded-[2rem] text-indigo-500 relative z-10 shadow-lg">
              <Database className="w-8 h-8" />
           </div>
           <div className="relative z-10">
              <h4 className="text-md font-black text-white uppercase tracking-tight mb-1">Knowledge Synchronization</h4>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-2xl">
                The Blog Management system is now powered by **Vision Sync Engine**. Any changes published here are instantly cached and served globally across the institute's network.
              </p>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
