"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, 
  Camera, 
  X, 
  Maximize2, 
  Search, 
  Filter,
  Monitor,
  Library,
  Users,
  Award,
  Video
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { galleryItems, galleryCategories } from "@/data/gallery";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-background pb-16 pt-6 transition-colors duration-500">
      {/* Header */}
      <section className="py-10 px-6 text-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3 h-3" />
            Visual Journey
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Our <span className="text-gradient">Learning Hub</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Explore the vibrant life at Vision IT Computer Institute. See where technology meets education.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 mb-10 bg-background">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {galleryCategories.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveFilter(section.id)}
              className={cn(
                "px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all",
                activeFilter === section.id 
                  ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105" 
                  : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-primary/50"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative h-[280px] glass rounded-[3rem] overflow-hidden cursor-pointer shadow-xl shadow-primary/5 hover:shadow-2xl transition-all border border-zinc-100 dark:border-zinc-800"
                onClick={() => setSelectedImage(item)}
              >
                <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center -z-20">
                   <Monitor className="w-10 h-10 text-primary/20" />
                </div>
                <Image 
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full glass border-white/20 bg-white/10 flex items-center justify-center text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-10 right-10 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:scale-110 transition-all z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-5xl h-[80vh] rounded-[4rem] overflow-hidden glass border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 to-transparent">
                <h5 className="text-white text-3xl font-bold">{selectedImage.title}</h5>
                <p className="text-white/60 uppercase tracking-[0.3em] font-bold text-xs mt-2">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <StatItem icon={<Library />} count="1000+" label="Students" />
        <StatItem icon={<Users />} count="10+" label="Faculty" />
        <StatItem icon={<Award />} count="2000+" label="Certificates" />
        <StatItem icon={<Video />} count="Digital" label="Learning" />
      </section>
    </div>
  );
}

function StatItem({ icon, count, label }: any) {
  return (
    <div className="text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
        <div className="w-5 h-5">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-white">{count}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}
