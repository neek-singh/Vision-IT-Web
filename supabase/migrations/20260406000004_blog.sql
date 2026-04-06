-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Blog Categories
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID REFERENCES public.profiles(id),
  category_id INTEGER REFERENCES public.blog_categories(id),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- 3. Enable RLS
ALTER TABLE IF EXISTS public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_categories' AND policyname = 'Everyone can view blog categories.') THEN
    CREATE POLICY "Everyone can view blog categories." ON public.blog_categories FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Everyone can view published blog posts.') THEN
    CREATE POLICY "Everyone can view published blog posts." ON public.blog_posts FOR SELECT USING (is_published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Admins can view all blog posts.') THEN
    CREATE POLICY "Admins can view all blog posts." ON public.blog_posts FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;
END $$;
