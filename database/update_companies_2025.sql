-- JNTUK Placement Database Update Script - 2026
-- This script updates all company data with recent hiring companies

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM placements;
-- DELETE FROM placement_drives;
-- DELETE FROM companies;

-- Insert/Update recent hiring companies with complete details
INSERT INTO companies (name, sector, location, logo_url, registration_link) VALUES
-- Tech Giants
('Amazon', 'E-commerce/Cloud', 'Hyderabad, India', 'https://logo.clearbit.com/amazon.com', 'https://amazon.jobs/en/teams/university-recruiting'),
('Microsoft', 'Technology', 'Hyderabad, India', 'https://logo.clearbit.com/microsoft.com', 'https://careers.microsoft.com/students/us/en/university-recruiting'),
('Google', 'Technology', 'Bangalore, India', 'https://logo.clearbit.com/google.com', 'https://careers.google.com/students/'),
('Meta', 'Social Media', 'Bangalore, India', 'https://logo.clearbit.com/meta.com', 'https://www.metacareers.com/students/'),
('Apple', 'Technology', 'Bangalore, India', 'https://logo.clearbit.com/apple.com', 'https://jobs.apple.com/en-in/search?location=india-INDIND'),

-- Cloud & Enterprise
('Salesforce', 'Cloud Computing', 'Hyderabad, India', 'https://logo.clearbit.com/salesforce.com', 'https://salesforce.wd1.myworkdayjobs.com/External_Career_Site'),
('Adobe', 'Software', 'Bangalore, India', 'https://logo.clearbit.com/adobe.com', 'https://adobe.wd5.myworkdayjobs.com/external_university'),
('Oracle', 'Database Technology', 'Bangalore, India', 'https://logo.clearbit.com/oracle.com', 'https://www.oracle.com/corporate/careers/students-grads/'),
('IBM', 'Technology', 'Bangalore, India', 'https://logo.clearbit.com/ibm.com', 'https://www.ibm.com/careers/university/'),
('VMware', 'Cloud Infrastructure', 'Bangalore, India', 'https://logo.clearbit.com/vmware.com', 'https://careers.vmware.com/campus'),

-- Indian E-commerce & Startups
('Flipkart', 'E-commerce', 'Bangalore, India', 'https://logo.clearbit.com/flipkart.com', 'https://www.flipkartcareers.com/#!/campus-hiring'),
('Paytm', 'Fintech', 'Noida, India', 'https://logo.clearbit.com/paytm.com', 'https://jobs.paytm.com/campus-hiring'),
('Zomato', 'Food Tech', 'Gurgaon, India', 'https://logo.clearbit.com/zomato.com', 'https://www.zomato.com/careers/campus'),
('Swiggy', 'Food Delivery', 'Bangalore, India', 'https://logo.clearbit.com/swiggy.com', 'https://careers.swiggy.com/campus-hiring'),
('Razorpay', 'Fintech', 'Bangalore, India', 'https://logo.clearbit.com/razorpay.com', 'https://razorpay.com/jobs/campus-hiring'),

-- Traditional IT Services
('TCS', 'IT Services', 'Multiple Locations', 'https://logo.clearbit.com/tcs.com', 'https://careers.tcs.com/campus-hiring'),
('Infosys', 'IT Services', 'Bangalore, India', 'https://logo.clearbit.com/infosys.com', 'https://careers.infosys.com/campus-connect'),
('Wipro', 'IT Services', 'Bangalore, India', 'https://logo.clearbit.com/wipro.com', 'https://careers.wipro.com/campus-recruitment'),
('HCL Technologies', 'IT Services', 'Noida, India', 'https://logo.clearbit.com/hcl.com', 'https://www.hcltech.com/careers/campus-connect'),
('Tech Mahindra', 'IT Services', 'Pune, India', 'https://logo.clearbit.com/techmahindra.com', 'https://careers.techmahindra.com/campus-hiring'),

