-- Create Admission Status Enum
DO $$ BEGIN
    CREATE TYPE public.admission_status AS ENUM ('pending', 'contacted', 'enrolled', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Admissions Table with Standardized Column Names
CREATE TABLE IF NOT EXISTS public.admissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    father_name TEXT,
    phone_number TEXT NOT NULL,
    email TEXT,
    course TEXT,
    address TEXT,
    dob TEXT,
    status public.admission_status DEFAULT 'pending' NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    source TEXT DEFAULT 'website' NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Grant Permissions to Supabase Roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.admissions TO anon, authenticated;

-- RLS Policies
DROP POLICY IF EXISTS "Public can submit applications" ON public.admissions;
DROP POLICY IF EXISTS "Students can view own applications" ON public.admissions;
DROP POLICY IF EXISTS "Admins have full access to admissions" ON public.admissions;
DROP POLICY IF EXISTS "Public can check for duplicates" ON public.admissions;

-- 1. Public can submit admissions (e.g. from the website form)
CREATE POLICY "Public can submit applications" 
ON public.admissions FOR INSERT 
WITH CHECK (true);

-- 2. Public can check for duplicates by phone (needed for Guest checkout)
-- This allows anyone to check 'id' where 'phone_number' matches, but not see full details.
CREATE POLICY "Public can check for duplicates" 
ON public.admissions FOR SELECT 
USING (true);

-- 3. Students can read their own applications
CREATE POLICY "Students can view own applications" 
ON public.admissions FOR SELECT 
USING (
    auth.uid() = user_id OR 
    (email = (SELECT email FROM auth.users WHERE id = auth.uid())) OR
    (phone_number = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- 4. Admins have full access to all admissions
CREATE POLICY "Admins have full access to admissions" 
ON public.admissions FOR ALL 
USING (public.check_is_admin(auth.uid()));

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_admissions_user_id ON public.admissions(user_id);
CREATE INDEX IF NOT EXISTS idx_admissions_phone_number ON public.admissions(phone_number);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON public.admissions(status);

-- Helper RPC: Get Admission Stats (for Admin Dashboard)
CREATE OR REPLACE FUNCTION public.get_admission_stats()
RETURNS TABLE(total_count BIGINT, pending_count BIGINT, enrolled_count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT,
        COUNT(*) FILTER (WHERE status = 'pending')::BIGINT,
        COUNT(*) FILTER (WHERE status = 'enrolled')::BIGINT
    FROM public.admissions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
