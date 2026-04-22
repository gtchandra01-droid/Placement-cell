import { Router } from "express";
import {
    getImages,getImageById,uploadImage,updateImage,deleteImage,
} from "../controllers/image.controller";
import authMiddleware from "../middleware/auth.middleware";
import { upload } from "../config/multer";

const router = Router();

// Public routes
router.get("/", getImages);
router.get("/:id", getImageById);

// Protected routes
router.post("/", authMiddleware, upload.single("image"), uploadImage);
router.put("/:id", authMiddleware, updateImage);
router.delete("/:id", authMiddleware, deleteImage);

export default router;