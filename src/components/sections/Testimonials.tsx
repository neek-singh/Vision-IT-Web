"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Briefcase
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { testimonialService, Testimonial } from "@/services/testimonialService";

export function Testimonials({ initialTestimonials }: { initialTestimonials?: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials || []);
  const [loading, setLoading] = useState(!initialTestimonials);

  useEffect(() => {
    if (initialTestimonials) return;

    // Only show published testimonials to the public
    const unsub = testimonialService.subscribeToTestimonials((data) => {
      setTestimonials(data.filter(t => t.is_published));
      setLoading(false);
    });
    return () => unsub();
  }, [initialTestimonials]);
  return (
    <section className="py-12 bg-background px-6 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
          >
            <Quote className="w-3 h-3 fill-primary" />
            Social Proof
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Hear from our alumni who have successfully transformed their careers through our professional training.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="p-6 glass bg-white dark:bg-zinc-900 shadow-xl shadow-primary/5 rounded-[2.5rem] relative border border-zinc-100 dark:border-zinc-800"
    >
      {/* Decorative Quote Mark */}
      <div className="absolute top-8 right-8 text-primary/10">
        <Quote className="w-16 h-16" />
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("w-4 h-4", i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-zinc-200 dark:text-zinc-700")} />
          ))}
        </div>

        <p className="text-zinc-700 dark:text-zinc-300 italic leading-relaxed text-sm">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
           <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 grayscale group-hover:grayscale-0 transition-all">
              <Image src={testimonial.avatar} alt={testimonial.name} fill />
           </div>
           <div>
              <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{testimonial.name}</h5>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                 <GraduationCap className="w-3 h-3 text-primary" />
                 {testimonial.course}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
