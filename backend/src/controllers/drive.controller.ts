import { Request, Response } from "express";
import pool from "../config/db";

/* =================================
   CREATE NEW PLACEMENT DRIVE
================================= */
export const createDrive = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      company_name,
      role,
      location,
      package_lpa,
      drive_date,
      eligibility,
      description,
      registration_link
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO placement_drives 
      (company_name, role, location, package_lpa, drive_date, eligibility, description, registration_link)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        company_name,
        role,
        location,
        package_lpa,
        drive_date,
        eligibility,
        description,
        registration_link,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Placement drive created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Create Drive Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create placement drive",
    });
  }
};

/* =================================
   GET ALL PLACEMENT DRIVES
================================= */
export const getAllDrives = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await pool.query(
      "SELECT * FROM placement_drives ORDER BY drive_date DESC"
    );

    return res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Fetch Drives Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch drives",
    });
  }
};

/* =================================
   GET SINGLE DRIVE
================================= */
export const getDriveById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM placement_drives WHERE id = $1",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Placement drive not found",
      });
    }

    return res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Fetch Drive Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch drive",
    });
  }
};

/* =================================
   UPDATE DRIVE
================================= */
export const updateDrive = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const {
      company_name,
      role,
      location,
      package_lpa,
      drive_date,
      eligibility,
      description,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE placement_drives SET
        company_name = $1,
        role = $2,
        location = $3,
        package_lpa = $4,
        drive_date = $5,
        eligibility = $6,
        description = $7
      WHERE id = $8
      RETURNING *
      `,
      [
        company_name,
        role,
        location,
        package_lpa,
        drive_date,
        eligibility,
        description,
        id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Placement drive not found",
      });
    }

    return res.json({
      success: true,
      message: "Placement drive updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update Drive Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update drive",
    });
  }
};

/* =================================
   DELETE DRIVE
================================= */
export const deleteDrive = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM placement_drives WHERE id = $1 RETURNING *",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "Placement drive not found",
      });
    }

    return res.json({
      success: true,
      message: "Placement drive deleted successfully",
    });
  } catch (error) {
    console.error("Delete Drive Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete drive",
    });
  }
};
