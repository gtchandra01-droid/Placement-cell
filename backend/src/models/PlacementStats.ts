import pool from "../config/db";

/* ---------------------------
   Placement Stats Interface
--------------------------- */

export interface PlacementStatsData {
  academic_year: string;
  students_placed: number;
  companies_visited: number;
  highest_package: number;
  placement_percentage: number;
}

/* ---------------------------
   PlacementStats Model
--------------------------- */

const PlacementStats = {
  /* Get All Stats */
  async getAll() {
    return pool.query(
      "SELECT * FROM placement_stats ORDER BY academic_year DESC"
    );
  },

  /* Create New Stat Entry */
  async create(data: PlacementStatsData) {
    const {
      academic_year,
      students_placed,
      companies_visited,
      highest_package,
      placement_percentage,
    } = data;

    return pool.query(
      `
      INSERT INTO placement_stats 
      (academic_year, students_placed, companies_visited, highest_package, placement_percentage)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        academic_year,
        students_placed,
        companies_visited,
        highest_package,
        placement_percentage,
      ]
    );
  },

  /* Delete Stat */
  async delete(id: number) {
    return pool.query(
      "DELETE FROM placement_stats WHERE id = $1",
      [id]
    );
  },
};

export default PlacementStats;