import express, { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  getProfile,
} from "../controllers/auth.controller";

import authMiddleware from "../middleware/auth.middleware";

const router: Router = express.Router();

/* ---------------- AUTH ROUTES ---------------- */

// Register Admin
router.post("/register", registerAdmin);

// Login Admin
router.post("/login", loginAdmin);

// Get Logged-in Admin Profile
router.get("/profile", authMiddleware, getProfile);

export default router;
