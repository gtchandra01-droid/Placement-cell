import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import adminRoutes from "./routes/admin.routes";
import driveRoutes from "./routes/drive.routes";
import statsRoutes from "./routes/stats.routes";
import menuRoutes from "./routes/menu.routes";
import imageRoutes from "./routes/images.routes";
import companyRoutes from "./routes/company.routes";
import placementRoutes from "./routes/placement.routes";
import pagesRoutes from "./routes/pages.routes";
import statisticsRoutes from "./routes/statistics.routes";
import galleryRoutes from "./routes/gallery.routes";
import testRoutes from "./routes/test.routes";

const app = express();

app.use(cors({
		origin: [
			"http://localhost:5173",
		].filter(Boolean),
		credentials: true,
	}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/drives", driveRoutes);
app.use("/api/admin/drives", driveRoutes); 
app.use("/api/stats", statsRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/images", imageRoutes);

// Register company routes BEFORE admin routes to avoid conflicts
app.use("/api", companyRoutes);

// Statistics routes
app.use("/api", statisticsRoutes);

// Gallery routes (must be before admin routes to avoid catch-all /:id)
app.use("/api/admin", galleryRoutes);

// Admin routes after gallery routes
app.use("/api/admin", adminRoutes);

app.use("/api", placementRoutes);
app.use("/api", pagesRoutes);
app.use("/api", testRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
