import { Request, Response } from "express";
import pool from "../config/db";

/* ---------------- DASHBOARD DATA ---------------- */

export const getDashboardStats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const studentsPlaced = await pool.query(
      "SELECT COUNT(*) FROM placements WHERE status = 'PLACED'"
    );

    const companies = await pool.query(
      "SELECT COUNT(DISTINCT company_id) FROM placement_drives"
    );

    const highestPackage = await pool.query(
      "SELECT MAX(package_lpa) FROM placements"
    );

    const placementPercent = await pool.query(`
      SELECT 
        ROUND(
          (COUNT(*) FILTER (WHERE status='PLACED')::decimal /
          NULLIF(COUNT(*), 0)) * 100, 2
        ) AS percentage
      FROM students
    `);

    return res.status(200).json({
      studentsPlaced: studentsPlaced.rows[0].count,
      companiesVisited: companies.rows[0].count,
      highestPackage: highestPackage.rows[0].max,
      placementPercent: placementPercent.rows[0].percentage,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({ message: "Dashboard error" });
  }
};

/* ---------------- ACTIVITIES ---------------- */

export const getRecentActivities = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await pool.query(
      "SELECT * FROM activities ORDER BY created_at DESC LIMIT 6"
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Activity Fetch Error:", error);
    return res.status(500).json({ message: "Activity fetch failed" });
  }
};

/* ---------------- UPCOMING DRIVES ---------------- */

export const getUpcomingDrives = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await pool.query(`
      SELECT * FROM placement_drives
      WHERE drive_date >= CURRENT_DATE
      ORDER BY drive_date ASC
    `);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Drive Fetch Error:", error);
    return res.status(500).json({ message: "Drive fetch failed" });
  }
};
