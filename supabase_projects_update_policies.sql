-- Add specific UPDATE, INSERT, and DELETE policies for projects table
-- Run this in your Supabase SQL editor

-- First, let's drop the broad "ALL" policy and create specific ones
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;

-- Create specific policies for authenticated users
CREATE POLICY "Allow authenticated users to insert projects" ON projects
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update projects" ON projects
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete projects" ON projects
    FOR DELETE 
    USING (auth.uid() IS NOT NULL);

-- Also create a separate SELECT policy for authenticated users to see all projects (including inactive ones)
CREATE POLICY "Allow authenticated users to read all projects" ON projects
    FOR SELECT 
    USING (auth.uid() IS NOT NULL);

-- Make sure the public SELECT policy only shows active projects
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
CREATE POLICY "Allow public read access to projects" ON projects
    FOR SELECT 
    USING (is_active = true); 