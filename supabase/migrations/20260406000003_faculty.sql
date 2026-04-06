-- 1. Faculty Table
CREATE TABLE IF NOT EXISTS public.faculty (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  qualification TEXT,
  experience TEXT,
  specialization TEXT[],
  bio TEXT,
  image_url TEXT,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure missing columns exist in case table was created by older migration
ALTER TABLE public.faculty ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.faculty ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;

-- 2. Faculty Categories
CREATE TABLE IF NOT EXISTS public.faculty_categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Faculty-Category Mapping
CREATE TABLE IF NOT EXISTS public.faculty_category_mapping (
  faculty_id TEXT REFERENCES public.faculty(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES public.faculty_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (faculty_id, category_id)
);

-- 4. Enable RLS
ALTER TABLE IF EXISTS public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.faculty_categories ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'faculty' AND policyname = 'Everyone can view active faculty.') THEN
    CREATE POLICY "Everyone can view active faculty." ON public.faculty FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'faculty_categories' AND policyname = 'Everyone can view faculty categories.') THEN
    CREATE POLICY "Everyone can view faculty categories." ON public.faculty_categories FOR SELECT USING (true);
  END IF;
END $$;
