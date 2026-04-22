import pool from "../config/db";

export interface AdminData {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  created_at?: Date;
  last_login?: Date;
}

const Admin = {
  async findByEmail(email: string) {
    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    return result.rows[0] || null;
  },

  async findById(id: number) {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at, last_login FROM admins WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  async create(data: AdminData) {
    const result = await pool.query(
      "INSERT INTO admins (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
      [data.name, data.email, data.password, data.role || "admin"]
    );
    return result.rows[0];
  },
};

export default Admin;
