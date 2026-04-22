import pool from "../config/db";

export interface MenuData {
  id?: number;
  label: string;
  url: string;
  parent_id?: number | null;
  sort_order?: number;
  is_active?: boolean;
}

const MenuModel = {
  async findAll() {
    const result = await pool.query("SELECT * FROM menus ORDER BY sort_order ASC");
    return result.rows;
  },

  async findById(id: number) {
    const result = await pool.query("SELECT * FROM menus WHERE id = $1", [id]);
    return result.rows[0] || null;
  },
};

export default MenuModel;
