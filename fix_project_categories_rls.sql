-- Fix RLS policies for project_categories table

-- Re-enable RLS
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to project_categories" ON project_categories;
DROP POLICY IF EXISTS "Allow authenticated users to read all categories" ON project_categories;
DROP POLICY IF EXISTS "Allow authenticated users to insert categories" ON project_categories;
DROP POLICY IF EXISTS "Allow authenticated users to update categories" ON project_categories;
DROP POLICY IF EXISTS "Allow authenticated users to delete categories" ON project_categories;

-- Create new policies
CREATE POLICY "public_read_active_categories" ON project_categories
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "authenticated_read_all_categories" ON project_categories
    FOR SELECT 
    TO authenticated
    USING (true);

CREATE POLICY "authenticated_insert_categories" ON project_categories
    FOR INSERT 
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "authenticated_update_categories" ON project_categories
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "authenticated_delete_categories" ON project_categories
    FOR DELETE 
    TO authenticated
    USING (true);

-- Grant permissions
GRANT SELECT ON project_categories TO anon;
GRANT ALL ON project_categories TO authenticated; 