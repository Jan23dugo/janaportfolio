-- Complete RLS policies for projects and project_categories tables
-- Run this in your Supabase SQL editor

-- =============================================
-- PROJECTS TABLE POLICIES
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;

-- Public can read only active projects
CREATE POLICY "Allow public read access to projects" ON projects
    FOR SELECT 
    USING (is_active = true);

-- Authenticated users can read all projects (including inactive ones for admin)
CREATE POLICY "Allow authenticated users to read all projects" ON projects
    FOR SELECT 
    USING (auth.uid() IS NOT NULL);

-- Authenticated users can insert projects
CREATE POLICY "Allow authenticated users to insert projects" ON projects
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update projects
CREATE POLICY "Allow authenticated users to update projects" ON projects
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can delete projects
CREATE POLICY "Allow authenticated users to delete projects" ON projects
    FOR DELETE 
    USING (auth.uid() IS NOT NULL);

-- =============================================
-- PROJECT_CATEGORIES TABLE POLICIES
-- =============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage categories" ON project_categories;
DROP POLICY IF EXISTS "Allow public read access to project_categories" ON project_categories;

-- Public can read only active categories
CREATE POLICY "Allow public read access to project_categories" ON project_categories
    FOR SELECT 
    USING (is_active = true);

-- Authenticated users can read all categories (including inactive ones for admin)
CREATE POLICY "Allow authenticated users to read all categories" ON project_categories
    FOR SELECT 
    USING (auth.uid() IS NOT NULL);

-- Authenticated users can insert categories
CREATE POLICY "Allow authenticated users to insert categories" ON project_categories
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update categories
CREATE POLICY "Allow authenticated users to update categories" ON project_categories
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can delete categories
CREATE POLICY "Allow authenticated users to delete categories" ON project_categories
    FOR DELETE 
    USING (auth.uid() IS NOT NULL); 