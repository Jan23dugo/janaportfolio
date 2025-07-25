-- Run this query in your Supabase SQL editor to see the current projects data
SELECT id, title, image_path, category, is_active, display_order 
FROM projects 
ORDER BY display_order;

-- Also check if there are any projects at all
SELECT COUNT(*) as total_projects FROM projects;

-- Check project categories
SELECT * FROM project_categories WHERE is_active = true; 