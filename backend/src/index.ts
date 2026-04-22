import "dotenv/config";
import "./config/db";
import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/test/health\n`);
});
