import { Router } from "express";
import { getMenus, createMenu, updateMenu, deleteMenu } from "../controllers/menu.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get("/", getMenus);
router.post("/", authMiddleware, createMenu);
router.put("/:id", authMiddleware, updateMenu);
router.delete("/:id", authMiddleware, deleteMenu);

export default router;
