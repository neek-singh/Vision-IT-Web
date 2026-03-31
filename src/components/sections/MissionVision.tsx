"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, CheckCircle2 } from "lucide-react";

export function MissionVision() {
  return (
    <section className="py-10 bg-background px-6 overflow-hidden border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-5"
        >
          <div className="flex items-center gap-4 text-primary">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Our Mission</h3>
          </div>
          
          <h4 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Empowering students with <span className="text-gradient">Job-Ready</span> Skills.
          </h4>
          
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
            हमारा mission है कि हर student को ऐसा education platform मिले जहाँ वह confidently computer सीख सके और अपने career में आगे बढ़ सके।
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <MissionPoint text="Strong basics development" />
            <MissionPoint text="Practical skills improvement" />
            <MissionPoint text="Employment opportunities" />
            <MissionPoint text="Digital India contribution" />
          </ul>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-5 p-6 glass rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-center gap-4 text-accent">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Our Vision</h3>
          </div>
          
          <h4 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Building a <span className="text-gradient">Digital Legacy</span> in Pratuppur.
          </h4>
          
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
            हमारा vision है कि Pratuppur और आसपास के क्षेत्र के students को best computer education मिले और वे digital era में confidently आगे बढ़ें।
          </p>

          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-sm font-bold italic text-primary dark:text-primary-light">
              "हम चाहते हैं कि हमारे students सिर्फ certificate न लें, बल्कि वास्तविक knowledge और skills के साथ अपना future build करें।"
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function MissionPoint({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
      <span className="text-sm font-semibold tracking-wide">{text}</span>
    </li>
  );
}
