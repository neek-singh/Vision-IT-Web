"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Plus,
  Minus,
  Layout,
  MessageSquare,
  Zap,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { coursesData } from "@/data/courses";
import { useAuth } from "@/context/AuthContext";
import { admissionService } from "@/services/admissionService";

// Schema for form validation
const admissionSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number (10 digits required)"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  course: z.string().min(1, "Please select a course"),
  address: z.string().min(5, "Please provide your full address"),
  dob: z.string().min(1, "Please select your date of birth"),
});

type AdmissionForm = z.infer<typeof admissionSchema>;

const courses = [
  "ADCA (Advance Diploma)", 
  "Tally Prime & GST", 
  "DCA (Diploma in Computer)", 
  "PGDCA (Post Graduate)", 
  "Full Stack Web Development", 
  "Graphic Design & UI/UX", 
  "Computer Basic + Typing", 
  "English Typing Mastery", 
  "Computer Fundamentals",
  "CCC / MS Office"
];

const faqs = [
  {
    question: "Admission ke liye kaun se documents chahiye?",
    answer: "Aadhar Card, 10th/12th ki Marksheet, aur 2 Passport size photos verification ke liye Pratappur centre par laana zaroori hai."
  },
  {
    question: "Kya fees installments mein jam kar sakte hain?",
    answer: "Ji haan, Vision IT Pratappur mein hum monthly installment ki facility dete hain taaki students par ek saath load na pade."
  },
  {
    question: "Classes ki timings kya hogi?",
    answer: "Humare paas morning 8 AM se evening 7 PM tak multiple batches available hain. Aap apni convenience ke hisaab se batch chun sakte hain."
  },
  {
    question: "Pratappur centre ka address kya hai?",
    answer: "Vision IT, Kadampara Chowk, Main Road, Pratappur. Aap humein kisi bhi raste se easily reach kar sakte hain."
  }
];

function AdmissionFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
    reset
  } = useForm<AdmissionForm>({
    resolver: zodResolver(admissionSchema),
  });

  // Handle course auto-fill from query params
  useEffect(() => {
    const courseParam = searchParams.get("course");
    if (courseParam) {
      // 1. First check if it's a direct ID match in our official data
      const courseFromData = coursesData[courseParam.toLowerCase()];
      
      if (courseFromData) {
        // Find which option in our 'courses' array best matches this official course
        const matchedCourse = courses.find(c => 
          c.toLowerCase().includes(courseFromData.title.toLowerCase()) || 
          c.toLowerCase().includes(courseParam.toLowerCase())
        );
        
        if (matchedCourse) {
          setValue("course", matchedCourse);
        }
      } else {
        // 2. Fallback: Try matching the param directly against the list
        const matchedCourse = courses.find(c => c.toLowerCase().includes(courseParam.toLowerCase()));
        if (matchedCourse) {
          setValue("course", matchedCourse);
        }
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: AdmissionForm) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting Admission Data:", data);
      
      // 1. Check for duplicates (Search by phone number)
      const isDuplicate = await admissionService.checkDuplicate(data.phoneNumber);
      if (isDuplicate) {
        toast.error("An application with this phone number already exists.");
        setIsSubmitting(false);
        return;
      }

      // 2. Metadata for analytics tracking
      const metadata = {
        utm_source: searchParams.get("utm_source") || "direct",
        browser: typeof window !== 'undefined' ? window.navigator.userAgent : "unknown",
        timestamp: new Date().toISOString(),
      };

      // 3. Submit data to Supabase
      const result = await admissionService.submitApplication({
        ...data,
        userId: user?.id 
      }, metadata);
      
      console.log("Submission successful:", result);

      // 4. Success handling & WhatsApp Redirect
      const waMessage = `Hello Vision IT! %0A%0AI just submitted my online admission application.%0A%0A*Name:* ${data.fullName}%0A*Course:* ${data.course}%0A*Phone:* ${data.phoneNumber}%0A%0APlease let me know the next steps for verification.`;
      const waUrl = `https://wa.me/918103170595?text=${waMessage}`;
      
      toast.success("Application registered! Redirecting to WhatsApp...");
      setIsSuccess(true);
      reset();

      // Small delay to show success before redirecting
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1500);

    } catch (error: any) {
      console.error("Critical Submission Error:", error);
      toast.error(error.message || "Failed to submit. Please try again or visit our center.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 pt-6 transition-colors duration-500 relative">
      <Toaster position="top-right" />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-premium opacity-[0.03] blur-[120px] -z-10" />

      {/* Hero Section */}
      <section className="py-10 px-6 text-center max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Enroll for Future 2026
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05]"
        >
          Start Your <span className="text-gradient">Professional Learning</span> Journey
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-500 dark:text-zinc-400 text-base max-w-2xl mx-auto"
        >
          Vision IT Computer Institute Pratappur mein apni seat aaj hi book karein. Form bharein aur humari team aapko batch timings aur documents verification ke liye call karegi.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Why Us & Stats */}
        <div className="lg:col-span-4 space-y-12">
          {/* Progress Indicator */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Application Progress</h4>
            <div className="space-y-8">
              <StepItem completed={true} title="Register Your Details" description="Fill karein basic admission details aur course select karein." />
              <StepItem completed={isSuccess} title="Connect via WhatsApp" description="Application bhejte hi humein WhatsApp par message karein." />
              <StepItem completed={false} title="Physical Verification" description="Kadampara Chowk Pratappur centre par documents check karayein." />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-6 glass bg-white/50 dark:bg-zinc-900/50 rounded-[2.5rem] space-y-6 border border-zinc-100 dark:border-zinc-800">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-2xl font-bold">1200+</p>
                   <p className="text-xs text-zinc-400 uppercase font-bold tracking-widest">Alumni Network</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-2xl font-bold">ISO Certified</p>
                   <p className="text-xs text-zinc-400 uppercase font-bold tracking-widest">Quality Assurance</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Admission Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 glass bg-white dark:bg-zinc-900 shadow-2xl shadow-primary/5 rounded-[3rem] p-6 md:p-8 relative overflow-hidden border border-zinc-100 dark:border-zinc-800"
        >
          {isSuccess ? (
            <div className="text-center py-24 space-y-8">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50 dark:ring-emerald-900/10">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">Admission Request Sent!</h2>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto text-lg leading-relaxed">
                  आपका application successfully register हो गया है। हम आपको WhatsApp पर redirect कर रहे हैं...
                </p>
              </div>
              <div className="flex flex-col gap-4 max-w-xs mx-auto pt-6">
                <div className="flex items-center justify-center gap-2 text-primary font-bold animate-pulse">
                  <MessageSquare className="w-5 h-5" />
                  Opening WhatsApp...
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                >
                  Register another student
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InputGroup
                  label="Full Name"
                  id="fullName"
                  placeholder="Ex. Rahul Kumar"
                  error={errors.fullName?.message}
                  icon={<User className="w-4 h-4" />}
                  {...register("fullName")}
                />

                <InputGroup
                  label="Father's Name"
                  id="fatherName"
                  placeholder="Ex. Mr. Santosh Kumar"
                  error={errors.fatherName?.message}
                  icon={<Users className="w-4 h-4" />}
                  {...register("fatherName")}
                />

                <InputGroup
                  label="Mobile Number"
                  id="phoneNumber"
                  placeholder="10-digit number"
                  error={errors.phoneNumber?.message}
                  icon={<Phone className="w-4 h-4" />}
                  {...register("phoneNumber")}
                />

                <InputGroup
                  label="Email (Optional)"
                  id="email"
                  type="email"
                  placeholder="yourname@gmail.com"
                  error={errors.email?.message}
                  icon={<Mail className="w-4 h-4" />}
                  {...register("email")}
                />

                <InputGroup
                  label="Date of Birth"
                  id="dob"
                  type="date"
                  error={errors.dob?.message}
                  icon={<Calendar className="w-4 h-4" />}
                  {...register("dob")}
                />

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Select Course
                  </label>
                  <select
                    {...register("course")}
                    className={cn(
                      "w-full px-6 py-4.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all appearance-none text-zinc-900 dark:text-zinc-100 outline-none text-base",
                      errors.course && "border-red-500/50"
                    )}
                  >
                    <option value="" className="dark:bg-zinc-900">Search for a course...</option>
                    {courses.map(course => (
                      <option key={course} value={course} className="dark:bg-zinc-900">{course}</option>
                    ))}
                  </select>
                  {errors.course && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.course.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Full Permanent Address
                </label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className={cn(
                    "w-full px-6 py-5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl focus:ring-4 focus:ring-primary/10 transition-all text-zinc-900 dark:text-zinc-100 outline-none text-base resize-none",
                    errors.address && "border-red-500/50"
                  )}
                  placeholder="Enter your complete address with landmark"
                />
                {errors.address && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.address.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-gradient-premium text-white rounded-3xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all text-lg group"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm & Start Learning
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-zinc-400 text-center uppercase tracking-[0.3em] font-medium leading-relaxed">
                ISO 9001:2015 CERTIFIED INSTITUTE <br/>
                PRATAPPUR | SURAJPUR | CHHATTISGARH
              </p>
            </form>
          )}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 mt-20 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest">
            <HelpCircle className="w-3 h-3" />
            Common Doubts
          </div>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className={cn(
                "rounded-[2rem] border transition-all overflow-hidden bg-white dark:bg-zinc-900/50",
                openFaq === idx ? "border-primary/30" : "border-zinc-100 dark:border-zinc-800"
              )}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left gap-6 group"
              >
                <h4 className="font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-primary transition-colors pr-6">
                   {faq.question}
                </h4>
                <div className={cn(
                  "w-8 h-8 rounded-full border border-zinc-100 dark:border-zinc-800 flex items-center justify-center transition-all",
                  openFaq === idx && "bg-primary text-white border-primary"
                )}>
                  {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Wrapper for Suspense
export default function AdmissionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading portal...</div>}>
      <AdmissionFormContent />
    </Suspense>
  );
}

/** Helper Components */

const StepItem = ({ title, description, completed }: { title: string; description: string; completed: boolean }) => (
  <div className="flex gap-5 group">
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
        completed 
          ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20" 
          : "bg-surface-secondary border border-zinc-200 dark:border-zinc-800 text-zinc-400 group-hover:border-primary/40"
      )}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
      </div>
      <div className="w-0.5 flex-1 bg-zinc-100 dark:bg-zinc-800 min-h-[30px]" />
    </div>
    <div className="space-y-1 pb-8">
       <h5 className={cn("text-base font-bold transition-all", completed ? "text-emerald-500" : "text-zinc-800 dark:text-zinc-200")}>
         {title}
       </h5>
       <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

const InputGroup = React.forwardRef<HTMLInputElement, any>(({ label, error, icon, type = "text", ...props }, ref) => (
  <div className="space-y-3">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
      {icon}
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full px-6 py-4.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all text-zinc-900 dark:text-zinc-100 outline-none text-base placeholder:text-zinc-400",
          error && "border-red-500/50 shadow-sm shadow-red-500/5"
        )}
        {...props}
      />
    </div>
    {error && (
      <motion.p 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1"
      >
        {error}
      </motion.p>
    )}
  </div>
));
InputGroup.displayName = "InputGroup";
