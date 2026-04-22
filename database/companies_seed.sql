-- Insert recent hiring companies with logos and registration links (2025-2026)
INSERT INTO companies (name, sector, location, logo_url, registration_link) VALUES
('Amazon', 'Product Based', 'Hyderabad, India', 'https://logo.clearbit.com/amazon.com', 'https://amazon.jobs/en/teams/university-recruiting'),
('Microsoft', 'Product Based', 'Hyderabad, India', 'https://logo.clearbit.com/microsoft.com', 'https://careers.microsoft.com/students/us/en/university-recruiting'),
('Google', 'Product Based', 'Bangalore, India', 'https://logo.clearbit.com/google.com', 'https://careers.google.com/students/'),
('TCS', 'IT Services', 'Hyderabad, India', 'https://logo.clearbit.com/tcs.com', 'https://careers.tcs.com/campus-hiring'),
('Infosys', 'IT Services', 'Bangalore, India', 'https://logo.clearbit.com/infosys.com', 'https://careers.infosys.com/campus-connect'),
('Wipro', 'IT Services', 'Bangalore, India', 'https://logo.clearbit.com/wipro.com', 'https://careers.wipro.com/campus-recruitment'),
('HCL Technologies', 'IT Services', 'Noida, India', 'https://logo.clearbit.com/hcl.com', 'https://www.hcltech.com/careers/campus-connect'),
('Cognizant', 'IT Services', 'Pune, India', 'https://logo.clearbit.com/cognizant.com', 'https://careers.cognizant.com/campus'),
('Accenture', 'IT Consulting', 'Bangalore, India', 'https://logo.clearbit.com/accenture.com', 'https://www.accenture.com/in-en/careers/campus-recruiting'),
('Tech Mahindra', 'IT Services', 'Pune, India', 'https://logo.clearbit.com/techmahindra.com', 'https://careers.techmahindra.com/campus-hiring'),
('Capgemini', 'IT Consulting', 'Mumbai, India', 'https://logo.clearbit.com/capgemini.com', 'https://www.capgemini.com/careers/your-career/campus-recruitment/'),
('IBM', 'Technology', 'Bangalore, India', 'https://logo.clearbit.com/ibm.com', 'https://www.ibm.com/careers/university/'),
('Oracle', 'Database Technology', 'Bangalore, India', 'https://logo.clearbit.com/oracle.com', 'https://www.oracle.com/corporate/careers/students-grads/'),
('Salesforce', 'Cloud Computing', 'Hyderabad, India', 'https://logo.clearbit.com/salesforce.com', 'https://salesforce.wd1.myworkdayjobs.com/External_Career_Site'),
('Adobe', 'Software', 'Bangalore, India', 'https://logo.clearbit.com/adobe.com', 'https://adobe.wd5.myworkdayjobs.com/external_university'),
('Flipkart', 'E-commerce', 'Bangalore, India', 'https://logo.clearbit.com/flipkart.com', 'https://www.flipkartcareers.com/#!/campus-hiring'),
('Paytm', 'Fintech', 'Noida, India', 'https://logo.clearbit.com/paytm.com', 'https://jobs.paytm.com/campus-hiring'),
('Zomato', 'Food Tech', 'Gurgaon, India', 'https://logo.clearbit.com/zomato.com', 'https://www.zomato.com/careers/campus'),
('Swiggy', 'Food Delivery', 'Bangalore, India', 'https://logo.clearbit.com/swiggy.com', 'https://careers.swiggy.com/campus-hiring'),
('Deloitte', 'Consulting', 'Hyderabad, India', 'https://logo.clearbit.com/deloitte.com', 'https://www2.deloitte.com/in/en/pages/careers/articles/campus-recruitment.html');

-- Insert sample students
INSERT INTO students (name, roll_no, branch, cgpa, placed) VALUES
('Rajesh Kumar', '20B81A0501', 'Computer Science', 8.5, false),
('Priya Sharma', '20B81A0502', 'Computer Science', 9.2, false),
('Amit Singh', '20B81A0503', 'Computer Science', 7.8, false),
('Sneha Reddy', '20B81A0504', 'Computer Science', 8.9, false),
('Vikram Patel', '20B81A0505', 'Computer Science', 8.1, false),
('Anitha Rao', '20B81A1201', 'Electronics', 8.7, false),
('Suresh Babu', '20B81A1202', 'Electronics', 7.9, false),
('Kavya Nair', '20B81A1203', 'Electronics', 9.0, false),
('Ravi Teja', '20B81A3301', 'Mechanical', 8.3, false),
('Divya Krishna', '20B81A3302', 'Mechanical', 8.6, false);

-- Insert recent placement drives (2026)
INSERT INTO placement_drives (company_id, drive_date, package_lpa, role) VALUES
((SELECT id FROM companies WHERE name = 'Amazon'), '2026-02-15', 44, 'SDE-1'),
((SELECT id FROM companies WHERE name = 'Microsoft'), '2026-02-20', 50, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Google'), '2026-02-25', 60, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Salesforce'), '2026-03-01', 25, 'Software Engineer'),
((SELECT id FROM companies WHERE name = 'Adobe'), '2026-03-05', 35, 'Software Development Engineer'),
((SELECT id FROM companies WHERE name = 'Flipkart'), '2026-03-10', 30, 'Software Development Engineer'),
((SELECT id FROM companies WHERE name = 'TCS'), '2026-03-15', 7, 'Software Developer'),
((SELECT id FROM companies WHERE name = 'Infosys'), '2026-03-20', 9, 'Systems Engineer'),
((SELECT id FROM companies WHERE name = 'Swiggy'), '2026-03-25', 28, 'Software Development Engineer'),
((SELECT id FROM companies WHERE name = 'Zomato'), '2026-04-01', 25, 'Software Development Engineer');

-- Insert sample placements
INSERT INTO placements (student_id, company_id, drive_id, status) VALUES
((SELECT id FROM students WHERE roll_no = '20B81A0502'), (SELECT id FROM companies WHERE name = 'Amazon'), (SELECT id FROM placement_drives WHERE company_id = (SELECT id FROM companies WHERE name = 'Amazon')), 'PLACED'),
((SELECT id FROM students WHERE roll_no = '20B81A0504'), (SELECT id FROM companies WHERE name = 'Microsoft'), (SELECT id FROM placement_drives WHERE company_id = (SELECT id FROM companies WHERE name = 'Microsoft')), 'PLACED'),
((SELECT id FROM students WHERE roll_no = '20B81A0501'), (SELECT id FROM companies WHERE name = 'TCS'), (SELECT id FROM placement_drives WHERE company_id = (SELECT id FROM companies WHERE name = 'TCS')), 'PLACED');

-- Update placed students
UPDATE students SET placed = true WHERE roll_no IN ('20B81A0502', '20B81A0504', '20B81A0501');

-- Update placement stats for 2024-2025
INSERT INTO placement_stats (year, total_students, students_placed, highest_package, avg_package, companies_visited) VALUES
(2025, 520, 498, 60, 15, 35),
(2024, 500, 480, 50, 12, 30),
(2023, 480, 456, 45, 11, 25);