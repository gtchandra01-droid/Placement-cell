-- Insert default admin user
-- Email: admin@jntuk.edu.in
-- Password: admin123
INSERT INTO admins (name, email, password, role) VALUES (
  'Admin User',
  'admin@jntuk.edu.in',
  '$2b$10$p0EYM.9XcKlZZHniJwYG4OF7Tr7vH1ohg6OqbtTIIeGsC9dbw8yaS',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample companies
INSERT INTO companies (name, sector, location, logo_url) VALUES
('TCS', 'IT Services', 'Hyderabad', 'https://logos-world.net/wp-content/uploads/2020/04/TCS-Logo.png'),
('Infosys', 'IT Services', 'Bangalore', 'https://static.vecteezy.com/system/resources/previews/020/336/451/non_2x/infosys-logo-infosys-icon-free-free-vector.jpg'),
('Wipro', 'IT Services', 'Pune', 'https://vectorseek.com/wp-content/uploads/2023/04/Wipro-Logo-Vector.jpg'),
('HCL Technologies', 'IT Services', 'Noida', 'https://logos-world.net/wp-content/uploads/2022/07/HCL-Technologies-Symbol.png'),
('Cognizant', 'IT Services', 'Chennai', 'https://companieslogo.com/img/orig/CTSH-82a8444b.png?t=1720244491'),
('Accenture', 'Consulting', 'Mumbai', 'https://logos-world.net/wp-content/uploads/2020/06/Accenture-Emblem.png')
ON CONFLICT DO NOTHING;

-- Insert sample placement drives
INSERT INTO placement_drives (company_id, drive_date, package_lpa, role) VALUES
(1, '2026-03-15', 12, 'Software Developer'),
(2, '2026-03-20', 11, 'Systems Engineer'),
(3, '2026-03-25', 10, 'Project Engineer'),
(4, '2026-04-01', 9, 'Associate Engineer'),
(5, '2026-04-05', 10, 'Programmer Analyst'),
(6, '2026-04-10', 11, 'Associate Software Engineer')
ON CONFLICT DO NOTHING;

-- Insert sample placement stats
INSERT INTO placement_stats (year, total_students, students_placed, highest_package, avg_package, companies_visited) VALUES
(2024, 2500, 2400, 42, 12, 320),
(2023, 2350, 2200, 40, 11, 300),
(2022, 2200, 2000, 38, 11, 280)
ON CONFLICT (year) DO NOTHING;
