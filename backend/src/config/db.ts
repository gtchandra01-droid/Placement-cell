import "dotenv/config";
import { Pool } from "pg";

// Use the connection string from environment variables
// Neon strings look like: postgres://user:password@hostname/neondb?sslmode=require
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Neon and most cloud providers
  },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 10,
});

pool.connect()
  .then((client) => {
    console.log("✓ Connected to Neon Database successfully");
    // We parse the URL briefly just for the log message
    const dbUrl = new URL(connectionString);
    console.log(`  Host: ${dbUrl.host}`);
    console.log(`  Database: ${dbUrl.pathname.substring(1)}`);
    client.release();
  })
  .catch((err) => {
    console.error("✗ Database connection failed");
    console.error(`  Error: ${err.message}`);
    console.error("  Check: Is your DATABASE_URL correct in the .env file?");
  });

export default pool;