-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    status VARCHAR(20) DEFAULT 'Published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample pages
INSERT INTO pages (title, slug, content, status) VALUES
('About JNTUK', 'about-jntuk', 'Jawaharlal Nehru Technological University Kakinada is a premier institution dedicated to technical education and placement excellence.', 'Published'),
('Placement Process', 'placement-process', 'Our placement process includes pre-placement talks, online assessments, technical interviews, and HR rounds.', 'Published'),
('Student Resources', 'student-resources', 'Access to interview preparation materials, coding resources, and placement guidelines.', 'Published')
ON CONFLICT (slug) DO NOTHING;
