import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcryptjs";

// GET /api/admins
export const getAdmins = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at, last_login FROM admins ORDER BY last_login DESC NULLS LAST"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

// GET /api/admins/:id
export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id, name, email, role, created_at, last_login FROM admins WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ message: "Failed to fetch admin" });
  }
};

// POST /api/admins
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO admins (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at, last_login`,
      [name || null, email, hashedPassword, role || "admin"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating admin:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Failed to create admin" });
  }
};

// PUT /api/admins/:id
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    let query: string;
    let params: any[];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = `UPDATE admins
               SET name = $1, email = $2, password = $3, role = $4
               WHERE id = $5
               RETURNING id, name, email, role, created_at, last_login`;
      params = [name, email, hashedPassword, role, id];
    } else {
      query = `UPDATE admins
               SET name = $1, email = $2, role = $3
               WHERE id = $4
               RETURNING id, name, email, role, created_at, last_login`;
      params = [name, email, role, id];
    }

    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error("Error updating admin:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Failed to update admin" });
  }
};

// DELETE /api/admins/:id
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM admins WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Failed to delete admin" });
  }
};