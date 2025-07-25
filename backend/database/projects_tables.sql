-- Projects Database Schema
-- This file contains the SQL to create the projects table and related structures

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_path VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'FEED LAYOUT',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order);

-- Insert sample data based on the current Projects.js structure
INSERT INTO projects (title, description, image_path, category, display_order) VALUES
('Feed Layout 1', '', '/assets/SampleWorks/feedlayout1.png', 'FEED LAYOUT', 1),
('Aesthetic Buildings', '', '/assets/SampleWorks/feedlayout2.png', 'FEED LAYOUT', 2),
('Curved Modern Architecture', 'Gallery', '/assets/SampleWorks/feedlayout3.png', 'FEED LAYOUT', 3),
('Abstract Angles', '', '/assets/Graphics/graphics1.png', 'GRAPHICS', 4),
('Minimalist Tower', 'Link', '/assets/Graphics/graphics2.png', 'GRAPHICS', 5),
('White Lines', 'Image', '/assets/Graphics/graphics3.png', 'GRAPHICS', 6),
('Urban Minimalism', '', '/assets/SampleWorks/feedlayout4.png', 'FEED LAYOUT', 7),
('Symmetry in Design', '', '/assets/SampleWorks/feedlayout5.png', 'FEED LAYOUT', 8),
('Modern Facade', '', '/assets/SampleWorks/feedlayout6.png', 'FEED LAYOUT', 9),
('Geometric Patterns', '', '/assets/SampleWorks/feedlayout7.png', 'FEED LAYOUT', 10),
('Blue Skies', '', '/assets/SampleWorks/feedlayout8.png', 'FEED LAYOUT', 11),
('Sky High', 'Gallery', '/assets/Graphics/graphics4.png', 'GRAPHICS', 12),
('Sky High', 'Gallery', '/assets/Graphics/graphics5.png', 'GRAPHICS', 13),
('Sky High', 'Gallery', '/assets/Graphics/graphics6.png', 'GRAPHICS', 14),
('Sky High', 'Gallery', '/assets/Graphics/graphics7.png', 'GRAPHICS', 15),
('Sky High', 'Gallery', '/assets/Graphics/graphics8.png', 'GRAPHICS', 16),
('Sky High', 'Gallery', '/assets/Graphics/graphics9.png', 'GRAPHICS', 17),
('Sky High', 'Gallery', '/assets/Graphics/graphics10.png', 'GRAPHICS', 18),
('Sky High', 'Gallery', '/assets/Graphics/graphics11.png', 'GRAPHICS', 19)
ON CONFLICT (id) DO NOTHING;

-- Create categories table for better category management
CREATE TABLE IF NOT EXISTS project_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO project_categories (name, display_name) VALUES
('ALL', 'All'),
('FEED LAYOUT', 'FEED LAYOUT'),
('GRAPHICS', 'GRAPHICS')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to project_categories" ON project_categories
    FOR SELECT USING (true);

-- Create policies for authenticated users (for admin functionality)
CREATE POLICY "Allow authenticated users to manage projects" ON projects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage categories" ON project_categories
    FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 