require("dotenv").config();
const express = require("express");
const {
  testConnection,
  initializeDatabase,
} = require("./config/database.config");
const userRoutes = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (for frontend integration)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "User API Server is running!",
    endpoints: {
      "GET /api/users": "Get all users",
      "GET /api/users/:id": "Get user by ID",
      "POST /api/users": "Create new user (requires name and email)",
      "PUT /api/users/:id": "Update user (requires name and email)",
      "DELETE /api/users/:id": "Delete user",
    },
  });
});

// Health check endpoint
app.get("/health", async (req, res) => {
  const dbStatus = await testConnection();
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: dbStatus ? "Connected" : "Disconnected",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    console.log("🚀 Starting User Management API Server...");

    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error(
        "❌ Failed to connect to database. Please check your database configuration."
      );
      process.exit(1);
    }

    // Initialize database tables
    await initializeDatabase();

    // Start server
    app.listen(PORT, () => {
      console.log(`🌟 Server is running on port ${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}`);
      console.log(
        `🏥 Health check available at http://localhost:${PORT}/health`
      );
      console.log("\n📋 Available endpoints:");
      console.log("  GET    /api/users     - Get all users");
      console.log("  GET    /api/users/:id - Get user by ID");
      console.log("  POST   /api/users     - Create new user");
      console.log("  PUT    /api/users/:id - Update user");
      console.log("  DELETE /api/users/:id - Delete user");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
