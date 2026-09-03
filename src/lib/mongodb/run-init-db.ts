import mongoose from "mongoose";
import { initializeDatabase } from "./init-db";

async function main() {
  try {
    await initializeDatabase();

    console.log("Database initialization process finished.");
  } catch (error) {
    console.error("Database initialization process failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

main();