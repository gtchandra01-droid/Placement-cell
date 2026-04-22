import { Request, Response } from "express";
import pool from "../config/db";

// GET /api/admin/placements
export const getPlacements = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.status,
        p.placed_at,
        s.name as student_name,
        s.roll_no,
        s.branch,
        s.cgpa,
        c.name as company_name,
        c.sector,
        pd.package_lpa,
        pd.role
      FROM placements p
      JOIN students s ON p.student_id = s.id
      JOIN companies c ON p.company_id = c.id
      LEFT JOIN placement_drives pd ON p.drive_id = pd.id
      ORDER BY p.placed_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching placements:", error);
    res.status(500).json({ message: "Failed to fetch placements" });
  }
};

// GET /api/admin/placements/:id
export const getPlacementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT 
        p.*,
        s.name as student_name,
        s.roll_no,
        s.branch,
        c.name as company_name,
        pd.role,
        pd.package_lpa
      FROM placements p
      JOIN students s ON p.student_id = s.id
      JOIN companies c ON p.company_id = c.id
      LEFT JOIN placement_drives pd ON p.drive_id = pd.id
      WHERE p.id = $1
    `, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Placement not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching placement:", error);
    res.status(500).json({ message: "Failed to fetch placement" });
  }
};

// POST /api/admin/placements
export const createPlacement = async (req: Request, res: Response) => {
  try {
    const { student_id, company_id, drive_id, status } = req.body;

    if (!student_id || !company_id) {
      return res.status(400).json({ 
        message: "Student ID and Company ID are required" 
      });
    }

    // Check if student is already placed
    const existingPlacement = await pool.query(
      "SELECT id FROM placements WHERE student_id = $1 AND status = 'PLACED'",
      [student_id]
    );

    if (existingPlacement.rowCount > 0) {
      return res.status(400).json({ 
        message: "Student is already placed" 
      });
    }

    const result = await pool.query(`
      INSERT INTO placements (student_id, company_id, drive_id, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [student_id, company_id, drive_id || null, status || 'PLACED']);

    // Update student placed status
    await pool.query(
      "UPDATE students SET placed = true WHERE id = $1",
      [student_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating placement:", error);
    res.status(500).json({ message: "Failed to create placement" });
  }
};

// PUT /api/admin/placements/:id
export const updatePlacement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { student_id, company_id, drive_id, status } = req.body;

    const result = await pool.query(`
      UPDATE placements
      SET student_id = $1, company_id = $2, drive_id = $3, status = $4
      WHERE id = $5
      RETURNING *
    `, [student_id, company_id, drive_id, status, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Placement not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating placement:", error);
    res.status(500).json({ message: "Failed to update placement" });
  }
};

// DELETE /api/admin/placements/:id
export const deletePlacement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get placement details before deletion
    const placementResult = await pool.query(
      "SELECT student_id FROM placements WHERE id = $1",
      [id]
    );

    if (placementResult.rowCount === 0) {
      return res.status(404).json({ message: "Placement not found" });
    }

    const studentId = placementResult.rows[0].student_id;

    // Delete placement
    await pool.query("DELETE FROM placements WHERE id = $1", [id]);

    // Check if student has other placements
    const otherPlacements = await pool.query(
      "SELECT id FROM placements WHERE student_id = $1 AND status = 'PLACED'",
      [studentId]
    );

    // Update student placed status if no other placements
    if (otherPlacements.rowCount === 0) {
      await pool.query(
        "UPDATE students SET placed = false WHERE id = $1",
        [studentId]
      );
    }

    res.json({ message: "Placement deleted successfully" });
  } catch (error) {
    console.error("Error deleting placement:", error);
    res.status(500).json({ message: "Failed to delete placement" });
  }
};

// GET /api/placements/stats
export const getPlacementStats = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_placements,
        COUNT(DISTINCT student_id) as unique_students_placed,
        COUNT(DISTINCT company_id) as companies_recruited,
        AVG(pd.package_lpa) as avg_package
      FROM placements p
      LEFT JOIN placement_drives pd ON p.drive_id = pd.id
      WHERE p.status = 'PLACED'
    `);

    const companyWiseStats = await pool.query(`
      SELECT 
        c.name as company_name,
        c.sector,
        COUNT(p.id) as total_placements,
        MAX(pd.package_lpa) as highest_package
      FROM companies c
      LEFT JOIN placements p ON c.id = p.company_id AND p.status = 'PLACED'
      LEFT JOIN placement_drives pd ON p.drive_id = pd.id
      GROUP BY c.id, c.name, c.sector
      ORDER BY total_placements DESC
    `);

    res.json({
      overall: result.rows[0],
      companyWise: companyWiseStats.rows
    });
  } catch (error) {
    console.error("Error fetching placement stats:", error);
    res.status(500).json({ message: "Failed to fetch placement stats" });
  }
};