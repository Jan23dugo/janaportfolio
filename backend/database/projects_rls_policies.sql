-- Updated RLS Policies for Projects Tables
-- This file contains the Row Level Security policies for projects and project_categories tables

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
DROP POLICY IF EXISTS "Allow public read access to project_categories" ON project_categories;
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to manage categories" ON project_categories;

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view active projects)
CREATE POLICY "Allow public read access to projects" ON projects
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access to project_categories" ON project_categories
    FOR SELECT USING (is_active = true);

-- Create policies for authenticated admin users (full CRUD access)
-- This allows any authenticated user to manage projects (you can make this more restrictive later)
CREATE POLICY "Allow authenticated users to read all projects" ON projects
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update projects" ON projects
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete projects" ON projects
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- Similar policies for project_categories
CREATE POLICY "Allow authenticated users to read all categories" ON project_categories
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert categories" ON project_categories
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update categories" ON project_categories
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete categories" ON project_categories
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- Grant necessary permissions to authenticated users
GRANT SELECT ON projects TO authenticated;
GRANT INSERT ON projects TO authenticated;
GRANT UPDATE ON projects TO authenticated;
GRANT DELETE ON projects TO authenticated;

GRANT SELECT ON project_categories TO authenticated;
GRANT INSERT ON project_categories TO authenticated;
GRANT UPDATE ON project_categories TO authenticated;
GRANT DELETE ON project_categories TO authenticated;

-- Grant select permissions to anonymous users (for public viewing)
GRANT SELECT ON projects TO anon;
GRANT SELECT ON project_categories TO anon;

-- Grant usage on sequences
GRANT USAGE ON SEQUENCE projects_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE project_categories_id_seq TO authenticated; 