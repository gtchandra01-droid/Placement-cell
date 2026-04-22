require('dotenv').config();
const { Pool } = require('pg');

// Use environment variables or fallback to your credentials
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'placement_portal',
});

console.log('🔧 Database Configuration:');
console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
console.log(`   Port: ${process.env.DB_PORT || 5433}`);
console.log(`   User: ${process.env.DB_USER || 'postgres'}`);
console.log(`   Database: ${process.env.DB_NAME || 'placement_portal'}`);
console.log(`   Password: ${process.env.DB_PASSWORD ? '***' : 'postgres'}`);
console.log('');

async function testDatabaseConnection() {
  console.log("🔍 Testing Database Connection...");
  console.log("================================");
  
  try {
    // Test basic connection
    console.log("\n1. Testing basic connection...");
    const client = await pool.connect();
    console.log("✅ Database connection successful!");
    
    // Test database info
    console.log("\n2. Database Information:");
    const dbInfo = await client.query("SELECT version(), current_database(), current_user");
    console.log(`   Database: ${dbInfo.rows[0].current_database}`);
    console.log(`   User: ${dbInfo.rows[0].current_user}`);
    console.log(`   PostgreSQL Version: ${dbInfo.rows[0].version.split(' ')[0]} ${dbInfo.rows[0].version.split(' ')[1]}`);
    
    // Test current time
    console.log("\n3. Testing query execution...");
    const timeResult = await client.query("SELECT NOW() as current_time");
    console.log(`   Current Time: ${timeResult.rows[0].current_time}`);
    
    // Check if tables exist
    console.log("\n4. Checking database schema...");
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log("   Tables found:");
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    } else {
      console.log("   ⚠️  No tables found. Run database setup first.");
      console.log("   Setup commands:");
      console.log("   1. createdb placement_portal");
      console.log("   2. psql -d placement_portal -f database/database.sql");
      console.log("   3. psql -d placement_portal -f database/update_companies_2026.sql");
    }
    
    // Check companies data
    console.log("\n5. Checking data...");
    try {
      const companiesResult = await client.query("SELECT COUNT(*) as count FROM companies");
      console.log(`   Companies: ${companiesResult.rows[0].count} records`);
      
      const drivesResult = await client.query("SELECT COUNT(*) as count FROM placement_drives WHERE drive_date >= '2026-01-01'");
      console.log(`   2026 Drives: ${drivesResult.rows[0].count} records`);
      
      const statsResult = await client.query("SELECT COUNT(*) as count FROM placement_stats");
      console.log(`   Statistics: ${statsResult.rows[0].count} records`);
      
      if (companiesResult.rows[0].count > 0) {
        console.log("\n6. Sample company data:");
        const sampleCompanies = await client.query("SELECT name, sector, logo_url FROM companies LIMIT 3");
        sampleCompanies.rows.forEach(company => {
          console.log(`   - ${company.name} (${company.sector})`);
        });
      }
      
    } catch (error) {
      console.log("   ⚠️  Tables exist but no data found. Run seed scripts:");
      console.log("   psql -d placement_portal -f database/update_companies_2026.sql");
    }
    
    client.release();
    
    console.log("\n✅ Database Status: CONNECTED & WORKING");
    console.log("=====================================");
    console.log("\n🚀 You can now start your backend server:");
    console.log("   npm run dev");
    
  } catch (error) {
    console.error("\n❌ Database connection failed!");
    console.error("===============================");
    
    if (error.message.includes("ECONNREFUSED")) {
      console.error("\n🔧 PostgreSQL is not running. Start it:");
      console.error("Windows: Start 'postgresql' service from Services");
      console.error("Linux: sudo systemctl start postgresql");
      console.error("Mac: brew services start postgresql");
    } else if (error.message.includes("authentication failed")) {
      console.error("\n🔧 Authentication failed. Check:");
      console.error("- Username/password in .env file");
      console.error("- PostgreSQL user exists");
    } else if (error.message.includes("does not exist")) {
      console.error("\n🔧 Database does not exist. Create it:");
      console.error("createdb placement_portal");
    } else {
      console.error(`\nError: ${error.message}`);
    }
    
    console.error("\n📋 Current Configuration:");
    console.error(`   Host: ${process.env.DB_HOST || 'undefined'}`);
    console.error(`   Port: ${process.env.DB_PORT || 'undefined'}`);
    console.error(`   Database: ${process.env.DB_NAME || 'undefined'}`);
    console.error(`   User: ${process.env.DB_USER || 'undefined'}`);
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the test
testDatabaseConnection();