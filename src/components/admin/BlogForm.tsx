"use client";

import React, { useState } from "react";
import { BlogPost, blogService } from "@/services/blogService";
import { 
  Save, 
  X, 
  Image as ImageIcon, 
  Type, 
  FileText, 
  Tag as TagIcon, 
  Clock, 
  User as UserIcon,
  Layout,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface BlogFormProps {
  initialData?: BlogPost;
  mode: "new" | "edit";
}

export function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [view, setView] = useState<"write" | "preview">("write");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "Success Stories",
    author: initialData?.author || "Vision IT Team",
    readTime: initialData?.readTime || "5 min read",
    image: initialData?.image || "",
    tags: initialData?.tags?.join(", ") || "",
    isFeatured: initialData?.isFeatured || false,
    date: initialData?.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== ""),
      };

      if (mode === "edit" && initialData?.id) {
        await blogService.updatePost(initialData.id, blogData);
      } else {
        await blogService.createPost(blogData);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/neekadmin/dashboard/blog");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Success Stories", "Tech Tips", "Career Guidance", "News", "Tutorials"];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title Area */}
          <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-6">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-primary/10 rounded-xl text-primary">
                 <Type className="w-5 h-5" />
               </div>
               <h3 className="text-sm font-black text-white uppercase tracking-widest">Article Foundation</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Blog Title</label>
                <input 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-8 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-lg font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="The Ultimate Guide to..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Brief Excerpt</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full px-8 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-medium text-zinc-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="A short summary for the card..."
                />
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                     <button 
                        type="button"
                        onClick={() => setView("write")}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'write' ? 'bg-primary text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                     >
                        Write
                     </button>
                     <button 
                        type="button"
                        onClick={() => setView("preview")}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'preview' ? 'bg-primary text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                     >
                        Preview
                     </button>
                  </div>
               </div>
               <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Markdown Supported</span>
            </div>
            
            {view === "write" ? (
              <textarea 
                required
                rows={15}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-8 py-6 bg-zinc-950 border border-zinc-800 rounded-3xl text-sm font-medium leading-relaxed text-zinc-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                placeholder="Write your story here..."
              />
            ) : (
              <div className="w-full px-8 py-6 bg-zinc-950 border border-zinc-800 rounded-3xl min-h-[400px] overflow-auto prose prose-zinc dark:prose-invert max-w-none 
                prose-p:text-sm prose-p:text-zinc-400 prose-li:text-sm prose-h3:text-xl prose-h3:font-black
                prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none"
              >
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="!m-0 !bg-zinc-900 !p-4 !rounded-xl text-[12px]"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {formData.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Metadata Card */}
          <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-6">
             <div className="flex items-center gap-3 mb-4">
                <Layout className="w-4 h-4 text-zinc-500" />
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Publishing Metadata</h4>
             </div>

             <div className="space-y-4">
                <div className="space-y-1.5">
                   <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                      <ImageIcon className="w-3 h-3" /> Banner Image URL
                   </label>
                   <input 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white focus:ring-1 focus:ring-primary outline-none"
                      placeholder="/blog/image.png"
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                      <UserIcon className="w-3 h-3" /> Author Name
                   </label>
                   <input 
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white"
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                      <Clock className="w-3 h-3" /> Reading Time
                   </label>
                   <input 
                      value={formData.readTime}
                      onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white"
                      placeholder="5 min read"
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                      <TagIcon className="w-3 h-3" /> Category
                   </label>
                   <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white outline-none"
                   >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>

                <div className="space-y-1.5">
                   <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">
                      <TagIcon className="w-3 h-3" /> Tags (Comma Split)
                   </label>
                   <input 
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white"
                      placeholder="Tech, Career, Jobs"
                   />
                </div>

                <div className="pt-4 flex items-center gap-3">
                   <button 
                      type="button"
                      onClick={() => setFormData({...formData, isFeatured: !formData.isFeatured})}
                      className={`w-12 h-6 rounded-full relative transition-colors ${formData.isFeatured ? 'bg-primary' : 'bg-zinc-800'}`}
                   >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? 'left-7' : 'left-1'}`} />
                   </button>
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Feature on Home</span>
                </div>
             </div>
          </div>

          {/* Action Card */}
          <div className="p-8 rounded-[3rem] bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
             <button 
               type="submit"
               disabled={loading || success}
               className="w-full h-16 bg-primary rounded-3xl flex items-center justify-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
             >
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
               {mode === "new" ? "Publish Insight" : "Push Updates"}
             </button>
             
             <button 
               type="button"
               onClick={() => router.back()}
               className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center gap-3 text-zinc-500 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all"
             >
               <X className="w-5 h-5" />
               Discard
             </button>

             <AnimatePresence>
               {error && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: "auto" }}
                   exit={{ opacity: 0, height: 0 }}
                   className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest"
                 >
                   <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                 </motion.div>
               )}
               {success && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: "auto" }}
                   className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
                 >
                   <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Published Successfully!
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </form>
  );
}
