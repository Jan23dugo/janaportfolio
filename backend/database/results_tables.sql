-- Results Database Schema
-- This file contains the SQL to create the results table and related structures

-- Create results table
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Before & After',
    description TEXT,
    before_image VARCHAR(500) NOT NULL,
    after_image VARCHAR(500) NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_results_active ON results(is_active);
CREATE INDEX IF NOT EXISTS idx_results_order ON results(display_order);

-- Insert sample data based on the current Results.js structure
INSERT INTO results (title, description, before_image, after_image, display_order) VALUES
('Social Media Transformation 1', 'Complete brand transformation showcasing before and after results', '/assets/Results/BEFORE (1).png', '/assets/Results/AFTER (1).png', 1),
('Social Media Transformation 2', 'Visual content improvement and engagement optimization', '/assets/Results/BEFORE (3).png', '/assets/Results/AFTER (3).png', 2),
('Social Media Transformation 3', 'Brand consistency and aesthetic enhancement', '/assets/Results/BEFORE (2).png', '/assets/Results/AFTER (2).png', 3)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view active results)
CREATE POLICY "Allow public read access to results" ON results
    FOR SELECT USING (is_active = true);

-- Create policies for authenticated admin users (full CRUD access)
CREATE POLICY "Allow authenticated users to read all results" ON results
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert results" ON results
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update results" ON results
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete results" ON results
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_results_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_results_updated_at 
    BEFORE UPDATE ON results 
    FOR EACH ROW 
    EXECUTE FUNCTION update_results_updated_at(); 