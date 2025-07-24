const mysql = require("mysql2/promise");

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "34.58.174.59",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "gandh",
  password: process.env.DB_PASSWORD || "Gokul@$07",
  database: process.env.DB_NAME || "genworx",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

// Initialize database and create users table if it doesn't exist
const initializeDatabase = async () => {
  try {
    // First, connect without specifying database to create it if needed
    const tempConfig = { ...dbConfig };
    delete tempConfig.database;
    const tempPool = mysql.createPool(tempConfig);
    const tempConnection = await tempPool.getConnection();

    // Create database if it doesn't exist
    await tempConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``
    );
    tempConnection.release();
    await tempPool.end();

    // Now connect to the specific database
    const connection = await pool.getConnection();

    // Create users table if it doesn't exist
    const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `;

    await connection.query(createUsersTable);
    console.log("✅ Users table initialized successfully");

    connection.release();
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    throw error;
  }
};

// User database operations
const userDB = {
  // Get all users
  getAllUsers: async () => {
    try {
      const [rows] = await pool.execute(
        "SELECT id, name, email, created_at, updated_at FROM users ORDER BY created_at DESC"
      );
      return rows;
    } catch (error) {
      throw new Error(`Failed to get users: ${error.message}`);
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const [rows] = await pool.execute(
        "SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?",
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  },

  // Get user by email
  getUserByEmail: async (email) => {
    try {
      const [rows] = await pool.execute(
        "SELECT id, name, email, created_at, updated_at FROM users WHERE email = ?",
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to get user by email: ${error.message}`);
    }
  },

  // Create new user
  createUser: async (name, email) => {
    try {
      const [result] = await pool.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name.trim(), email.trim().toLowerCase()]
      );

      // Get the created user
      const newUser = await userDB.getUserById(result.insertId);
      return newUser;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("User with this email already exists");
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  // Update user
  updateUser: async (id, name, email) => {
    try {
      const [result] = await pool.execute(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name.trim(), email.trim().toLowerCase(), id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      // Get the updated user
      const updatedUser = await userDB.getUserById(id);
      return updatedUser;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("User with this email already exists");
      }
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [
        id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },

  // Get user count
  getUserCount: async () => {
    try {
      const [rows] = await pool.execute("SELECT COUNT(*) as count FROM users");
      return rows[0].count;
    } catch (error) {
      throw new Error(`Failed to get user count: ${error.message}`);
    }
  },
};

// Graceful shutdown
const closeConnection = async () => {
  try {
    await pool.end();
    console.log("🔐 Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database connection:", error.message);
  }
};

// Handle process termination
process.on("SIGINT", closeConnection);
process.on("SIGTERM", closeConnection);

module.exports = {
  pool,
  testConnection,
  initializeDatabase,
  userDB,
  closeConnection,
};
