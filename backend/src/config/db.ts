import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5433,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "placement_portal",
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 10,
});

pool.connect()
  .then((client) => {
    console.log("✓ Database connected successfully");
    console.log(`  Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`  Database: ${process.env.DB_NAME}`);
    console.log(`  User: ${process.env.DB_USER}`);
    client.release();
  })
  .catch((err) => {
    console.error("✗ Database connection failed");
    console.error(`  Error: ${err.message}`);
    console.error("  Check: PostgreSQL running on port", process.env.DB_PORT);
  });

export default pool;
