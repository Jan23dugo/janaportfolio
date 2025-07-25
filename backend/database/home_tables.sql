-- Home Content Table
-- This table stores the dynamic content for the home page
CREATE TABLE IF NOT EXISTS home_content (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL DEFAULT 'YOU FOCUS ON YOUR BUSINESS. I''LL BUILD YOUR BRAND ONLINE',
    name VARCHAR(100) NOT NULL DEFAULT 'Jana Virtuales',
    title VARCHAR(100) NOT NULL DEFAULT 'Social Media Manager',
    background_image VARCHAR(255) DEFAULT 'homebg.jpg',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Home Analytics Table  
-- This table tracks daily visitor counts for analytics
CREATE TABLE IF NOT EXISTS home_analytics (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    visit_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial home content data
INSERT INTO home_content (quote, name, title, background_image) 
VALUES (
    'YOU FOCUS ON YOUR BUSINESS. I''LL BUILD YOUR BRAND ONLINE',
    'Jana Virtuales',
    'Social Media Manager',
    'homebg.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_home_analytics_date ON home_analytics(date);
CREATE INDEX IF NOT EXISTS idx_home_content_updated_at ON home_content(updated_at);

-- Enable Row Level Security (RLS) for security
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on home_content" ON home_content
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on home_analytics" ON home_analytics
    FOR SELECT USING (true);

-- Create policies for authenticated users to update (for admin functionality)
CREATE POLICY "Allow authenticated update on home_content" ON home_content
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on home_analytics" ON home_analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on home_analytics" ON home_analytics
    FOR UPDATE USING (true); 

-- Create about_content table
CREATE TABLE IF NOT EXISTS about_content (
    id SERIAL PRIMARY KEY,
    headline TEXT NOT NULL DEFAULT 'I''m a self-driven Social Media Manager helping beauty, health, and wellness brands rise above the noise and attract the right clients!',
    subheadline TEXT NOT NULL DEFAULT 'From content that connects to growth tactics that actually work, everything I do is guided by one goal: to help your business grow with purpose without you wasting time and effort.',
    profile_image TEXT NOT NULL DEFAULT 'aboutpic.png',
    honest_title TEXT NOT NULL DEFAULT 'Let''s Be Honest...',
    honest_text_1 TEXT NOT NULL DEFAULT 'Running your business is overwhelming. You can''t do everything all at once, and the sooner you realize that, the better.',
    honest_text_2 TEXT NOT NULL DEFAULT 'Building your social media takes time, strategy, and consistency. Without the right help, you''re leaving growth, visibility, and potential clients on the table.',
    honest_text_3 TEXT NOT NULL DEFAULT 'You don''t have to do it all. You just need the right support. It''s time to move smart.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default about content if not exists
INSERT INTO about_content (id, headline, subheadline, profile_image, honest_title, honest_text_1, honest_text_2, honest_text_3)
SELECT 1,
       'I''m a self-driven Social Media Manager helping beauty, health, and wellness brands rise above the noise and attract the right clients!',
       'From content that connects to growth tactics that actually work, everything I do is guided by one goal: to help your business grow with purpose without you wasting time and effort.',
       'aboutpic.png',
       'Let''s Be Honest...',
       'Running your business is overwhelming. You can''t do everything all at once, and the sooner you realize that, the better.',
       'Building your social media takes time, strategy, and consistency. Without the right help, you''re leaving growth, visibility, and potential clients on the table.',
       'You don''t have to do it all. You just need the right support. It''s time to move smart.'
WHERE NOT EXISTS (SELECT 1 FROM about_content WHERE id = 1);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_about_content_updated_at
    BEFORE UPDATE ON about_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 