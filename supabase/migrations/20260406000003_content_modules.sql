-- Content Modules Migration: Hero, Courses, Faculty, FAQs

-- 1. Hero Slides Table
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    subtext TEXT,
    cta1_text TEXT,
    cta1_href TEXT,
    cta2_text TEXT,
    cta2_href TEXT,
    image_url TEXT,
    accent_color TEXT DEFAULT 'text-primary',
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY, -- Slug based ID (e.g., 'adca', 'dca')
    title TEXT NOT NULL,
    full_name TEXT,
    description TEXT,
    duration TEXT,
    fees TEXT,
    level TEXT,
    category TEXT,
    image TEXT,
    icon TEXT,
    syllabi JSONB DEFAULT '[]'::jsonb,
    career_paths TEXT[] DEFAULT '{}',
    is_popular BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Faculty Table
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    specialization TEXT,
    experience TEXT,
    summary TEXT,
    image TEXT,
    linked_in TEXT,
    email TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Grant Permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT SELECT ON public.faculty TO anon, authenticated;
GRANT SELECT ON public.faqs TO anon, authenticated;

-- Admin Management Permissions (Full Access)
GRANT ALL ON public.hero_slides TO authenticated;
GRANT ALL ON public.courses TO authenticated;
GRANT ALL ON public.faculty TO authenticated;
GRANT ALL ON public.faqs TO authenticated;

-- RLS Policies (Read Access for Public)
CREATE POLICY "Public can view published hero slides" ON public.hero_slides FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published courses" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published faculty" ON public.faculty FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published faqs" ON public.faqs FOR SELECT USING (is_published = true);

-- RLS Policies (Manage Access for Admins)
CREATE POLICY "Admins manage hero slides" ON public.hero_slides FOR ALL USING (public.check_is_admin(auth.uid()));
CREATE POLICY "Admins manage courses" ON public.courses FOR ALL USING (public.check_is_admin(auth.uid()));
CREATE POLICY "Admins manage faculty" ON public.faculty FOR ALL USING (public.check_is_admin(auth.uid()));
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL USING (public.check_is_admin(auth.uid()));

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON public.hero_slides(display_order);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON public.faqs(display_order);
