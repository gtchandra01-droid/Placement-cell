import { Router } from "express";
import {
  createDrive,
  getAllDrives,
  getDriveById,
  updateDrive,
  deleteDrive,
} from "../controllers/drive.controller";

import authenticate from "../middleware/auth.middleware";
import authorizeRole from "../middleware/rolemiddleware";

const router = Router();

/* -------------------------------
   PROTECTED ADMIN ROUTES
-------------------------------- */

// Create new placement drive (ADMIN / OFFICER)
router.post(
  "/",
  authenticate,
  authorizeRole("admin", "placement_officer"),
  createDrive
);

// Update drive
router.put(
  "/:id",
  authenticate,
  authorizeRole("admin", "placement_officer"),
  updateDrive
);

// Delete drive
router.delete(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  deleteDrive
);

/* -------------------------------
   PUBLIC / STUDENT ROUTES
-------------------------------- */

// Get all drives
router.get("/", getAllDrives);

// Get single drive
router.get("/:id", getDriveById);

export default router;
