"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Zap,
  Youtube,
  Facebook,
  Instagram,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { contactService } from "@/services/contactService";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  course: z.string().min(1, "Please select or enter a course"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await contactService.submitMessage(data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-8 md:py-10 px-6 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-premium opacity-[0.03] dark:opacity-[0.05] blur-[120px] -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <MessageSquare className="w-3 h-3" />
            हमसे जुड़ें | Contact Center
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            How Can We <span className="text-gradient">Help You?</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Vision IT Computer Institute Pratappur — Hum aapke digital future aur career growth ke liye hamesha ready hain. Kadampara Chowk par visit karein ya humein call karein.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <ContactInfoCard 
            icon={<Phone className="w-6 h-6" />} 
            title="Call / WhatsApp" 
            info="+91 8103170595" 
            subInfo="Direct call for faster support"
            color="bg-emerald-500"
            link="https://wa.me/918103170595"
          />
          <ContactInfoCard 
            icon={<Mail className="w-6 h-6" />} 
            title="Official Email" 
            info="visionitinstitute@gmail.com" 
            subInfo="For corporate & institute queries"
            color="bg-blue-600"
          />
          <ContactInfoCard 
            icon={<MapPin className="w-6 h-6" />} 
            title="Institute Address" 
            info="Kadampara Chowk, Main Road, Pratappur" 
            subInfo="Near Shubham Gift Gallery, District – Surajpur (CG)"
            color="bg-indigo-600"
          />
          
          {/* Social Connect */}
          <div className="p-6 glass rounded-[2.5rem] bg-white dark:bg-zinc-900/50 shadow-xl shadow-primary/5">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-widest">Social Presence</h4>
            <div className="flex gap-4">
              <SocialIcon icon={<Youtube />} href="#" color="text-red-500 hover:bg-red-50" />
              <SocialIcon icon={<Facebook />} href="#" color="text-blue-600 hover:bg-blue-50" />
              <SocialIcon icon={<Instagram />} href="#" color="text-pink-500 hover:bg-pink-50" />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 glass rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl shadow-primary/5 border border-zinc-100 dark:border-zinc-800"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px] -z-10" />
          
          <div className="mb-10 text-zinc-900 dark:text-white">
            <h3 className="text-2xl font-bold mb-2">Send a Direct Message</h3>
            <p className="text-zinc-500 dark:text-zinc-400">हम 24 घंटे के भीतर आपसे संपर्क करेंगे।</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup 
                label="आपका नाम | Full Name" 
                {...register("name")} 
                error={errors.name?.message}
                placeholder="Ex. Shubham Kumar"
              />
              <InputGroup 
                label="मोबाइल नंबर | Mobile" 
                {...register("mobile")} 
                error={errors.mobile?.message}
                placeholder="10-digit number"
              />
            </div>
            
            <InputGroup 
              label="कोर्स रुचि | Course Name" 
              {...register("course")} 
              error={errors.course?.message}
              placeholder="Ex. ADCA, DCA, Tally"
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                आपका संदेश | Message
              </label>
              <textarea 
                {...register("message")}
                rows={4} 
                className={cn(
                  "w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all outline-none focus:ring-2 focus:ring-primary/20 text-zinc-900 dark:text-zinc-100 resize-none",
                  errors.message && "border-red-500/50"
                )}
                placeholder="Write your query here..."
              />
              {errors.message && <p className="text-[10px] font-bold text-red-500">{errors.message.message}</p>}
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-premium text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message | संदेश भेजें
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 className="w-5 h-5" />
                <p className="text-sm font-bold">मैसेज भेज दिया गया है! हम जल्दी ही संपर्क करेंगे।</p>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400"
              >
                <p className="text-sm font-bold">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="text-center mb-12 text-zinc-900 dark:text-white">
          <h2 className="text-2xl font-bold mb-4">Visit Our <span className="text-gradient">Institute</span></h2>
          <p className="text-zinc-500 dark:text-zinc-400">Vision IT Computer Institute Pratappur (Chhattisgarh)</p>
        </div>
        
        <div className="relative group w-full h-[500px] rounded-[3.5rem] overflow-hidden glass p-4 shadow-2xl shadow-primary/5 bg-white dark:bg-zinc-900">
          <iframe 
            src="https://maps.google.com/maps?q=23.4850311,83.2102628&t=k&z=19&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-10 right-10 flex flex-col gap-3">
            <Link 
              href="https://www.google.com/maps/place/Vision+IT+Computer+Institute+Pratappur/@23.4850311,83.2102628" 
              target="_blank"
              className="px-6 py-3 bg-white text-zinc-900 rounded-full font-bold flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactInfoCard({ icon, title, info, subInfo, color, link }: any) {
  const Content = (
    <div className="p-5 glass bg-white dark:bg-zinc-900/50 rounded-[2rem] hover:bg-white transition-all group border border-zinc-200/50 dark:border-zinc-800">
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform",
        color
      )}>
        {icon}
      </div>
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">{title}</h4>
      <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{info}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{subInfo}</p>
    </div>
  );
  if (link) return <Link href={link} target="_blank" className="block">{Content}</Link>;
  return Content;
}

function SocialIcon({ icon, href, color }: any) {
  return (
    <Link 
      href={href} 
      className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-zinc-100 dark:bg-zinc-800",
        color
      )}
    >
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </Link>
  );
}

const InputGroup = React.forwardRef<HTMLInputElement, any>(({ label, error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{label}</label>
      <input 
        ref={ref}
        className={cn(
          "w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all outline-none focus:ring-2 focus:ring-primary/20 text-zinc-900 dark:text-zinc-100",
          error ? "border-red-500/50" : "focus:border-primary/20"
        )} 
        {...props} 
      />
      {error && <p className="text-[10px] font-bold text-red-500">{error}</p>}
    </div>
  );
});
InputGroup.displayName = "InputGroup";
