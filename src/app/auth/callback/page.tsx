"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Auth callback error:", error);
        router.push("/login?error=auth_callback_failed");
      } else {
        router.push("/profile");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
        Authenticating Secure Session...
      </p>
    </div>
  );
}
