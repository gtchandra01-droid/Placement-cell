import { Router } from "express";
import {
  getPlacementStats,
  updatePlacementStats,
  getYearStats,
  createYearStat,
  updateYearStat,
  deleteYearStat,
  getRecruiters,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getBranchPlacements,
  createBranchPlacement,
  updateBranchPlacement,
  deleteBranchPlacement,
} from "../controllers/statistics.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/placement-stats", getPlacementStats);
router.get("/year-stats", getYearStats);
router.get("/recruiters", getRecruiters);
router.get("/branch-placements", getBranchPlacements);

// Admin routes (protected)
router.put("/admin/placement-stats", authenticateToken, updatePlacementStats);

router.post("/admin/stats", authenticateToken, createYearStat);
router.get("/admin/stats", authenticateToken, getYearStats);
router.put("/admin/stats/:id", authenticateToken, updateYearStat);
router.delete("/admin/stats/:id", authenticateToken, deleteYearStat);

router.post("/admin/recruiters", authenticateToken, createRecruiter);
router.put("/admin/recruiters/:name", authenticateToken, updateRecruiter);
router.delete("/admin/recruiters/:name", authenticateToken, deleteRecruiter);

router.post("/admin/branch-placements", authenticateToken, createBranchPlacement);
router.put("/admin/branch-placements/:id", authenticateToken, updateBranchPlacement);
router.delete("/admin/branch-placements/:id", authenticateToken, deleteBranchPlacement);

export default router;
