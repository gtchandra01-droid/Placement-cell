-- Create branch_placements table
CREATE TABLE IF NOT EXISTS branch_placements (
  id SERIAL PRIMARY KEY,
  branch_name VARCHAR(100) NOT NULL UNIQUE,
  total_students INTEGER NOT NULL DEFAULT 0,
  students_placed INTEGER NOT NULL DEFAULT 0,
  highest_package DECIMAL(10, 2) NOT NULL DEFAULT 0,
  avg_package DECIMAL(10, 2) NOT NULL DEFAULT 0,
  placement_percent DECIMAL(5, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_branch_placements_branch_name ON branch_placements(branch_name);

-- Insert default branches
INSERT INTO branch_placements (branch_name, total_students, students_placed, highest_package, avg_package, placement_percent)
VALUES 
  ('Computer Science & Engineering', 120, 115, 12.5, 8.2, 95.83),
  ('Electronics & Communication Engineering', 100, 92, 11.8, 7.5, 92.00),
  ('Electrical & Electronics Engineering', 90, 78, 10.5, 6.8, 86.67),
  ('Mechanical Engineering', 110, 95, 9.8, 6.2, 86.36),
  ('Civil Engineering', 80, 65, 8.5, 5.5, 81.25)
ON CONFLICT (branch_name) DO NOTHING;
