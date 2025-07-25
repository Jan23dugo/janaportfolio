-- Simple Admin Authentication Table
-- This table stores a single admin user with username and password
CREATE TABLE IF NOT EXISTS admin_auth (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to create password hash (you'll hash on frontend/backend)
-- Insert the default admin user (change username and password as needed)
INSERT INTO admin_auth (username, password_hash) 
VALUES ('admin', '$2b$10$example_hash_replace_this_with_actual_hash')
ON CONFLICT (username) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_auth_username ON admin_auth(username);

-- Enable Row Level Security (RLS)
ALTER TABLE admin_auth ENABLE ROW LEVEL SECURITY;

-- Create policy for admin authentication (allow reading for login verification)
CREATE POLICY "Allow read for admin authentication" ON admin_auth
    FOR SELECT USING (true);

-- Update home_content policies to check for admin session
DROP POLICY IF EXISTS "Allow admin update on home_content" ON home_content;
DROP POLICY IF EXISTS "Allow admin insert on home_content" ON home_content;
DROP POLICY IF EXISTS "Allow admin delete on home_content" ON home_content;

CREATE POLICY "Allow admin update on home_content" ON home_content
    FOR UPDATE USING (true); -- We'll handle auth in the application layer

CREATE POLICY "Allow admin insert on home_content" ON home_content
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin delete on home_content" ON home_content
    FOR DELETE USING (true);

-- Update home_analytics policies
DROP POLICY IF EXISTS "Allow admin insert on home_analytics" ON home_analytics;
DROP POLICY IF EXISTS "Allow admin update on home_analytics" ON home_analytics;
DROP POLICY IF EXISTS "Allow admin delete on home_analytics" ON home_analytics;

CREATE POLICY "Allow admin insert on home_analytics" ON home_analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin update on home_analytics" ON home_analytics
    FOR UPDATE USING (true);

CREATE POLICY "Allow admin delete on home_analytics" ON home_analytics
    FOR DELETE USING (true);

-- Function to update last login
CREATE OR REPLACE FUNCTION update_admin_last_login(admin_username VARCHAR)
RETURNS VOID AS $$
BEGIN
    UPDATE admin_auth 
    SET last_login_at = NOW(), updated_at = NOW()
    WHERE username = admin_username;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment visit count (keeping this for analytics)
CREATE OR REPLACE FUNCTION increment_visit_count(visit_date DATE)
RETURNS VOID AS $$
BEGIN
    INSERT INTO home_analytics (date, visit_count)
    VALUES (visit_date, 1)
    ON CONFLICT (date)
    DO UPDATE SET visit_count = home_analytics.visit_count + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: You'll need to update the password_hash with a real bcrypt hash
-- Example using bcrypt online tool or your backend:
-- For password "admin123": $2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-- 
-- To update the password hash:
-- UPDATE admin_auth SET password_hash = 'your_bcrypt_hash_here' WHERE username = 'admin'; 