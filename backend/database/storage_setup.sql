-- Enable Row Level Security for storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create buckets for different sections
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('home-backgrounds', 'home-backgrounds', true),
    ('about-images', 'about-images', true),
    ('project-images', 'project-images', true),
    ('service-images', 'service-images', true),
    ('results-images', 'results-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access home-backgrounds" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload home-backgrounds" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own home-backgrounds" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own home-backgrounds" ON storage.objects;

DROP POLICY IF EXISTS "Public Access about-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload about-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own about-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own about-images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own project-images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access service-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload service-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own service-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own service-images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access results-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload results-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own results-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own results-images" ON storage.objects;

DROP POLICY IF EXISTS "Public Access feedback-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload feedback-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own feedback-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own feedback-images" ON storage.objects;

-- Create a single policy for public access to all buckets
CREATE POLICY "Allow public viewing of all images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id IN (
    'home-backgrounds',
    'about-images',
    'project-images',
    'service-images',
    'results-images',
    'feedback-images'
));

-- Create a single policy for authenticated users to upload to any bucket
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN (
    'home-backgrounds',
    'about-images',
    'project-images',
    'service-images',
    'results-images',
    'feedback-images'
));

-- Create a single policy for authenticated users to update their own images
CREATE POLICY "Allow authenticated users to update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (auth.uid() = owner)
WITH CHECK (bucket_id IN (
    'home-backgrounds',
    'about-images',
    'project-images',
    'service-images',
    'results-images',
    'feedback-images'
));

-- Create a single policy for authenticated users to delete their own images
CREATE POLICY "Allow authenticated users to delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (auth.uid() = owner);

-- Function to clean up old images (optional, can be used later)
CREATE OR REPLACE FUNCTION cleanup_unused_images()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Add cleanup logic here when needed
    -- This can be implemented later when we have the relations between
    -- images and content tables
    NULL;
END;
$$; 