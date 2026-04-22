import "dotenv/config";
import fs from "fs";
import path from "path";
import pool from "./src/config/db";

async function runMigration() {
  try {
    console.log("\n📋 Running Statistics Tables Migration...\n");

    // Read the migration file - it's in the parent directory's database folder
    const migrationPath = path.join(__dirname, "../database/fix_statistics_tables.sql");
    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");

    // Split by semicolon and filter empty statements
    const statements = migrationSQL
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    // Execute each statement
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await pool.query(statement);
    }

    console.log("\n✅ Migration completed successfully!\n");

    // Verify tables
    console.log("📊 Verifying tables...\n");

    const tables = [
      "placement_stats",
      "year_stats",
      "recruiters",
      "branch_placements",
    ];

    for (const table of tables) {
      const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`✓ ${table}: ${result.rows[0].count} records`);
    }

    console.log("\n✨ All tables are ready!\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
