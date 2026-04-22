import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import pool from "../config/db";
import { generateToken } from "../utils/jwt";

export const registerAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, role = "admin" } = req.body;

    const existing = await pool.query("SELECT id FROM admins WHERE email = $1", [email]);
    if ((existing.rowCount ?? 0) > 0) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO admins (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role]
    );

    return res.status(201).json({ message: "Admin registered", admin: result.rows[0] });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const adminId = (req as any).admin?.id;
    const result = await pool.query(
      "SELECT id, name, email, role FROM admins WHERE id = $1",
      [adminId]
    );
    if ((result.rowCount ?? 0) === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: "Profile fetch failed" });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Update last_login timestamp
    await pool.query(
      "UPDATE admins SET last_login = NOW() WHERE id = $1",
      [admin.id]
    );

    const token = generateToken({
      id: admin.id,
      role: admin.role,
    });

    return res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err: any) {
    console.error("LOGIN ERROR:", err.message);
    return res.status(500).json({ message: err.message || "Login failed" });
  }
};