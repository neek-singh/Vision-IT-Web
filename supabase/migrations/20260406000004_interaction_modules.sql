-- Interaction Modules & Config Migration: Testimonials, Blogs, Contact Messages, Admin Config

-- 1. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    course TEXT,
    content TEXT NOT NULL,
    avatar TEXT,
    rating INTEGER DEFAULT 5,
    year TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    date TEXT,
    author TEXT,
    category TEXT,
    read_time TEXT,
    image TEXT,
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    course TEXT,
    message TEXT,
    status TEXT DEFAULT 'unread' NOT NULL, -- 'unread', 'read', 'replied'
    is_starred BOOLEAN DEFAULT false,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Admin Config Table
CREATE TABLE IF NOT EXISTS public.admin_config (
    id TEXT PRIMARY KEY, -- 'main_config'
    email TEXT,
    initialized_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

-- Grant Permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT SELECT ON public.blogs TO anon, authenticated;
GRANT SELECT ON public.admin_config TO anon, authenticated;
GRANT INSERT ON public.contact_messages TO anon, authenticated; -- Public can insert contact messages

-- Admin Management Permissions (Full Access)
GRANT ALL ON public.testimonials TO authenticated;
GRANT ALL ON public.blogs TO authenticated;
GRANT ALL ON public.contact_messages TO authenticated;
GRANT ALL ON public.admin_config TO authenticated;

-- RLS Policies (Read Access for Public)
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published blogs" ON public.blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL USING (public.check_is_admin(auth.uid()));
CREATE POLICY "Admins manage blogs" ON public.blogs FOR ALL USING (public.check_is_admin(auth.uid()));
CREATE POLICY "Admins manage contact messages" ON public.contact_messages FOR ALL USING (public.check_is_admin(auth.uid()));
CREATE POLICY "Admins manage config" ON public.admin_config FOR ALL USING (public.check_is_admin(auth.uid()));

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON public.testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(is_featured);
CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_mobile ON public.contact_messages(mobile);
