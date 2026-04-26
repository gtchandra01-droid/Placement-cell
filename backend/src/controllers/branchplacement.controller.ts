import { Request, Response } from "express";
import pool from "../config/db";

/* ================= GET ALL ================= */
export const getBranchPlacements = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            "SELECT * FROM branch_placements ORDER BY id DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch branch placements" });
    }
};

/* ================= CREATE ================= */
export const createBranchPlacement = async (req: Request, res: Response) => {
    const {
        branch_name,
        total_students,
        students_placed,
        highest_package,
        avg_package,
        placement_percent,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO branch_placements 
      (branch_name, total_students, students_placed, highest_package, avg_package, placement_percent)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
            [
                branch_name,
                total_students,
                students_placed,
                highest_package,
                avg_package,
                placement_percent,
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create branch" });
    }
};

/* ================= UPDATE ================= */
export const updateBranchPlacement = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
        branch_name,
        total_students,
        students_placed,
        highest_package,
        avg_package,
        placement_percent,
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE branch_placements
       SET branch_name=$1,
           total_students=$2,
           students_placed=$3,
           highest_package=$4,
           avg_package=$5,
           placement_percent=$6
       WHERE id=$7
       RETURNING *`,
            [
                branch_name,
                total_students,
                students_placed,
                highest_package,
                avg_package,
                placement_percent,
                id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update branch" });
    }
};

/* ================= DELETE ================= */
export const deleteBranchPlacement = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM branch_placements WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.json({ message: "Branch deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete branch" });
    }
};