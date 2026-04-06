-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  student_id UUID REFERENCES public.profiles(id),
  course_id TEXT REFERENCES public.courses(id),
  issue_date TIMESTAMPTZ DEFAULT NOW(),
  expiry_date TIMESTAMPTZ,
  is_verified BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS certificate_number TEXT;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS student_id UUID;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS course_id TEXT;
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS issue_date TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT true;

-- Ensure certificate_number is UNIQUE (required for foreign key reference)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'certificates_certificate_number_key'
  ) THEN
    ALTER TABLE public.certificates ADD CONSTRAINT certificates_certificate_number_key UNIQUE (certificate_number);
  END IF;
END $$;

-- 2. Certificate Verification Logging
CREATE TABLE IF NOT EXISTS public.certificate_verification_logs (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  certificate_number TEXT REFERENCES public.certificates(certificate_number),
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- 3. Enable RLS
ALTER TABLE IF EXISTS public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.certificate_verification_logs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'certificates' AND policyname = 'Public can view verified certificates by number.') THEN
    CREATE POLICY "Public can view verified certificates by number." ON public.certificates FOR SELECT USING (is_verified = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'certificates' AND policyname = 'Users can view their own certificates.') THEN
    CREATE POLICY "Users can view their own certificates." ON public.certificates FOR SELECT USING (auth.uid() = student_id);
  END IF;
END $$;
