import { Request, Response } from "express";
import pool from "../config/db";

// GET all pages (public)
export const getPages = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pages WHERE status = 'Published' ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

// GET single page by slug (public)
export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT * FROM pages WHERE slug = $1 AND status = 'Published'",
      [slug]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ message: "Failed to fetch page" });
  }
};

// GET all pages (admin)
export const getAllPages = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pages ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

// CREATE page
export const createPage = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, status } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ message: "Title and slug are required" });
    }

    const result = await pool.query(
      `INSERT INTO pages (title, slug, content, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, slug, content || "", status || "Published"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating page:", error.message);
    console.error("Full error:", error);
    if (error.code === "42P1") {
      return res.status(500).json({ message: "Pages table does not exist. Please run database migration." });
    }
    if (error.code === "23505") {
      return res.status(400).json({ message: "Slug already exists" });
    }
    res.status(500).json({ message: error.message || "Failed to create page" });
  }
};

// UPDATE page
export const updatePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, slug, content, status } = req.body;

    const result = await pool.query(
      `UPDATE pages
       SET title = $1, slug = $2, content = $3, status = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [title, slug, content, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({ message: "Failed to update page" });
  }
};

// DELETE page
export const deletePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM pages WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ message: "Failed to delete page" });
  }
};
