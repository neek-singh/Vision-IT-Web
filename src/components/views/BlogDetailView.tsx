"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ThumbsUp,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  TrendingUp,
  ArrowUpRight,
  Share2,
  Bookmark
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
  return (
    <div className="min-h-screen bg-background pb-32 transition-colors duration-500">
      {/* Immersive Article Header */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[2s] scale-105" 
        />
        <div className="absolute inset-0 bg-zinc-950/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 lg:p-24">
          <div className="max-w-5xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <Link 
                href="/blog" 
                className="group w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-2xl"
              >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <span className="px-6 py-2.5 rounded-2xl bg-yellow-400 border border-yellow-500 text-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md shadow-xl">
                {post.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white leading-[1.02] tracking-tighter"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-10 text-[10px] md:text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em]"
            >
              <span className="flex items-center gap-3"><User className="w-5 h-5 text-primary" /> {post.author}</span>
              <span className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /> {post.date}</span>
              <span className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary" /> {post.readTime}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Body Area */}
      <section className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-8 space-y-16"
        >
          {/* Main Article Content */}
          <div className="prose prose-zinc dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tight 
            prose-h1:text-5xl prose-h1:mb-12
            prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:text-zinc-900 dark:prose-h2:text-white
            prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-6
            prose-p:text-xl prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300
            prose-p:mb-8
            prose-li:text-lg prose-li:mb-2
            prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:font-black
            prose-blockquote:border-l-[10px] prose-blockquote:border-primary prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-white/5 prose-blockquote:py-10 prose-blockquote:px-12 prose-blockquote:rounded-[2.5rem] prose-blockquote:italic prose-blockquote:text-xl
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0"
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="my-10 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                      <div className="bg-zinc-900 px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
                         <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{match[1]} Source</span>
                         <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                         </div>
                      </div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="!m-0 !bg-zinc-950 !p-8 text-sm leading-relaxed"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Interaction Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 bg-zinc-50 dark:bg-white/5 rounded-[4rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500" />
             <div className="flex items-center gap-10">
               <button className="flex items-center gap-3 text-zinc-900 dark:text-white hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest group/btn">
                 <ThumbsUp className="w-7 h-7 group-hover/btn:scale-125 transition-transform" /> 248 <span className="hidden sm:inline">Found Helpful</span>
               </button>
               <button className="flex items-center gap-3 text-zinc-900 dark:text-white hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest group/btn">
                 <MessageSquare className="w-7 h-7 group-hover/btn:scale-125 transition-transform" /> 42 <span className="hidden sm:inline">Comments</span>
               </button>
             </div>
             <div className="flex items-center gap-5">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mr-2">Share this story</span>
              {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                <button key={i} className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-primary hover:text-white transition-all shadow-xl hover:-translate-y-1">
                  <Icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dynamic Sidebar */}
        <aside className="lg:col-span-4 space-y-16">
          {/* Related Stories */}
          <div className="p-10 bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-zinc-200 dark:border-zinc-800 shadow-3xl">
            <h4 className="text-2xl font-black mb-12 flex items-center gap-4">
              <TrendingUp className="w-7 h-7 text-primary" />
              Related Insights
            </h4>
            <div className="space-y-12">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.id}`} className="group block space-y-5">
                  <div className="h-48 relative rounded-[2rem] overflow-hidden shadow-xl group-hover:shadow-primary/20 transition-all">
                    <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="space-y-3 px-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{rp.category}</span>
                    <h5 className="font-black text-lg leading-[1.2] group-hover:text-primary transition-colors line-clamp-2">
                      {rp.title}
                    </h5>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                       <span>{rp.date}</span>
                       <span>{rp.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="p-12 bg-zinc-900 rounded-[3.5rem] text-white shadow-3xl shadow-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <TrendingUp className="w-16 h-16 opacity-20 mb-8" />
            <h4 className="text-3xl font-black mb-6 leading-tight">Master Your Digital Future</h4>
            <p className="text-zinc-400 text-base mb-10 leading-relaxed font-medium">नए कंप्यूटर स्किल्स सीखें और अपने करियर को नई ऊंचाइयों पर ले जाएं।</p>
            <Link 
              href="/admission" 
              className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
            >
              Enroll Now <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Article Footer Stats */}
          <div className="p-10 bg-zinc-50 dark:bg-white/5 rounded-[3.5rem] border border-zinc-200 dark:border-zinc-800 flex items-center gap-6">
             <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center shadow-xl">
               <Bookmark className="w-7 h-7 text-primary" />
             </div>
             <div>
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Savability</p>
               <h4 className="font-black text-zinc-900 dark:text-white">Bookmark Insight</h4>
               <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Save for reference</p>
             </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
