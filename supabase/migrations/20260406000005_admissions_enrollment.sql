-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admissions Table
CREATE TABLE IF NOT EXISTS public.admissions (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_email TEXT,
  student_phone TEXT,
  course_id TEXT REFERENCES public.courses(id),
  admission_date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'partially_paid')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS student_name TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS student_email TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS student_phone TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS course_id TEXT;
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS admission_date TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.admissions ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid';

-- 2. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  admission_id UUID REFERENCES public.admissions(id),
  profile_id UUID REFERENCES public.profiles(id),
  course_id TEXT REFERENCES public.courses(id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS admission_id UUID;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS profile_id UUID;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS course_id TEXT;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 3. Enable RLS
ALTER TABLE IF EXISTS public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.enrollments ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admissions' AND policyname = 'Users can view their own admissions.') THEN
    CREATE POLICY "Users can view their own admissions." ON public.admissions FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE email = student_email));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'enrollments' AND policyname = 'Users can view their own enrollments.') THEN
    CREATE POLICY "Users can view their own enrollments." ON public.enrollments FOR SELECT USING (auth.uid() = profile_id);
  END IF;
END $$;
