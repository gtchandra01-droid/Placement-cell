import { Router } from "express";
import {
  getPages,
  getPageBySlug,
  getAllPages,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/page.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/pages", getPages);
router.get("/pages/:slug", getPageBySlug);

// Admin routes (protected)
router.get("/admin/pages", authenticateToken, getAllPages);
router.post("/admin/pages", authenticateToken, createPage);
router.put("/admin/pages/:id", authenticateToken, updatePage);
router.delete("/admin/pages/:id", authenticateToken, deletePage);

export default router;