-- Consulting & Services
('Accenture', 'IT Consulting', 'Multiple Locations', 'https://logo.clearbit.com/accenture.com', 'https://www.accenture.com/in-en/careers/campus-recruiting'),
('Deloitte', 'Consulting', 'Multiple Locations', 'https://logo.clearbit.com/deloitte.com', 'https://www2.deloitte.com/in/en/pages/careers/articles/campus-recruitment.html'),
('Capgemini', 'IT Consulting', 'Mumbai, India', 'https://logo.clearbit.com/capgemini.com', 'https://www.capgemini.com/careers/your-career/campus-recruitment/'),
('Cognizant', 'IT Services', 'Multiple Locations', 'https://logo.clearbit.com/cognizant.com', 'https://careers.cognizant.com/campus'),
('EY', 'Consulting', 'Multiple Locations', 'https://logo.clearbit.com/ey.com', 'https://www.ey.com/en_in/careers/students')

ON CONFLICT (name) DO UPDATE SET
  sector = EXCLUDED.sector,
  location = EXCLUDED.location,
  logo_url = EXCLUDED.logo_url,
  registration_link = EXCLUDED.registration_link;

-- Insert recent placement drives for 2026
INSERT INTO placement_drives (company_id, drive_date, package_lpa, role) VALUES
-- High-paying tech companies
((SELECT id FROM companies WHERE name = 'Google'), '2026-02-10', 60, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Microsoft'), '2026-02-15', 50, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Amazon'), '2026-02-20', 44, 'SDE-1'),
((SELECT id FROM companies WHERE name = 'Meta'), '2026-02-25', 55, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Apple'), '2026-03-01', 48, 'Software Engineer'),

-- Cloud and enterprise
((SELECT id FROM companies WHERE name = 'Salesforce'), '2026-03-05', 25, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Adobe'), '2026-03-10', 35, 'Software Development Engineer'),
((SELECT id FROM companies WHERE name = 'Oracle'), '2026-03-15', 18, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'IBM'), '2026-03-20', 15, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'VMware'), '2026-03-25', 22, 'Software Engineer'),

-- Indian startups and e-commerce
((SELECT id FROM companies WHERE name = 'Flipkart'), '2026-04-01', 30, 'Software Development Engineer'),
((SELECT id FROM companies WHERE name = 'Paytm'), '2026-04-05', 20, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Zomato'), '2026-04-10', 25, 'Software Development Engineer'),
((SELECT id FROM companies WHERE name = 'Swiggy'), '2026-04-15', 28, 'Software Development Engineer'),
((SELECT id FROM companies WHERE name = 'Razorpay'), '2026-04-20', 24, 'Software Engineer'),

-- Traditional IT services
((SELECT id FROM companies WHERE name = 'TCS'), '2026-05-01', 7, 'Software Developer'),
((SELECT id FROM companies WHERE name = 'Infosys'), '2026-05-05', 9, 'Systems Engineer'),
((SELECT id FROM companies WHERE name = 'Wipro'), '2026-05-10', 8, 'Project Engineer'),
((SELECT id FROM companies WHERE name = 'HCL Technologies'), '2026-05-15', 10, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Tech Mahindra'), '2026-05-20', 9, 'Software Engineer'),

-- Consulting
((SELECT id FROM companies WHERE name = 'Accenture'), '2026-06-01', 12, 'Associate Software Engineer'),
((SELECT id FROM companies WHERE name = 'Deloitte'), '2026-06-05', 15, 'Analyst'),
((SELECT id FROM companies WHERE name = 'Capgemini'), '2026-06-10', 10, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Cognizant'), '2026-06-15', 11, 'Programmer Analyst'),
((SELECT id FROM companies WHERE name = 'EY'), '2026-06-20', 13, 'Technology Consultant');

-- Update placement statistics for recent years
INSERT INTO placement_stats (year, total_students, students_placed, highest_package, avg_package, companies_visited) VALUES
(2026, 520, 498, 60, 15, 35),
(2025, 500, 480, 50, 12, 30),
(2024, 480, 456, 45, 11, 25)
ON CONFLICT (year) DO UPDATE SET
  total_students = EXCLUDED.total_students,
  students_placed = EXCLUDED.students_placed,
  highest_package = EXCLUDED.highest_package,
  avg_package = EXCLUDED.avg_package,
  companies_visited = EXCLUDED.companies_visited;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);
CREATE INDEX IF NOT EXISTS idx_placement_drives_date ON placement_drives(drive_date);
CREATE INDEX IF NOT EXISTS idx_placements_company ON placements(company_id);

-- Update sequence values if needed
SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies));
SELECT setval('placement_drives_id_seq', (SELECT MAX(id) FROM placement_drives));
SELECT setval('placement_stats_id_seq', (SELECT MAX(id) FROM placement_stats));