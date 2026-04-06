-- Fix Admissions Table Schema Mismatch
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS father_name TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS student_address TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS student_dob TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website_online_form';
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Sync status check constraint
ALTER TABLE public.admissions DROP CONSTRAINT IF EXISTS admissions_status_check;
ALTER TABLE public.admissions ADD CONSTRAINT admissions_status_check CHECK (status IN ('pending', 'contacted', 'enrolled', 'rejected'));
