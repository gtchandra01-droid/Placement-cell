import pool from "../config/db";

export interface CompanyData {
  id?: number;
  name: string;
  sector: string;
  location: string;
  logo_url?: string;
  registration_link?: string;
}

const Company = {
  async findAll() {
    const result = await pool.query("SELECT * FROM companies ORDER BY name ASC");
    return result.rows;
  },

  async findById(id: number) {
    const result = await pool.query("SELECT * FROM companies WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async create(data: CompanyData) {
    const result = await pool.query(
      "INSERT INTO companies (name, sector, location, logo_url, registration_link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [data.name, data.sector, data.location, data.logo_url || null, data.registration_link || null]
    );
    return result.rows[0];
  },
};

export default Company;
