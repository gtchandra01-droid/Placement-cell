import { Request, Response } from "express";
import pool from "../config/db";

/* ---------------------------------------------
   GET DASHBOARD STATS
--------------------------------------------- */
export const getPlacementStats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Total students placed
    const placedQuery = await pool.query<{ count: string }>(
      "SELECT COUNT(*) FROM students WHERE placed = true"
    );

    // Companies visited
    const companiesQuery = await pool.query<{ count: string }>(
      "SELECT COUNT(*) FROM companies"
    );

    // Highest package
    const highestPackageQuery = await pool.query<{ max: string | null }>(
      "SELECT MAX(package_lpa) FROM placement_drives"
    );

    // Total students
    const totalStudentsQuery = await pool.query<{ count: string }>(
      "SELECT COUNT(*) FROM students"
    );

    const placed = Number(placedQuery.rows[0].count);
    const total = Number(totalStudentsQuery.rows[0].count);

    const percentage =
      total > 0 ? Number(((placed / total) * 100).toFixed(1)) : 0;

    return res.status(200).json({
      success: true,
      stats: {
        studentsPlaced: placed,
        companiesVisited: Number(companiesQuery.rows[0].count),
        highestPackage:
          Number(highestPackageQuery.rows[0].max) || 0,
        placementPercentage: percentage,
      },
    });
  } catch (error) {
    console.error("Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch placement statistics",
    });
  }
};

/* ---------------------------------------------
   RECENT PLACEMENT ACTIVITIES
--------------------------------------------- */
export const getRecentActivities = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = `
      SELECT 
        id,
        action,
        description,
        created_at
      FROM activities
      ORDER BY created_at DESC
      LIMIT 6;
    `;

    const { rows } = await pool.query(query);

    return res.status(200).json({
      success: true,
      activities: rows,
    });
  } catch (error) {
    console.error("Activity Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch activities",
    });
  }
};

/* ---------------------------------------------
   UPCOMING DRIVES
--------------------------------------------- */
export const getUpcomingDrives = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const query = `
      SELECT 
        id,
        company_name,
        drive_date,
        start_time,
        role
      FROM placement_drives
      WHERE drive_date >= CURRENT_DATE
      ORDER BY drive_date ASC
      LIMIT 5;
    `;

    const { rows } = await pool.query(query);

    return res.status(200).json({
      success: true,
      upcoming: rows,
    });
  } catch (error) {
    console.error("Drive Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch upcoming drives",
    });
  }
};
