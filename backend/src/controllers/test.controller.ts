import { Request, Response } from "express";
import pool from "../config/db";

// GET /api/test/health
export const healthCheck = async (_req: Request, res: Response) => {
  try {
    // Test database connection
    const dbResult = await pool.query("SELECT NOW() as current_time");
    
    // Test companies table
    const companiesResult = await pool.query("SELECT COUNT(*) as count FROM companies");
    
    // Test placement drives for 2026
    const drivesResult = await pool.query(
      "SELECT COUNT(*) as count FROM placement_drives WHERE drive_date >= '2026-01-01'"
    );
    
    // Test placement stats
    const statsResult = await pool.query(
      "SELECT year, students_placed, highest_package FROM placement_stats ORDER BY year DESC LIMIT 3"
    );

    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        current_time: dbResult.rows[0].current_time
      },
      data: {
        companies_count: parseInt(companiesResult.rows[0].count),
        drives_2026_count: parseInt(drivesResult.rows[0].count),
        recent_stats: statsResult.rows
      },
      endpoints: {
        companies_public: "/api/public/companies",
        companies_admin: "/api/admin/companies",
        placements_stats: "/api/placements/stats",
        placement_drives: "/api/drives"
      },
      version: "2026.1.0"
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    });
  }
};

// GET /api/test/companies
export const testCompanies = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.name,
        c.sector,
        c.logo_url,
        c.registration_link,
        COUNT(pd.id) as drive_count
      FROM companies c
      LEFT JOIN placement_drives pd ON c.id = pd.company_id
      GROUP BY c.id, c.name, c.sector, c.logo_url, c.registration_link
      ORDER BY c.name
      LIMIT 10
    `);

    res.json({
      status: "success",
      message: "Companies data test",
      count: result.rows.length,
      sample_companies: result.rows
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// GET /api/test/drives-2026
export const testDrives2026 = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.name as company_name,
        c.logo_url,
        pd.drive_date,
        pd.role,
        pd.package_lpa
      FROM placement_drives pd
      JOIN companies c ON pd.company_id = c.id
      WHERE pd.drive_date >= '2026-01-01'
      ORDER BY pd.drive_date
    `);

    res.json({
      status: "success",
      message: "2026 placement drives test",
      count: result.rows.length,
      drives_2026: result.rows
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
};