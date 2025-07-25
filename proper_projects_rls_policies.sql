-- Re-enable RLS and create proper policies for projects table

-- First, re-enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to read all projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to insert projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to update projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to delete projects" ON projects;
DROP POLICY IF EXISTS "Allow all authenticated users to manage projects" ON projects;

-- Create new, working policies

-- 1. Allow anyone to read active projects (for public website)
CREATE POLICY "public_read_active_projects" ON projects
    FOR SELECT 
    USING (is_active = true);

-- 2. Allow authenticated users to read all projects (for admin)
CREATE POLICY "authenticated_read_all_projects" ON projects
    FOR SELECT 
    TO authenticated
    USING (true);

-- 3. Allow authenticated users to insert projects
CREATE POLICY "authenticated_insert_projects" ON projects
    FOR INSERT 
    TO authenticated
    WITH CHECK (true);

-- 4. Allow authenticated users to update projects
CREATE POLICY "authenticated_update_projects" ON projects
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Allow authenticated users to delete projects
CREATE POLICY "authenticated_delete_projects" ON projects
    FOR DELETE 
    TO authenticated
    USING (true);

-- Also ensure proper permissions are granted
GRANT SELECT ON projects TO anon;
GRANT ALL ON projects TO authenticated;

-- Check the policies were created correctly
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'projects'
ORDER BY policyname; 