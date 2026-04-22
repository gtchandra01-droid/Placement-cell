import { Router } from "express";
import multer from "multer";
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getPublicCompanies,
  importCompaniesFromExcel,
} from "../controllers/company.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Configure multer for Excel file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel files are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Public routes
router.get("/companies", getPublicCompanies);

// Admin routes (protected)
router.get("/admin/companies", authenticateToken, getCompanies);
router.get("/admin/companies/:id", authenticateToken, getCompanyById);
router.post("/admin/companies", authenticateToken, createCompany);
router.put("/admin/companies/:id", authenticateToken, updateCompany);
router.delete("/admin/companies/:id", authenticateToken, deleteCompany);

// Excel import route
router.post(
  "/admin/companies/import/excel",
  authenticateToken,
  upload.single("file"),
  importCompaniesFromExcel
);

export default router;
