import { Request, Response } from "express";
import pool from "../config/db";

export const getMenus = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const result = await pool.query("SELECT * FROM menus ORDER BY sort_order ASC");
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch menus" });
  }
};

export const createMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { label, url, parent_id, sort_order } = req.body;
    const result = await pool.query(
      "INSERT INTO menus (label, url, parent_id, sort_order) VALUES ($1, $2, $3, $4) RETURNING *",
      [label, url, parent_id || null, sort_order || 0]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create menu" });
  }
};

export const updateMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { label, url, parent_id, sort_order, is_active } = req.body;
    const result = await pool.query(
      "UPDATE menus SET label=$1, url=$2, parent_id=$3, sort_order=$4, is_active=$5 WHERE id=$6 RETURNING *",
      [label, url, parent_id || null, sort_order, is_active, id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update menu" });
  }
};

export const deleteMenu = async (req: Request, res: Response): Promise<Response> => {
  try {
    await pool.query("DELETE FROM menus WHERE id = $1", [req.params.id]);
    return res.json({ message: "Menu deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete menu" });
  }
};
