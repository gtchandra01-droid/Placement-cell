import { Router } from "express";
import {
  getPlacements,
  getPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
  getPlacementStats,
} from "../controllers/placement.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/placements/stats", getPlacementStats);

// Admin routes (protected)
router.get("/admin/placements", authenticateToken, getPlacements);
router.get("/admin/placements/:id", authenticateToken, getPlacementById);
router.post("/admin/placements", authenticateToken, createPlacement);
router.put("/admin/placements/:id", authenticateToken, updatePlacement);
router.delete("/admin/placements/:id", authenticateToken, deletePlacement);

export default router;