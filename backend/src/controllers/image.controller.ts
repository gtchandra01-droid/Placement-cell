import { Request, Response } from "express";
import pool from "../config/db";
import path from "path";
import fs from "fs";

// GET all images
export const getImages = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, name, description, file_path, created_at FROM images ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

// GET single image
export const getImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM images WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
};

// UPLOAD image
export const uploadImage = async (req: Request, res: Response) => {
  try {
    console.log("Upload request received");
    console.log("File:", req.file);
    console.log("Body:", req.body);
    
    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Image name is required" });
    }

    // Save file to uploads directory
    const uploadsDir = path.join(__dirname, "../../uploads/images");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `${Date.now()}-${req.file.originalname}`;
    const filepath = path.join(uploadsDir, filename);
    const relativePath = `/uploads/images/${filename}`;

    // Write file to disk
    fs.writeFileSync(filepath, req.file.buffer);

    // Save to database
    const result = await pool.query(
      `INSERT INTO images (name, description, file_path, file_size, mime_type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, file_path, created_at`,
      [name, description || null, relativePath, req.file.size, req.file.mimetype]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

// UPDATE image
export const updateImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await pool.query(
      `UPDATE images 
       SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, name, description, file_path, created_at`,
      [name, description || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Failed to update image" });
  }
};

// DELETE image
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get image path first
    const getResult = await pool.query(
      "SELECT file_path FROM images WHERE id = $1",
      [id]
    );

    if (getResult.rowCount === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = getResult.rows[0].file_path;

    // Delete from database
    await pool.query("DELETE FROM images WHERE id = $1", [id]);

    // Delete file from disk
    const fullPath = path.join(__dirname, "../../", filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};
