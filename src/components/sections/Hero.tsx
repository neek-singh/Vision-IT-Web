"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { heroService, HeroSlide } from "@/services/heroService";

export function Hero({ initialSlides }: { initialSlides?: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides || []);

  useEffect(() => {
    // If no initial data, fetch on client as fallback
    if (!initialSlides || initialSlides.length === 0) {
      const fetchSlides = async () => {
        const data = await heroService.getSlides(true);
        setSlides(data);
      };
      fetchSlides();
    }
  }, [initialSlides]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden pt-6 bg-background transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/[0.03] dark:bg-primary/[0.05] -skew-x-12 transform origin-top-right -z-10" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-4"
          >
            {/* Text Content */}
            <div className="space-y-5 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-3"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest max-w-fit">
                  <Star className="w-3 h-3 fill-primary" />
                  Vision IT Computer Institute Pratappur
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest max-w-fit">
                  <CheckCircle className="w-3 h-3" />
                  Authorized Learning Center of Drishti Computer Education
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white"
              >
                {slides[current].title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                  {slides[current].description}
                </p>
                <p className="text-sm font-bold text-primary italic">
                  {slides[current].subtext}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  href={slides[current].cta1.href}
                  className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all hover:scale-[1.02] active:scale-95"
                >
                  {slides[current].cta1.text}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={slides[current].cta2.href}
                  className="px-6 py-3 glass text-primary dark:text-primary-light rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all"
                >
                  {slides[current].cta2.text}
                </Link>
              </motion.div>
            </div>

            {/* Visual Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative group order-1 lg:order-2"
            >
              <div className="absolute inset-0 bg-gradient-premium blur-3xl opacity-20 group-hover:opacity-30 transition-opacity -z-10" />
              <div className="relative rounded-[2.2rem] overflow-hidden glass p-3 aspect-[4/3] lg:aspect-square max-w-[360px] mx-auto shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-3 z-20"
                  >
                    <Image
                      src={slides[current].image}
                      alt={slides[current].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-[2.5rem]"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Preload Next Image for Smooth Transitions */}
                <div className="hidden">
                  <Image
                    src={slides[(current + 1) % slides.length].image}
                    alt="Preload"
                    width={1}
                    height={1}
                    priority
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex items-center gap-3 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                current === idx 
                  ? "w-10 bg-primary shadow-lg shadow-primary/20" 
                  : "w-2 bg-zinc-300 dark:bg-zinc-800 hover:bg-primary/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <div className="flex items-center gap-2 ml-4">
            <button onClick={prevSlide} className="p-2.5 glass rounded-full text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-light transition-all active:scale-90">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="p-2.5 glass rounded-full text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary-light transition-all active:scale-90">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
