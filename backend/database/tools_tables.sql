CREATE TABLE tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_filename VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tools_sort_order ON tools(sort_order);

INSERT INTO tools (name, icon_filename, sort_order) VALUES
('Canva', 'canva-logo.png', 1),
('Capcut', 'capcut-logo.png', 2),
('Inshot', 'inshot-logo.png', 3),
('Freepik', 'freepik-logo.png', 4),
('Pixabay', 'pixabay-logo.png', 5),
('Notion', 'notion-logo.png', 6),
('Trello', 'trelo-logo.png', 7),
('Asana', 'asana-logo.png', 8),
('Metricool', 'metricool-logo.png', 9),
('Meta Business Suite', 'Meta-logo.png', 10),
('GDocs', 'gdoc-logo.png', 11),
('Google Sheets', 'gsheets-logo.png', 12),
('ChatGPT', 'chatgpt-logo.png', 13),
('Facebook', 'facebook-logo.png', 14),
('Instagram', 'instagram-logo.png', 15),
('Tiktok', 'tiktok-logo.png', 16);

CREATE POLICY "Admins can insert tools"
  ON tools
  FOR INSERT
  USING (auth.role() = 'admin');

CREATE POLICY "Admins can update tools"
  ON tools
  FOR UPDATE
  USING (auth.role() = 'admin');

CREATE POLICY "Admins can delete tools"
  ON tools
  FOR DELETE
  USING (auth.role() = 'admin');