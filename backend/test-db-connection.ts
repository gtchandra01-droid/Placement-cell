import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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
    } catch (error) {
      console.log("   ⚠️  Tables exist but no data found. Run seed scripts.");
    }
    
    client.release();
    
    console.log("\n✅ Database Status: CONNECTED & WORKING");
    console.log("=====================================");
    
  } catch (error) {
    console.error("\n❌ Database connection failed!");
    console.error("===============================");
    
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      
      // Provide specific troubleshooting based on error
      if (error.message.includes("ECONNREFUSED")) {
        console.error("\n🔧 Troubleshooting:");
        console.error("- PostgreSQL service is not running");
        console.error("- Start PostgreSQL service:");
        console.error("  Windows: Start 'postgresql' service from Services");
        console.error("  Linux: sudo systemctl start postgresql");
        console.error("  Mac: brew services start postgresql");
      } else if (error.message.includes("authentication failed")) {
        console.error("\n🔧 Troubleshooting:");
        console.error("- Check username/password in .env file");
        console.error("- Verify PostgreSQL user exists");
        console.error("- Check pg_hba.conf authentication settings");
      } else if (error.message.includes("database") && error.message.includes("does not exist")) {
        console.error("\n🔧 Troubleshooting:");
        console.error("- Database 'placement_portal' does not exist");
        console.error("- Create database: createdb placement_portal");
        console.error("- Then run: psql -d placement_portal -f database/database.sql");
      }
    }
    
    console.error("\n📋 Current Configuration:");
    console.error(`   Host: ${process.env.DB_HOST}`);
    console.error(`   Port: ${process.env.DB_PORT}`);
    console.error(`   Database: ${process.env.DB_NAME}`);
    console.error(`   User: ${process.env.DB_USER}`);
  } finally {
    await pool.end();
  }
}

// Run the test
testDatabaseConnection();