CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    roll_no VARCHAR(20) UNIQUE,
    branch VARCHAR(50),
    cgpa DECIMAL(3,2),
    placed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    sector VARCHAR(100),
    location VARCHAR(100),
    logo_url TEXT,
    registration_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS placement_drives (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    company_name VARCHAR(150),
    drive_date DATE,
    package_lpa DECIMAL(5,2),
    role VARCHAR(100),
    location VARCHAR(100),
    salary_package DECIMAL(5,2),
    eligibility TEXT,
    description TEXT,
    start_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS placements (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    drive_id INTEGER REFERENCES placement_drives(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'PLACED',
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS placement_stats (
    id SERIAL PRIMARY KEY,
    year INTEGER UNIQUE,
    total_students INTEGER,
    students_placed INTEGER,
    highest_package DECIMAL(5,2),
    avg_package DECIMAL(5,2),
    companies_visited INTEGER
);

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(120) UNIQUE,
    password TEXT,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menus (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100),
    url VARCHAR(255),
    parent_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    url TEXT,
    caption TEXT,
    section VARCHAR(50),
    category VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    message TEXT,
    type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    status VARCHAR(20) DEFAULT 'Published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop the old table and recreate with new schema
DROP TABLE IF EXISTS placement_drives CASCADE;

CREATE TABLE IF NOT EXISTS placement_drives (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    company_name VARCHAR(150),
    drive_date DATE,
    package_lpa DECIMAL(5,2),
    role VARCHAR(100),
    location VARCHAR(100),
    eligibility TEXT,
    description TEXT,
    start_time TIME,
    registration_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add registration_link column if it doesn't exist
ALTER TABLE placement_drives
ADD COLUMN IF NOT EXISTS registration_link TEXT;

-- Drop salary_package column if it exists
ALTER TABLE placement_drives
DROP COLUMN IF EXISTS salary_package;
