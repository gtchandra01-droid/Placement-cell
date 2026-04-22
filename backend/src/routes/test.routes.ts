import { Router } from "express";
import {
  healthCheck,
  testCompanies,
  testDrives2026,
} from "../controllers/test.controller";

const router = Router();

// Test routes
router.get("/test/health", healthCheck);
router.get("/test/companies", testCompanies);
router.get("/test/drives-2026", testDrives2026);

export default router;