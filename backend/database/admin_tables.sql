-- Admin Users Table
-- This table stores admin user information and links to Supabase auth users
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Sessions Table (optional - for tracking admin activity)
CREATE TABLE IF NOT EXISTS admin_sessions (
    id SERIAL PRIMARY KEY,
    admin_user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    logout_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_user_id ON admin_sessions(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_is_active ON admin_sessions(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users 
        WHERE user_id = user_uuid 
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get current user's admin info
CREATE OR REPLACE FUNCTION get_current_admin()
RETURNS TABLE(
    id INTEGER,
    email VARCHAR,
    full_name VARCHAR,
    role VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.id,
        au.email,
        au.full_name,
        au.role
    FROM admin_users au
    WHERE au.user_id = auth.uid()
    AND au.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin Users Policies
CREATE POLICY "Admin users can view their own record" ON admin_users
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Only super admins can view all admin users" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE user_id = auth.uid() 
            AND role = 'super_admin' 
            AND is_active = true
        )
    );

CREATE POLICY "Admin users can update their own profile" ON admin_users
    FOR UPDATE USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Admin Sessions Policies
CREATE POLICY "Admin users can view their own sessions" ON admin_sessions
    FOR SELECT USING (
        admin_user_id IN (
            SELECT id FROM admin_users WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admin users can insert their own sessions" ON admin_sessions
    FOR INSERT WITH CHECK (
        admin_user_id IN (
            SELECT id FROM admin_users WHERE user_id = auth.uid()
        )
    );

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    icon_name VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Services Policies
CREATE POLICY "Allow public read access to services" ON services
    FOR SELECT USING (true);

CREATE POLICY "Allow admin insert on services" ON services
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Allow admin update on services" ON services
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Allow admin delete on services" ON services
    FOR DELETE USING (is_admin(auth.uid()));

-- Create index for services ordering
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);

-- Insert initial services data
INSERT INTO services (icon_name, title, description, display_order, is_active) VALUES
('LaptopMac', 'Social Media Management', 'Complete handling of social media accounts, including planning, posting, and growth strategies.', 0, true),
('Insights', 'Market Research', 'Research on audience interests and competitor activity to guide effective content and strategy.', 1, true),
('Search', 'Social Media Audit', 'A full review of current social media pages to identify strengths, weaknesses, and improvement areas.', 2, true),
('Tune', 'Page Optimization', 'Updating and improving profiles to look more professional and attract the right audience.', 3, true),
('EventNote', 'Monthly Content Calendar', 'A full month of content planned in advance, aligned with business goals and key dates.', 4, true),
('VideoLibrary', 'Basic Video Editing', 'Simple, polished edits that improve video quality and make content more engaging.', 5, true),
('Brush', 'Graphic Design', 'Custom graphics designed to match brand style and catch attention on social feeds.', 6, true),
('EditNote', 'Content Curation & Caption Writing', 'Relevant content selected and paired with well-written captions tailored to the brand voice.', 7, true),
('Schedule', 'Content Scheduling & Publishing', 'Posts scheduled and published at optimal times for better reach and consistency.', 8, true),
('Forum', 'Community Engagement', 'Responding to comments and messages to keep followers engaged and connected.', 9, true),
('BarChart', 'Data Analytics', 'Clear reports on page performance to track growth and adjust strategies as needed.', 10, true)
ON CONFLICT (id) DO NOTHING;

-- Update home_content policies to use admin check
DROP POLICY IF EXISTS "Allow authenticated update on home_content" ON home_content;
CREATE POLICY "Allow admin update on home_content" ON home_content
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Allow admin insert on home_content" ON home_content
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Allow admin delete on home_content" ON home_content
    FOR DELETE USING (is_admin(auth.uid()));

-- Update home_analytics policies to use admin check
DROP POLICY IF EXISTS "Allow authenticated update on home_analytics" ON home_analytics;
DROP POLICY IF EXISTS "Allow authenticated insert on home_analytics" ON home_analytics;

CREATE POLICY "Allow admin insert on home_analytics" ON home_analytics
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Allow admin update on home_analytics" ON home_analytics
    FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Allow admin delete on home_analytics" ON home_analytics
    FOR DELETE USING (is_admin(auth.uid()));

-- Function to create an admin user (call this after a user signs up)
CREATE OR REPLACE FUNCTION create_admin_user(
    user_email VARCHAR,
    user_full_name VARCHAR DEFAULT NULL,
    user_role VARCHAR DEFAULT 'admin'
)
RETURNS INTEGER AS $$
DECLARE
    user_uuid UUID;
    admin_id INTEGER;
BEGIN
    -- Get the user UUID from auth.users table
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = user_email;
    
    IF user_uuid IS NULL THEN
        RAISE EXCEPTION 'User with email % not found in auth.users', user_email;
    END IF;
    
    -- Insert into admin_users table
    INSERT INTO admin_users (user_id, email, full_name, role)
    VALUES (user_uuid, user_email, user_full_name, user_role)
    RETURNING id INTO admin_id;
    
    RETURN admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment visit count for analytics
CREATE OR REPLACE FUNCTION increment_visit_count(visit_date DATE)
RETURNS VOID AS $$
BEGIN
    INSERT INTO home_analytics (date, visit_count)
    VALUES (visit_date, 1)
    ON CONFLICT (date)
    DO UPDATE SET visit_count = home_analytics.visit_count + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert your first admin user (replace with your actual email)
-- Uncomment and modify the line below after creating your Supabase auth user:
-- SELECT create_admin_user('your-admin-email@example.com', 'Your Full Name', 'super_admin'); 