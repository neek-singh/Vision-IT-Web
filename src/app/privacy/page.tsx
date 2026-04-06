"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Bell } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-20 px-6 min-h-screen bg-background transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest"
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy Guidelines
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Last Updated: March 31, 2026</p>
        </div>

        {/* Content Section */}
        <div className="glass rounded-[2.5rem] p-8 md:p-12 bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 space-y-10 shadow-2xl">
          
          <PolicySection 
            icon={<Eye className="text-blue-500" />}
            title="Overview"
            content="Vision IT Computer Institute ('we', 'our', or 'us') is committed to protecting the privacy of our students and visitors. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or visit our institute in Pratappur."
          />

          <PolicySection 
            icon={<Lock className="text-emerald-500" />}
            title="Information We Collect"
            content="We collect information that you provide directly to us, such as when you fill out an admission form, contact us for queries, or register for an account. This may include your name, email address, phone number, and educational background."
          />

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
              How We Use Your Data
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ListItem text="To process your admission applications" />
              <ListItem text="To provide course updates and notifications" />
              <ListItem text="To verify your certificates and marksheets" />
              <ListItem text="To improve our educational services" />
              <ListItem text="To communicate with you via email or phone" />
              <ListItem text="To maintain institutional records" />
            </ul>
          </div>

          <PolicySection 
            icon={<ShieldCheck className="text-orange-500" />}
            title="Data Security"
            content="हम आपकी personal information की सुरक्षा के लिए standard security measures का उपयोग करते हैं। आपकी data केवल authorized staff द्वारा ही access की जाती है और इसे किसी भी third party के साथ बिना आपकी अनुमति के share नहीं किया जाता।"
          />

          <PolicySection 
            icon={<Bell className="text-purple-500" />}
            title="Your Rights"
            content="Students have the right to access, correct, or request the deletion of their personal information. If you wish to update your records, please contact our administrative office at Step-by-step guidance."
          />

          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
              If you have any questions about this Privacy Policy, please email us at <span className="text-primary font-bold">visionitinstitute@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicySection({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-3"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h2>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 group hover:border-primary/30 transition-all">
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{text}</span>
    </div>
  );
}
