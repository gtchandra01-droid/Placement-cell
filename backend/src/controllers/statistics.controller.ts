import { Request, Response } from "express";
import pool from "../config/db";

// Placement Stats
export const getPlacementStats = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM placement_stats LIMIT 1");
    res.json(result.rows[0] || {});
  } catch (error) {
    console.error("Error fetching placement stats:", error);
    res.status(500).json({ message: "Failed to fetch placement stats" });
  }
};

export const updatePlacementStats = async (req: Request, res: Response) => {
  try {
    const { students_placed, companies_visited, highest_package, placement_percent } = req.body;

    const result = await pool.query(
      `UPDATE placement_stats 
       SET students_placed = $1, companies_visited = $2, highest_package = $3, placement_percent = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = 1
       RETURNING *`,
      [students_placed, companies_visited, highest_package, placement_percent]
    );

    if (result.rowCount === 0) {
      const insertResult = await pool.query(
        `INSERT INTO placement_stats (students_placed, companies_visited, highest_package, placement_percent)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [students_placed, companies_visited, highest_package, placement_percent]
      );
      return res.json(insertResult.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating placement stats:", error);
    res.status(500).json({ message: "Failed to update placement stats" });
  }
};

// Year Stats
export const getYearStats = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM year_stats ORDER BY year DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching year stats:", error);
    res.status(500).json({ message: "Failed to fetch year stats" });
  }
};

export const createYearStat = async (req: Request, res: Response) => {
  try {
    const { year, total_students, students_placed, highest_package, avg_package } = req.body;

    const result = await pool.query(
      `INSERT INTO year_stats (year, total_students, students_placed, highest_package, avg_package)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [year, total_students, students_placed, highest_package, avg_package]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating year stat:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Year already exists" });
    }
    res.status(500).json({ message: "Failed to create year stat" });
  }
};

export const updateYearStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { total_students, students_placed, highest_package, avg_package } = req.body;

    const result = await pool.query(
      `UPDATE year_stats 
       SET total_students = $1, students_placed = $2, highest_package = $3, avg_package = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [total_students, students_placed, highest_package, avg_package, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Year stat not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating year stat:", error);
    res.status(500).json({ message: "Failed to update year stat" });
  }
};

export const deleteYearStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM year_stats WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Year stat not found" });
    }

    res.json({ message: "Year stat deleted successfully" });
  } catch (error) {
    console.error("Error deleting year stat:", error);
    res.status(500).json({ message: "Failed to delete year stat" });
  }
};

// Recruiters
export const getRecruiters = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM recruiters ORDER BY offers DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    res.status(500).json({ message: "Failed to fetch recruiters" });
  }
};

export const createRecruiter = async (req: Request, res: Response) => {
  try {
    const { name, offers, package: pkg } = req.body;

    const result = await pool.query(
      `INSERT INTO recruiters (name, offers, package)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, offers, pkg]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating recruiter:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Recruiter already exists" });
    }
    res.status(500).json({ message: "Failed to create recruiter" });
  }
};

export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { offers, package: pkg } = req.body;

    const result = await pool.query(
      `UPDATE recruiters 
       SET offers = $1, package = $2, updated_at = CURRENT_TIMESTAMP
       WHERE name = $3
       RETURNING *`,
      [offers, pkg, name]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating recruiter:", error);
    res.status(500).json({ message: "Failed to update recruiter" });
  }
};

export const deleteRecruiter = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const result = await pool.query(
      "DELETE FROM recruiters WHERE name = $1 RETURNING name",
      [name]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruiter:", error);
    res.status(500).json({ message: "Failed to delete recruiter" });
  }
};


// Branch Placements
export const getBranchPlacements = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM branch_placements ORDER BY branch_name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching branch placements:", error);
    res.status(500).json({ message: "Failed to fetch branch placements" });
  }
};

export const createBranchPlacement = async (req: Request, res: Response) => {
  try {
    const { branch_name, total_students, students_placed, highest_package, avg_package, placement_percent } = req.body;

    const result = await pool.query(
      `INSERT INTO branch_placements (branch_name, total_students, students_placed, highest_package, avg_package, placement_percent)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [branch_name, total_students, students_placed, highest_package, avg_package, placement_percent]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating branch placement:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Branch already exists" });
    }
    res.status(500).json({ message: "Failed to create branch placement" });
  }
};

export const updateBranchPlacement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { branch_name, total_students, students_placed, highest_package, avg_package, placement_percent } = req.body;

    const result = await pool.query(
      `UPDATE branch_placements 
       SET branch_name = $1, total_students = $2, students_placed = $3, highest_package = $4, avg_package = $5, placement_percent = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [branch_name, total_students, students_placed, highest_package, avg_package, placement_percent, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Branch placement not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating branch placement:", error);
    res.status(500).json({ message: "Failed to update branch placement" });
  }
};

export const deleteBranchPlacement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM branch_placements WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Branch placement not found" });
    }

    res.json({ message: "Branch placement deleted successfully" });
  } catch (error) {
    console.error("Error deleting branch placement:", error);
    res.status(500).json({ message: "Failed to delete branch placement" });
  }
};
