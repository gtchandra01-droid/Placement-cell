import pool from "../config/db";

export interface DriveData {
  id: number;
  company_id: number;
  company_name: string;
  role: string;
  location?: string;
  package_lpa: number;
  registration_link: string;
  drive_date: Date | string;
  eligibility?: string;
  description?: string;
}

const Drive = {
  async findAll() {
    const result = await pool.query("SELECT * FROM placement_drives ORDER BY drive_date DESC");
    return result.rows;
  },

  async findById(id: number) {
    const result = await pool.query("SELECT * FROM placement_drives WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async findUpcoming() {
    const result = await pool.query(
      "SELECT * FROM placement_drives WHERE drive_date >= CURRENT_DATE ORDER BY drive_date ASC"
    );
    return result.rows;
  },
};

export default Drive;
