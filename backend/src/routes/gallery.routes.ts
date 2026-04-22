import { Router } from "express";
import multer from "multer";
import {
  getImages,
  getImageById,
  uploadImage,
  updateImage,
  deleteImage,
} from "../controllers/image.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Public routes
router.get("/gallery", getImages);
router.get("/gallery/:id", getImageById);

// Admin routes (protected)
router.post("/gallery", authenticateToken, upload.single("file"), uploadImage);
router.put("/gallery/:id", authenticateToken, updateImage);
router.delete("/gallery/:id", authenticateToken, deleteImage);

export default router;
