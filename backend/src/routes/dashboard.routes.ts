import express, { Request, Response, NextFunction } from "express";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingDrives,
} from "../controllers/dashboard.controller";

import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/rolemiddleware";

const router = express.Router();

/* ---------------- DASHBOARD ROUTES ---------------- */

// Admin Dashboard Stats
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);

// Recent Placement Activities
router.get(
  "/activities",
  authMiddleware,
  roleMiddleware("admin"),
  getRecentActivities
);

// Upcoming Placement Drives
router.get(
  "/upcoming-drives",
  authMiddleware,
  roleMiddleware("admin"),
  getUpcomingDrives
);

export default router;
