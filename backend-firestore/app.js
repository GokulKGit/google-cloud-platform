const express = require("express");
const cors = require("cors");
const { Firestore } = require("@google-cloud/firestore");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firestore
const firestore = new Firestore({
  projectId: "genial-beaker-466204-p7",
  keyFilename: path.join(
    __dirname,
    "genial-beaker-466204-p7-4dbe7a392e8c.json"
  ),
});

// Middleware
app.use(cors());
app.use(express.json());

// Test Firestore connection
app.get("/api/test", async (req, res) => {
  try {
    const testDoc = await firestore.collection("test").doc("connection").get();
    res.json({
      message: "Firestore connection successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Firestore connection error:", error);
    res
      .status(500)
      .json({ error: "Firestore connection failed", details: error.message });
  }
});

// Routes for user management
// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const usersRef = firestore.collection("users");
    const snapshot = await usersRef.get();

    const users = [];
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
});

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const userDoc = await firestore
      .collection("users")
      .doc(req.params.id)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: userDoc.id,
      ...userDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch user", details: error.message });
  }
});

// Create new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const userData = {
      name,
      email,
    };

    const docRef = await firestore.collection("users").add(userData);

    res.status(201).json({
      id: docRef.id,
      ...userData,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    await firestore.collection("users").doc(req.params.id).update(updateData);

    const updatedDoc = await firestore
      .collection("users")
      .doc(req.params.id)
      .get();

    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data(),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Failed to update user", details: error.message });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await firestore.collection("users").doc(req.params.id).delete();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "Failed to delete user", details: error.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Firestore Backend API",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Firestore Backend server running on port ${PORT}`);
  console.log(`📱 API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;
