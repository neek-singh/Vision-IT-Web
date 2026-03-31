"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Newspaper, 
  TrendingUp,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts as blogData, BlogPost } from "@/data/blog";

export function LatestBlog({ initialPosts }: { initialPosts?: BlogPost[] }) {
  // Get 3 most recent posts from props or fallback to static data
  const recentPosts = (initialPosts || Object.values(blogData)).slice(0, 3);

  return (
    <section className="py-12 px-6 bg-background overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Latest Insights
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Knowledge <span className="text-gradient">Hub & Articles</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-2xl">
              Stay ahead with our latest campus success stories, technological tips, and institutional updates.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
          >
            Explore Full Blog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="h-52 relative overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 glass bg-white/50 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
                  <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors"
                  >
                    Read Full Story
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
