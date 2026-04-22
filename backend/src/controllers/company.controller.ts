import { Request, Response } from "express";
import pool from "../config/db";
import { parseExcelFile, validateCompanyData } from "../utils/excelParser";

// GET /api/admin/companies
export const getCompanies = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM companies ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};

// GET /api/admin/companies/:id
export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM companies WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Failed to fetch company" });
  }
};

// POST /api/admin/companies
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, sector, location, logo_url, registration_link } = req.body;

    if (!name || !sector || !location) {
      return res.status(400).json({ 
        message: "Name, sector, and location are required" 
      });
    }

    const result = await pool.query(
      `INSERT INTO companies (name, sector, location, logo_url, registration_link)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, sector, location, logo_url || null, registration_link || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating company:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Company already exists" });
    }
    res.status(500).json({ message: "Failed to create company" });
  }
};

// PUT /api/admin/companies/:id
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sector, location, logo_url, registration_link } = req.body;

    const result = await pool.query(
      `UPDATE companies
       SET name = $1, sector = $2, location = $3, logo_url = $4, registration_link = $5
       WHERE id = $6
       RETURNING *`,
      [name, sector, location, logo_url, registration_link, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Failed to update company" });
  }
};

// DELETE /api/admin/companies/:id
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM companies WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Failed to delete company" });
  }
};

// GET /api/companies (public endpoint)
export const getPublicCompanies = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT c.id, c.name, c.sector, c.location, c.logo_url, c.registration_link
       FROM companies c
       ORDER BY c.name ASC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching public companies:", error);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};

// POST /api/admin/companies/import/excel
export const importCompaniesFromExcel = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse Excel file
    const companies = parseExcelFile(req.file);
    
    if (companies.length === 0) {
      return res.status(400).json({ message: "No valid companies found in Excel file" });
    }

    // Validate data
    const { valid, errors } = validateCompanyData(companies);

    if (valid.length === 0) {
      return res.status(400).json({ 
        message: "No valid companies to import",
        errors 
      });
    }

    // Insert companies into database
    let imported = 0;
    const failedCompanies = [];

    for (const company of valid) {
      try {
        await pool.query(
          `INSERT INTO companies (name, sector, location, logo_url, registration_link)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (name) DO UPDATE SET
           sector = $2, location = $3, logo_url = $4, registration_link = $5`,
          [
            company.name,
            company.sector,
            company.location,
            company.logo_url || null,
            company.registration_link || null,
          ]
        );
        imported++;
      } catch (error: any) {
        failedCompanies.push({
          name: company.name,
          error: error.message,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: `Successfully imported ${imported} companies`,
      imported,
      failed: failedCompanies.length,
      failedCompanies: failedCompanies.length > 0 ? failedCompanies : undefined,
      validationErrors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Error importing companies from Excel:", error);
    res.status(500).json({ 
      message: "Failed to import companies from Excel",
      error: error.message 
    });
  }
};
