"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  Calendar, 
  ArrowRight, 
  Clock, 
  Search,
  User,
  ChevronRight,
  TrendingUp,
  Sparkles,
  SearchIcon,
  Tag,
  Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { blogPosts as staticData, BlogPost } from "@/data/blog";
import { blogService } from "@/services/blogService";

const categories = ["All", "Success Stories", "Tech Tips", "Announcements", "Career Guidance"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>(Object.values(staticData));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch from Firestore
    const fetchPosts = async () => {
      try {
        const firestorePosts = await blogService.getPosts();
        if (firestorePosts.length > 0) {
          // Merge logic: Firestore posts take priority, static posts act as fallback
          const firestoreIds = new Set(firestorePosts.map(p => p.id));
          const combined = [
            ...firestorePosts,
            ...Object.values(staticData).filter(p => !firestoreIds.has(p.id))
          ];
          setPosts(combined);
        }
      } catch (error) {
        console.error("Failed to sync blog updates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(p => p.isFeatured);
  const otherPosts = filteredPosts.filter(p => p.id !== (featuredPost?.id));

  return (
    <div className="min-h-screen bg-background pb-32 transition-colors duration-500">
      {/* Immersive Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.05] rounded-full blur-[120px] -z-10" />
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Institutional Insights
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-6"
          >
            Digital <span className="text-gradient">Academic Portal</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl leading-relaxed mb-12 font-medium"
          >
            Explore our latest tech tips, student success stories, and career-oriented guides from Pratappur's most trusted computer institute.
          </motion.p>
          
          {/* Integrated Search & Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-2xl relative"
          >
             <div className="relative group p-1.5 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-primary/10 flex items-center">
                <div className="pl-6 pr-4">
                  <SearchIcon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, stories or tips..." 
                  className="flex-grow py-4 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 font-medium"
                />
                <button className="hidden md:flex px-8 py-3 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Search
                </button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Categories Bar */}
      <section className="max-w-7xl mx-auto px-6 mb-16 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-center gap-4 min-w-max pb-4">
          <Tag className="w-4 h-4 text-zinc-400 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border shadow-sm",
                activeCategory === cat 
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xl" 
                  : "bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 border-zinc-100 dark:border-zinc-800 hover:border-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Editorial Featured Post */}
        {featuredPost && activeCategory === "All" && !searchQuery && (
          <Link href={`/blog/${featuredPost.id}`} className="block group">
            <motion.article 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-3xl hover:shadow-primary/10 transition-all duration-700"
            >
              <div className="lg:col-span-7 h-[400px] lg:h-[500px] relative overflow-hidden">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <div className="absolute top-8 left-8">
                   <span className="px-5 py-2 rounded-xl bg-yellow-400 text-zinc-900 text-[10px] font-black uppercase tracking-widest shadow-2xl">
                      MUST READ
                   </span>
                </div>
              </div>
              
              <div className="lg:col-span-5 p-10 lg:p-14 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-6 text-[10px] font-black text-zinc-400 tracking-[0.2em] uppercase">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {featuredPost.readTime}</span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white leading-[1.1] group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                
                <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed line-clamp-4 font-medium">
                  {featuredPost.excerpt}
                </p>
                
                <div className="pt-8 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-black text-xs shadow-inner">
                      SG
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-black text-zinc-900 dark:text-white leading-none">{featuredPost.author}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{featuredPost.category}</p>
                    </div>
                  </div>
                  
                  <div 
                    className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-all shadow-xl shadow-primary/30"
                  >
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          </Link>
        )}

        {/* Regular Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {otherPosts.map((post, index) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="block group">
                <motion.article 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200/60 dark:border-zinc-800 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="h-56 relative overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-yellow-400 text-zinc-900 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow gap-5">
                    <div className="flex items-center gap-5 text-zinc-400">
                      <span className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"><Calendar className="w-4 h-4 text-primary" /> {post.date}</span>
                      <span className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"><Clock className="w-4 h-4 text-primary" /> {post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-[1.2]">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map(t => (
                          <span key={t} className="text-[9px] font-black text-primary uppercase tracking-widest">#{t}</span>
                        ))}
                      </div>
                      <div className="text-[10px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors">
                        Read Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Search className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4">No insights found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto font-medium mb-10">
              We couldn't find any articles matching "{searchQuery}". Try a different term or a broader category.
            </p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Section */}
        {filteredPosts.length > 5 && (
          <div className="flex flex-col items-center gap-6 pt-12">
            <button className="px-12 py-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-2xl shadow-primary/5 group">
              Explore More Stories
              <ArrowRight className="w-5 h-5 ml-4 inline-block group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="relative p-12 lg:p-20 bg-gradient-premium rounded-[4rem] text-white overflow-hidden shadow-3xl shadow-primary/20 group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                <TrendingUp className="w-4 h-4" />
                Never Miss an Update
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                Unlock Your Potential with Our Insights.
              </h2>
              <p className="text-white/80 text-lg font-medium leading-relaxed">
                नए कंप्यूटर स्किल्स, सक्सेस स्टोरीज और करियर टिप्स सीधे अपने इनबॉक्स में पाएं। छत्तीसगढ़ का नंबर 1 कंप्यूटर संस्थान।
              </p>
            </div>
            
            <div className="w-full max-w-md space-y-4">
              <div className="flex p-2 bg-white rounded-[2.5rem] shadow-2xl">
                 <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   className="flex-grow px-6 py-4 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400 font-bold text-sm"
                 />
                 <button className="px-8 bg-zinc-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform">
                   Join Us
                 </button>
              </div>
              <p className="text-[10px] text-white/60 text-center font-bold uppercase tracking-widest">
                No spam. Only high-value insights. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
