// src/lib/mongodb/connection.ts

import { Db, GridFSBucket, MongoClient } from "mongodb";
import mongoose from "mongoose";

// ============================================================
// MONGODB CONNECTION
// ============================================================

// const MONGODB_URI =
//   "mongodb+srv://jibera9496_db_user:m4yXOvvgClY1Tcxk@telal.0m1vlgz.mongodb.net/?appName=telal";

const MONGODB_URI = "mongodb://127.0.0.1:27017/telal";
// ============================================================
// MONGOOSE CONNECTION
// ============================================================

const connectMongoDB = async (): Promise<void> => {
  // Already connected
  if (
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2
  ) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;

// ============================================================
// NATIVE MONGODB CLIENT / GRIDFS
// ============================================================

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let cachedBucket: GridFSBucket | null = null;

export async function getDBConnection(): Promise<{
  client: MongoClient;
  db: Db;
  gridfsBucket: GridFSBucket;
}> {
  // Return cached connection if available
  if (cachedClient && cachedDb && cachedBucket) {
    return {
      client: cachedClient,
      db: cachedDb,
      gridfsBucket: cachedBucket,
    };
  }

  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    waitQueueTimeoutMS: 30000,
  });

  try {
    // Connect
    await client.connect();

    console.log("Successfully connected to MongoDB");

    // Get the "telal" database explicitly
    const db = client.db("telal");

    // Test the connection
    await db.command({ ping: 1 });

    console.log("MongoDB ping successful");

    // Create GridFS bucket
    const bucket = new GridFSBucket(db, {
      bucketName: "images",
    });

    // Cache connections
    cachedClient = client;
    cachedDb = db;
    cachedBucket = bucket;

    return {
      client,
      db,
      gridfsBucket: bucket,
    };
  } catch (error) {
    await client.close();

    console.error("Failed to connect to MongoDB:", error);

    throw new Error(`Failed to connect to MongoDB: ${error}`);
  }
}

// ============================================================
// GRIDFS CONNECTION
// ============================================================

export const dbConnection = getDBConnection();