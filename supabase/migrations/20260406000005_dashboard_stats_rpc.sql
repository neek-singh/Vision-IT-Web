-- Dashboard Stats Aggregation RPC

-- This function returns all dashboard counts in a single database call for maximum performance.
CREATE OR REPLACE FUNCTION public.get_dashboard_summary()
RETURNS TABLE(
    total_admissions BIGINT,
    total_blogs BIGINT,
    unread_inquiries BIGINT,
    total_courses BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM public.admissions)::BIGINT,
        (SELECT COUNT(*) FROM public.blogs)::BIGINT,
        (SELECT COUNT(*) FROM public.contact_messages WHERE status = 'unread')::BIGINT,
        (SELECT COUNT(*) FROM public.courses)::BIGINT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant access to authenticated users (Admins)
GRANT EXECUTE ON FUNCTION public.get_dashboard_summary() TO authenticated;
