require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5433,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "chandra",
  database: process.env.DB_NAME || "placement_portal",
});

const schema = `
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
    name VARCHAR(150) UNIQUE,
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

CREATE TABLE IF NOT EXISTS year_stats (
    id SERIAL PRIMARY KEY,
    year INTEGER UNIQUE,
    total_students INTEGER,
    students_placed INTEGER,
    highest_package DECIMAL(5,2),
    avg_package DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recruiters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE,
    offers INTEGER,
    package DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    title VARCHAR(200),
    slug VARCHAR(200) UNIQUE,
    content TEXT,
    meta_description VARCHAR(500),
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    url TEXT,
    caption TEXT,
    section VARCHAR(100),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS branch_placements (
    id SERIAL PRIMARY KEY,
    branch_name VARCHAR(100) UNIQUE,
    total_students INTEGER,
    students_placed INTEGER,
    highest_package DECIMAL(5,2),
    avg_package DECIMAL(5,2),
    placement_percent DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function setup() {
  const client = await pool.connect();
  try {
    console.log("✓ Connected to database");

    console.log("Creating tables...");
    await client.query(schema);
    console.log("✓ Tables created");

    console.log("Inserting seed data...");

    // Clear existing data
    await client.query("DELETE FROM placement_drives");
    await client.query("DELETE FROM companies");
    await client.query("DELETE FROM admins");
    await client.query("DELETE FROM placement_stats");
    await client.query("DELETE FROM year_stats");
    await client.query("DELETE FROM recruiters");
    await client.query("DELETE FROM branch_placements");

    // Insert admin
    await client.query(
      `INSERT INTO admins (name, email, password, role) VALUES (
        'Admin User',
        'admin@jntuk.edu.in',
        '$2b$10$p0EYM.9XcKlZZHniJwYG4OF7Tr7vH1ohg6OqbtTIIeGsC9dbw8yaS',
        'admin'
      )`
    );
    console.log("✓ Admin inserted");

    // Insert companies
    await client.query(
      `INSERT INTO companies (name, sector, location, logo_url) VALUES
      ('TCS', 'IT Services', 'Hyderabad', 'https://i.logos-download.com/113971/29583-9fde4947792aa7b5b379c0b1aee0ead2.png/Tata_Consultancy_Services_Logo_2020.png?dl'),
      ('Infosys', 'IT Services', 'Bangalore', 'https://static.vecteezy.com/system/resources/previews/020/336/451/non_2x/infosys-logo-infosys-icon-free-free-vector.jpg'),
      ('Wipro', 'IT Services', 'Pune', 'https://vectorseek.com/wp-content/uploads/2023/04/Wipro-Logo-Vector.jpg'),
      ('HCL Technologies', 'IT Services', 'Noida', 'https://logos-world.net/wp-content/uploads/2022/07/HCL-Technologies-Symbol.png'),
      ('Cognizant', 'IT Services', 'Chennai', 'https://companieslogo.com/img/orig/CTSH-82a8444b.png?t=1720244491'),
      ('Accenture', 'Consulting', 'Mumbai', 'https://logos-world.net/wp-content/uploads/2020/06/Accenture-Emblem.png')`
    );
    console.log("✓ Companies inserted");

    // Get company IDs
    const companiesResult = await client.query(
      `SELECT id, name FROM companies ORDER BY id LIMIT 6`
    );
    const companies = companiesResult.rows;

    if (companies.length > 0) {
      // Insert placement drives with correct company IDs
      const drivesData = [
        [companies[0].id, '2026-03-15', 12, 'Software Developer', 'Hyderabad'],
        [companies[1].id, '2026-03-20', 11, 'Systems Engineer', 'Bangalore'],
        [companies[2].id, '2026-03-25', 10, 'Project Engineer', 'Pune'],
        [companies[3].id, '2026-04-01', 9, 'Associate Engineer', 'Noida'],
        [companies[4].id, '2026-04-05', 10, 'Programmer Analyst', 'Chennai'],
        [companies[5].id, '2026-04-10', 11, 'Associate Software Engineer', 'Mumbai'],
      ];

      for (const [companyId, date, pkg, role, location] of drivesData) {
        await client.query(
          `INSERT INTO placement_drives (company_id, company_name, drive_date, package_lpa, role, location)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [companyId, companies.find(c => c.id === companyId).name, date, pkg, role, location]
        );
      }
      console.log("✓ Placement drives inserted");
    }

    // Insert placement stats
    await client.query(
      `INSERT INTO placement_stats (year, total_students, students_placed, highest_package, avg_package, companies_visited) VALUES
      (2024, 2500, 2400, 42, 12, 320),
      (2023, 2350, 2200, 40, 11, 300),
      (2022, 2200, 2000, 38, 11, 280)`
    );
    console.log("✓ Placement stats inserted");

    // Insert year stats
    await client.query(
      `INSERT INTO year_stats (year, total_students, students_placed, highest_package, avg_package) VALUES
      (2024, 2500, 2400, 42, 12),
      (2023, 2350, 2200, 40, 11),
      (2022, 2200, 2000, 38, 11)`
    );
    console.log("✓ Year stats inserted");

    // Insert recruiters
    await client.query(
      `INSERT INTO recruiters (name, offers, package) VALUES
      ('Amazon', 45, 44),
      ('Microsoft', 38, 50),
      ('Google', 25, 60),
      ('Salesforce', 32, 25),
      ('Adobe', 28, 35),
      ('Flipkart', 42, 30)`
    );
    console.log("✓ Recruiters inserted");

    // Insert branch placements
    await client.query(
      `INSERT INTO branch_placements (branch_name, total_students, students_placed, highest_package, avg_package, placement_percent) VALUES
      ('CSE', 600, 580, 42, 12, 96.67),
      ('ECE', 500, 470, 40, 11, 94),
      ('EEE', 450, 410, 38, 10, 91.11),
      ('MECH', 400, 360, 35, 9, 90),
      ('CIVIL', 350, 300, 32, 8, 85.71)`
    );
    console.log("✓ Branch placements inserted");

    console.log("\n✅ Database setup complete!");
    console.log("   Admin login: admin@jntuk.edu.in / admin123");
  } catch (err) {
    console.error("❌ Setup failed:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
