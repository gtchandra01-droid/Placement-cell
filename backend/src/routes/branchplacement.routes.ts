import { Router } from "express";
import {
    getBranchPlacements,
    createBranchPlacement,
    updateBranchPlacement,
    deleteBranchPlacement,
} from "../controllers/branchplacement.controller";

const router = Router();

/* PUBLIC */
router.get("/branch-placements", getBranchPlacements);

/* ADMIN */
router.post("/admin/branch-placements", createBranchPlacement);
router.put("/admin/branch-placements/:id", updateBranchPlacement);
router.delete("/admin/branch-placements/:id", deleteBranchPlacement);

export default router;