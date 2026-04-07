"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  LogOut, 
  Edit3, 
  Camera, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Loader2,
  User
} from "lucide-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { AdmissionApplication, admissionService } from "@/services/admissionService";
import { userService } from "@/services/userService";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/services/authService";

dayjs.extend(relativeTime);

export default function ProfilePage() {
  const { user, profile, loading, logout, updateProfile: contextUpdateProfile } = useAuth();
  const router = useRouter();
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/profile");
    }
  }, [user, loading, router]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setUploading(true);
      const newPhotoURL = await userService.uploadAvatar(user.id, file);
      await contextUpdateProfile({ photoURL: newPhotoURL });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchAdmissions = async () => {
        try {
          const apps = await admissionService.getStudentApplications(user.id, profileData.phoneNumber);
          setAdmissions(apps);
        } catch (err) {
          console.error("Error fetching admissions:", err);
        }
      };
      fetchAdmissions();
    }
  }, [user, profile]);

  useEffect(() => {
    if (profileData) setEditName(profileData.displayName || "");
  }, [profile]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  // Use fallback values if profile is still null or data is missing
  const profileData: AuthUser = profile || {
    id: user.id,
    displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
    email: user.email || "",
    role: (user.user_metadata?.role as any) || 'user',
    createdAt: user.created_at,
    photoURL: user.user_metadata?.avatar_url || undefined,
    phoneNumber: undefined,
    lastLogin: undefined,
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      await contextUpdateProfile({ displayName: editName });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 pb-20">
      {/* Visual Background */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/10 dark:from-primary/5 to-transparent -z-10" />

      <main className="max-w-2xl mx-auto px-6 pt-24 text-center">
        {/* Profile Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-10 md:p-14 shadow-2xl backdrop-blur-3xl inline-block w-full text-left"
        >
          {/* Header/Avatar Area */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="relative group mb-8">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-zinc-950 shadow-2xl relative bg-zinc-100 dark:bg-zinc-800">
                {uploading ? (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                ) : null}
                {profileData.photoURL ? (
                  <img src={profileData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-black text-zinc-300 dark:text-zinc-600">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-2 -right-2 p-3 bg-primary rounded-2xl text-white shadow-xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleUploadImage} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-center">
                {isEditing ? (
                  <input 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-1 text-2xl font-black text-center outline-none focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-3xl font-black uppercase tracking-tight italic">{profileData.displayName}</h1>
                )}
                <button 
                  onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-primary"
                >
                  {updateLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Edit3 className="w-4 h-4" />)}
                </button>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                <Shield className="w-3.5 h-3.5" /> {profileData.role} Account
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6 bg-zinc-50 dark:bg-zinc-950/50 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Security & Identity</h3>
            <div className="space-y-6">
              <InfoRow 
                icon={<Mail className="w-4 h-4" />} 
                label="Registered Email" 
                value={profileData.email || "Not set"} 
              />
              <InfoRow 
                icon={<Phone className="w-4 h-4" />} 
                label="Direct Mobile" 
                value={profileData.phoneNumber || "Not set"} 
              />
              <InfoRow 
                icon={<Clock className="w-4 h-4" />} 
                label="Session Status" 
                value={profileData.lastLogin ? `Last active ${dayjs(profileData.lastLogin).fromNow()}` : "Active Now"} 
              />
              <InfoRow 
                icon={<Calendar className="w-4 h-4" />} 
                label="Enrollment Date" 
                value={dayjs(profileData.createdAt).format("MMMM DD, YYYY")} 
              />
            </div>
          </div>

          {/* New: Admission Status Section */}
          {admissions.length > 0 && (
            <div className="mt-8 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Recent Applications</h3>
              <div className="space-y-4">
                {admissions.map((admission) => (
                  <div 
                    key={admission.id}
                    className="p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/10 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{admission.course}</p>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Applied on {dayjs(admission.submittedAt).format("DD MMM")}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                      admission.status === "enrolled" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      admission.status === "rejected" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    )}>
                      {admission.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => logout()}
              className="flex-grow py-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 hover:border-red-500/50 transition-all shadow-lg active:scale-95"
            >
              <LogOut className="w-4 h-4" /> End Current Session
            </button>
            <Link 
              href="/"
              className="px-10 py-5 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 active:scale-95 text-center"
            >
              Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Support Message */}
        <p className="text-center mt-12 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest leading-loose max-w-sm mx-auto">
          Need to update your mobile number? <br/>
          Contact <span className="text-primary italic">Vision IT Administration</span> for secure verification.
        </p>
      </main>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4 group">
       <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors shadow-sm">
          {icon}
       </div>
       <div>
          <p className="text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{value}</p>
       </div>
    </div>
  );
}

function StatCard({ count, label, icon }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 flex items-center justify-between group hover:bg-zinc-800 transition-all">
       <div>
          <h4 className="text-3xl font-black text-white mb-1">{count}</h4>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</p>
       </div>
       <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center group-hover:bg-primary transition-all group-hover:text-white">
          {icon}
       </div>
    </div>
  );
}
