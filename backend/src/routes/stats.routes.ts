import { Router } from "express";
import { getPlacementStats, getRecentActivities, getUpcomingDrives } from "../controllers/stats.controller";

const router = Router();

// Public stats endpoint (used by public Statistics page)
router.get("/", getPlacementStats);
router.get("/activities", getRecentActivities);
router.get("/upcoming", getUpcomingDrives);

export default router;
