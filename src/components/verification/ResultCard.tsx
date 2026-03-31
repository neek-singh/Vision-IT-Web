import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  User, 
  Award, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  Star,
  FileText,
  BadgeInfo,
  Clock,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  type: string;
  data: any;
}

export function ResultCard({ type, data }: ResultCardProps) {
  if (!data) return null;

  const isVerified = data.status === "Active" || data.status === "Enrolled" || data.status === "Completed" || data.status === "Genuine";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-8 p-6 md:p-8 glass bg-white dark:bg-zinc-900/50 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden"
    >
      {/* Verified Badge */}
      <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-widest">
        <ShieldCheck className="w-3.5 h-3.5" />
        Official Verification
      </div>

      <div className="space-y-8">
        {/* Header Name/Title */}
        <div className="flex items-center gap-5">
           <div className={cn(
             "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg",
             isVerified ? "bg-emerald-500 shadow-emerald-500/20" : "bg-red-500 shadow-red-500/20"
           )}>
             {type === "teacher" ? <User className="w-8 h-8" /> : <Award className="w-8 h-8" />}
           </div>
           <div>
             <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {data.studentName || data.name}
                </h3>
                {isVerified ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
             </div>
             <p className="text-zinc-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-widest mt-1">
               {type.replace("-", " ")} Verified Results
             </p>
           </div>
        </div>

        {/* Dynamic Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {type === "teacher" && (
            <>
              <InfoItem icon={<BadgeInfo />} label="Qualification" value={data.qualification} />
              <InfoItem icon={<Briefcase />} label="Experience" value={data.experience} />
              <InfoItem icon={<Clock />} label="Joined Date" value={data.joinedDate} />
            </>
          )}

          {type === "student" && (
            <>
              <InfoItem icon={<BookOpen />} label="Course" value={data.course} />
              <InfoItem icon={<Calendar />} label="Admission Date" value={data.admissionDate} />
              <InfoItem icon={<Star />} label="Current Status" value={data.status} />
            </>
          )}

          {type === "certificate" && (
             <>
               <InfoItem icon={<Award />} label="Issued Course" value={data.course} />
               <InfoItem icon={<Clock />} label="Issue Date" value={data.issueDate} />
               <InfoItem icon={<ShieldCheck />} label="Certificate Status" value={data.status} />
             </>
          )}

          {type === "query" && (
             <>
               <InfoItem icon={<Layout />} label="Applied Course" value={data.course} />
               <InfoItem icon={<CheckCircle2 />} label="Admission Status" value={data.status} />
               <InfoItem icon={<Clock />} label="Submission ID" value={data.id.slice(0, 8)} />
             </>
          )}
        </div>

        {/* Marksheet Specifics */}
        {type === "marksheet" && (
          <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={<BookOpen />} label="Enrolled Course" value={data.course} />
                <div className="p-4 bg-emerald-50 content-between items-center dark:bg-emerald-900/10 rounded-2xl flex border border-emerald-100 dark:border-emerald-800/30">
                   <div>
                      <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Final Rank / Grade</p>
                      <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{data.grade}</p>
                   </div>
                   <div className="ml-auto text-right">
                      <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Aggregate Marks</p>
                      <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{data.totalMarks}</p>
                   </div>
                </div>
             </div>
             
             <div className="space-y-4">
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Subject Wise Breakdown</p>
               <div className="grid grid-cols-1 gap-3">
                  {data.subjects.map((s: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                       <span className="font-bold text-sm text-zinc-700 dark:text-zinc-300">{s.name}</span>
                       <span className="font-bold text-sm text-primary">{s.marks} / {s.total}</span>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        )}

        {/* Footer Disclaimer */}
        <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
          This is an electronically generated report. For manual verification, contact +91 8103170595.
        </p>
      </div>
    </motion.div>
  );
}

function InfoItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-zinc-400">
        {React.cloneElement(icon, { className: "w-3.5 h-3.5" })}
        <span className="text-[9px] font-extrabold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
        {value}
      </p>
    </div>
  );
}

function Layout({ ...props }: any) {
  return <BookOpen {...props} />;
}
