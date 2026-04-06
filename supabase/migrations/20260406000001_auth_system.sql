-- Create Custom Role Enum
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Users Table (Public)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    role public.user_role DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Admin Whitelist Table
CREATE TABLE IF NOT EXISTS public.admin_whitelist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_whitelist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public.users
-- 1. Users can read their own profile
CREATE POLICY "Users can view own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

-- 2. Users can update their own profile (name only, role is protected)
CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 3. Admins have full access to all users
CREATE POLICY "Admins have full access to users" 
ON public.users FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- RLS Policies for public.admin_whitelist
-- 1. Only admins can view/manage whitelist
CREATE POLICY "Admins manage whitelist" 
ON public.admin_whitelist FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Trigger Function: Handle New User Registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
    is_whitelisted BOOLEAN;
    assigned_role public.user_role;
BEGIN
    -- Check if email is in whitelist
    SELECT EXISTS (
        SELECT 1 FROM public.admin_whitelist 
        WHERE email = NEW.email
    ) INTO is_whitelisted;

    -- Assign role: admin if whitelisted, otherwise user
    IF is_whitelisted THEN
        assigned_role := 'admin';
    ELSE
        assigned_role := 'user';
    END IF;

    -- Insert into public.users
    INSERT INTO public.users (id, name, email, role)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Vision IT User'), 
        NEW.email, 
        assigned_role
    )
    ON CONFLICT (id) DO UPDATE 
    SET 
        email = EXCLUDED.email,
        name = COALESCE(EXCLUDED.name, public.users.name);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Helper RPC: Check if email is whitelisted (for frontend check before sending OTP)
CREATE OR REPLACE FUNCTION public.is_admin_whitelisted(check_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_whitelist WHERE email = check_email
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
