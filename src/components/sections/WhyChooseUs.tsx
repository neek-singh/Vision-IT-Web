"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Lightbulb, 
  BookOpen, 
  Wallet, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  Smile 
} from "lucide-react";

const reasons = [
  {
    title: "Experienced Faculty",
    description: "Humare trainers ke paas industry ka years ka experience hai.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Practical Training",
    description: "Hum theory se zyada hands-on practical practice par focus karte hain.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "Simple Teaching",
    description: "Har student ke liye aasaan aur step-by-step seekhne ka tarika.",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Affordable Fees",
    description: "Pratappur mein sabse kam fees aur behtar quality education.",
    icon: <Wallet className="w-6 h-6" />,
  },
  {
    title: "Flexible Batches",
    description: "Aapke convenience ke hisaab se morning aur evening batches.",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "Career Oriented",
    description: "Aapko job-ready banane ke liye placement support aur guideance.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: "Personal Attention",
    description: "Chote batches taaki har student par special dhyan diya sake.",
    icon: <UserCheck className="w-6 h-6" />,
  },
  {
    title: "Lab Facilities",
    description: "Modern computer lab with high-speed internet aur backup.",
    icon: <Smile className="w-6 h-6" />,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-10 bg-surface-secondary px-6 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-sm font-bold tracking-[0.4em] text-primary uppercase">
            Value Proposition
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Why Choose <span className="text-gradient">Vision IT</span> in Pratappur?
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base">
            Humara institute quality education, recognized DCA/PGDCA certificates, aur expert practical training ke liye poore Pratappur kshetra mein prasiddh hai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-5 rounded-[2rem] border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {reason.icon}
              </div>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                {reason.title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
