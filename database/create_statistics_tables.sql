-- Create placement_stats table
CREATE TABLE IF NOT EXISTS placement_stats (
  id SERIAL PRIMARY KEY,
  students_placed INTEGER NOT NULL,
  companies_visited INTEGER NOT NULL,
  highest_package DECIMAL(10, 2) NOT NULL,
  placement_percent INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create year_stats table
CREATE TABLE IF NOT EXISTS year_stats (
  id SERIAL PRIMARY KEY,
  year INTEGER UNIQUE NOT NULL,
  total_students INTEGER NOT NULL,
  students_placed INTEGER NOT NULL,
  highest_package DECIMAL(10, 2) NOT NULL,
  avg_package DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recruiters table
CREATE TABLE IF NOT EXISTS recruiters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  offers INTEGER NOT NULL,
  package DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO placement_stats (students_placed, companies_visited, highest_package, placement_percent)
VALUES (12500, 500, 60, 96)
ON CONFLICT DO NOTHING;

INSERT INTO year_stats (year, total_students, students_placed, highest_package, avg_package)
VALUES 
  (2024, 480, 456, 45, 11),
  (2025, 500, 480, 50, 12),
  (2026, 520, 498, 60, 15)
ON CONFLICT (year) DO NOTHING;

INSERT INTO recruiters (name, offers, package)
VALUES 
  ('Amazon', 45, 44),
  ('Microsoft', 38, 50),
  ('Google', 25, 60),
  ('Salesforce', 32, 25),
  ('Adobe', 28, 35),
  ('Flipkart', 42, 30)
ON CONFLICT (name) DO NOTHING;
