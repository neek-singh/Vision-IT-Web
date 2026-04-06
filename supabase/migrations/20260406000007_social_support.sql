-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Support Tickets Table
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed'));
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent'));
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS student_id UUID;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS message TEXT;

-- 3. Ticket Comments
CREATE TABLE IF NOT EXISTS public.ticket_comments (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  ticket_id UUID REFERENCES public.support_tickets(id),
  author_id UUID REFERENCES public.profiles(id),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ticket_comments ADD COLUMN IF NOT EXISTS ticket_id UUID;
ALTER TABLE public.ticket_comments ADD COLUMN IF NOT EXISTS author_id UUID;
ALTER TABLE public.ticket_comments ADD COLUMN IF NOT EXISTS comment TEXT;

-- 4. Enable RLS
ALTER TABLE IF EXISTS public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ticket_comments ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'social_links' AND policyname = 'Everyone can view active social links.') THEN
    CREATE POLICY "Everyone can view active social links." ON public.social_links FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'support_tickets' AND policyname = 'Users can create and view their own tickets.') THEN
    CREATE POLICY "Users can create and view their own tickets." ON public.support_tickets FOR ALL USING (auth.uid() = student_id);
  END IF;
END $$;
