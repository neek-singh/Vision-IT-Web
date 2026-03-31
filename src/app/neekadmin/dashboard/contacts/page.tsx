"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { contactService, ContactMessage } from "@/services/contactService";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Star, 
  Search, 
  User, 
  BookOpen,
  Archive,
  MoreVertical,
  Reply,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ContactDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ContactMessage["status"] | "all">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    const unsubscribe = contactService.subscribeToMessages((updated) => {
      setMessages(updated);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, status: ContactMessage["status"]) => {
    try {
      await contactService.updateMessageStatus(id, { status });
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status } as ContactMessage);
      }
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  const toggleStar = async (message: ContactMessage) => {
    try {
      await contactService.updateMessageStatus(message.id!, { isStarred: !message.isStarred });
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...selectedMessage, isStarred: !message.isStarred } as ContactMessage);
      }
    } catch (err) {
      console.error("Failed to toggle star");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await contactService.deleteMessage(id);
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) || 
      m.mobile.includes(search) || 
      m.course.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === "all" || m.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => m.status === "unread").length;

  return (
    <AdminLayout 
      title="Inquiry Pipeline" 
      subtitle={`You have ${unreadCount} new messages from potential students`}
    >
      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-280px)] min-h-[600px]">
        {/* Inbox Sidebar */}
        <div className="lg:w-96 flex flex-col gap-6 h-full">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
           </div>

           <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {["all", "unread", "read", "replied", "archived"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-zinc-900 text-zinc-500 hover:text-white"
                  )}
                >
                  {f}
                </button>
              ))}
           </div>

           <div className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="h-24 rounded-2xl bg-zinc-900/50 border border-zinc-800 animate-pulse" />
                  ))
                ) : filteredMessages.length > 0 ? (
                  filteredMessages.map((msg) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.status === "unread") handleStatusUpdate(msg.id!, "read");
                      }}
                      className={cn(
                        "p-5 rounded-2xl border transition-all cursor-pointer group relative",
                        selectedMessage?.id === msg.id 
                          ? "bg-zinc-800 border-primary/50 shadow-xl" 
                          : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                      )}
                    >
                       {msg.status === "unread" && (
                         <div className="absolute top-5 right-5 w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50" />
                       )}
                       
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-primary transition-colors">
                             {msg.course}
                          </span>
                          <span className="text-[8px] font-bold text-zinc-600">
                             {dayjs(msg.receivedAt).fromNow()}
                          </span>
                       </div>
                       
                       <h4 className={cn("text-xs font-black truncate mb-1", msg.status === "unread" ? "text-white" : "text-zinc-400")}>
                          {msg.name}
                       </h4>
                       <p className="text-[10px] text-zinc-600 line-clamp-1 font-medium italic">
                          "{msg.message}"
                       </p>

                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           toggleStar(msg);
                         }}
                         className={cn(
                           "absolute bottom-4 right-4 transition-colors",
                           msg.isStarred ? "text-amber-400" : "text-zinc-800 hover:text-zinc-600"
                         )}
                       >
                         <Star className={cn("w-3.5 h-3.5", msg.isStarred && "fill-current")} />
                       </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center space-y-4">
                     <Mail className="w-10 h-10 text-zinc-800 mx-auto opacity-20" />
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">No inquiries found</p>
                  </div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Message Content Area */}
        <div className="flex-grow flex flex-col glass bg-zinc-900/30 border border-zinc-800 rounded-[3rem] overflow-hidden">
           <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div 
                  key={selectedMessage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col h-full"
                >
                   {/* Message Header */}
                   <div className="p-8 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                         <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-xl">
                            {selectedMessage.name[0]}
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">{selectedMessage.name}</h3>
                            <div className="flex items-center gap-4">
                               <span className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                  <Phone className="w-3 h-3 text-emerald-500" /> {selectedMessage.mobile}
                               </span>
                               <span className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                  <Clock className="w-3 h-3" /> {dayjs(selectedMessage.receivedAt).format("MMM D, YYYY • h:mm A")}
                               </span>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center gap-3">
                         <button 
                           onClick={() => toggleStar(selectedMessage)}
                           className={cn("p-3 rounded-xl border transition-all", selectedMessage.isStarred ? "bg-amber-400/10 border-amber-400/20 text-amber-400" : "bg-zinc-800 border-zinc-700 text-zinc-500")}
                         >
                            <Star className={cn("w-5 h-5", selectedMessage.isStarred && "fill-current")} />
                         </button>
                         <button 
                           onClick={() => handleStatusUpdate(selectedMessage.id!, "archived")}
                           className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-blue-400 transition-all"
                         >
                            <Archive className="w-5 h-5" />
                         </button>
                         <button 
                           onClick={() => handleDelete(selectedMessage.id!)}
                           className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-red-500 transition-all"
                         >
                            <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                   </div>

                   {/* Message Body */}
                   <div className="flex-grow p-10 overflow-y-auto">
                      <div className="max-w-2xl mx-auto space-y-10">
                         <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Interest: {selectedMessage.course}</span>
                         </div>
                         
                         <div className="p-8 rounded-[2.5rem] bg-zinc-950/50 border border-zinc-800/50 relative">
                            <MessageSquare className="absolute -top-4 -left-4 w-10 h-10 text-primary/20" />
                            <p className="text-lg text-zinc-300 font-medium leading-relaxed italic whitespace-pre-wrap">
                               "{selectedMessage.message}"
                            </p>
                         </div>

                         <div className="pt-10 border-t border-zinc-800 flex items-center justify-between">
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Status Tracking</span>
                               <select 
                                 value={selectedMessage.status}
                                 onChange={(e) => handleStatusUpdate(selectedMessage.id!, e.target.value as any)}
                                 className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase outline-none focus:border-primary"
                               >
                                  <option value="unread">Unread</option>
                                  <option value="read">Read</option>
                                  <option value="replied">Replied</option>
                                  <option value="archived">Archived</option>
                               </select>
                            </div>
                            
                            <a 
                              href={`tel:${selectedMessage.mobile}`}
                              className="px-10 h-14 bg-primary rounded-2xl flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                               <Reply className="w-4 h-4" /> Call Student
                            </a>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center p-20 text-center space-y-6">
                   <div className="w-24 h-24 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <Mail className="w-10 h-10 text-zinc-800" />
                   </div>
                   <h3 className="text-xl font-black text-zinc-700 uppercase tracking-tight italic">Select an Inquiry to Respond</h3>
                   <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] max-w-xs leading-loose">
                      Manage student communications and track interest in real-time.
                   </p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
}
