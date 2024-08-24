const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const getEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const dbConfig = {
  user: getEnv("DB_USERNAME"),
  password: getEnv("DB_PASSWORD"),
  server: getEnv("DB_HOST"),
  database: getEnv("DB_NAME"),
  port: 51207, // Default port for SQL Server
  options: {
    encrypt: true, // Use encryption for data
    trustServerCertificate: true, // Trust the server certificate
  },
};

// Singleton pattern for database connection
class Database {
  static instance = null;

  static async getInstance() {
    if (!Database.instance) {
      try {
        Database.instance = await sql.connect(dbConfig);
        console.log("Connected to SQL Server");

        // Optionally, verify the connection
        const result = await Database.instance
          .request()
          .query("SELECT DB_NAME() AS DatabaseName");
        console.log(
          `Connected to database: ${result.recordset[0].DatabaseName}`
        );
      } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
      }
    }
    return Database.instance;
  }
}

// Function to execute stored procedures
const executeProcedure = async (procedureName, parameters = []) => {
  try {
    const pool = await Database.getInstance();
    const request = pool.request();

    // Add parameters to the request if any
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    // Execute the stored procedure
    const result = await request.execute(procedureName);
    return result.recordset;
  } catch (error) {
    console.error("Stored procedure execution failed:", error.message);
    throw new Error("Stored procedure execution failed");
  }
};

module.exports = { executeProcedure, Database };
