const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Import routes
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const adminRoutes = require("./routes/admin.routes");
const driveRoutes = require("./routes/drive.routes");
const statsRoutes = require("./routes/stats.routes");
const menuRoutes = require("./routes/menu.routes");
const imageRoutes = require("./routes/images.routes");

// Test route
app.get("/", (req, res) => {
  res.json({ 
    message: "JNTUK Placement Portal API 🚀",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      dashboard: "/api/dashboard",
      admin: "/api/admin",
      drives: "/api/drives",
      stats: "/api/stats",
      menus: "/api/menus",
      images: "/api/images"
    }
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/drives", driveRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/images", imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`\n Server running on port ${PORT}`);
  console.log(` API URL: http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || "development"}\n`);
});