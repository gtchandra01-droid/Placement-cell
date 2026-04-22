import pool from "../config/db";

export interface StudentData {
  id?: number;
  name: string;
  roll_no?: string;
  branch: string;
  cgpa: number;
  placed?: boolean;
}

const Student = {
  async findAll() {
    const result = await pool.query("SELECT * FROM students ORDER BY name ASC");
    return result.rows;
  },

  async findById(id: number) {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async countPlaced() {
    const result = await pool.query("SELECT COUNT(*) FROM students WHERE placed = true");
    return Number(result.rows[0].count);
  },

  async countTotal() {
    const result = await pool.query("SELECT COUNT(*) FROM students");
    return Number(result.rows[0].count);
  },
};

export default Student;
