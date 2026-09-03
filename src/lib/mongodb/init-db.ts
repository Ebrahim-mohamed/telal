// src/lib/mongodb/init-db.ts

import mongoose from "mongoose";

import User from "@/models/user_model";
import Phase from "@/models/phase_model";
import Unit from "@/models/unit_allocation_modal";
import PaymentPlan from "@/models/payment_model";
import Inquiry from "@/models/inquiry_model";
import GeneralImageModel from "@/models/generalGallery";

import dbConnect from "./connection";

// ============================================================
// CREATE INITIAL ADMIN
// ============================================================

async function createInitialAdmin(): Promise<void> {
  try {
    console.log("Checking initial admin user...");

    const adminExists = await User.findOne({
      name: "admin",
    });

    if (!adminExists) {
      const Password = "123456789";

      await User.create({
        name: "admin",
        password: Password,
      });

      console.log("Initial admin user created");
    } else {
      console.log("Initial admin user already exists");
    }
  } catch (error) {
    console.error("Error creating initial admin:", error);
    throw error;
  }
}

// ============================================================
// CREATE COLLECTIONS
// ============================================================

async function createCollections(): Promise<void> {
  const collections = [
    {
      name: "users",
      model: User,
    },
    {
      name: "phases",
      model: Phase,
    },
    {
      name: "units",
      model: Unit,
    },
    {
      name: "paymentPlans",
      model: PaymentPlan,
    },
    {
      name: "inquiries",
      model: Inquiry,
    },
    {
      name: "images_data",
      model: GeneralImageModel,
    },
  ];

  if (!mongoose.connection.db) {
    throw new Error("MongoDB database connection is not available");
  }

  for (const collection of collections) {
    try {
      const exists = await mongoose.connection.db
        .listCollections({
          name: collection.name,
        })
        .hasNext();

      if (!exists) {
        await mongoose.connection.createCollection(collection.name);

        console.log(`Created collection: ${collection.name}`);
      } else {
        console.log(`Collection already exists: ${collection.name}`);
      }
    } catch (error) {
      console.error(
        `Error creating collection ${collection.name}:`,
        error,
      );

      throw error;
    }
  }
}

// ============================================================
// CREATE INDEXES
// ============================================================

async function createIndexes(): Promise<void> {
  try {
    console.log("Creating indexes...");

    // --------------------------------------------------------
    // USERS
    // --------------------------------------------------------

    await User.collection.createIndex(
      {
        name: 1,
      },
      {
        unique: true,
      },
    );

    // --------------------------------------------------------
    // PHASES
    // --------------------------------------------------------

    await Phase.collection.createIndex({
      "location.coordinates": "2dsphere",
    });

    await Phase.collection.createIndex(
      {
        name: 1,
      },
      {
        unique: true,
        sparse: true,
      },
    );

    // --------------------------------------------------------
    // UNITS
    // --------------------------------------------------------

    await Unit.collection.createIndex({
      "location.coordinates": "2dsphere",
    });

    await Unit.collection.createIndex(
      {
        unitNumber: 1,
      },
      {
        unique: true,
      },
    );

    await Unit.collection.createIndex({
      phase: 1,
    });

    await Unit.collection.createIndex({
      status: 1,
    });

    // --------------------------------------------------------
    // PAYMENT PLANS
    // --------------------------------------------------------

    await PaymentPlan.collection.createIndex({
      unit: 1,
    });

    await PaymentPlan.collection.createIndex({
      status: 1,
    });

    // --------------------------------------------------------
    // INQUIRIES
    // --------------------------------------------------------

    await Inquiry.collection.createIndex({
      status: 1,
    });

    await Inquiry.collection.createIndex({
      createdAt: 1,
    });

    console.log("All indexes created successfully");
  } catch (error) {
    console.error("Error creating indexes:", error);
    throw error;
  }
}

// ============================================================
// INITIALIZE DATABASE
// ============================================================

export async function initializeDatabase(): Promise<void> {
  try {
    console.log("");
    console.log("========================================");
    console.log("Starting MongoDB initialization...");
    console.log("========================================");
    console.log("");

    // --------------------------------------------------------
    // CONNECT
    // --------------------------------------------------------

    await dbConnect();

    console.log("Connected to MongoDB");
    console.log("");

    // --------------------------------------------------------
    // COLLECTIONS
    // --------------------------------------------------------

    console.log("Creating/checking collections...");

    await createCollections();

    console.log("");
    console.log("Collections created/verified");
    console.log("");

    // --------------------------------------------------------
    // INDEXES
    // --------------------------------------------------------

    await createIndexes();

    console.log("");
    console.log("Indexes created/verified");
    console.log("");

    // --------------------------------------------------------
    // ADMIN
    // --------------------------------------------------------

    await createInitialAdmin();

    console.log("");
    console.log("Initial admin setup completed");
    console.log("");

    // --------------------------------------------------------
    // FINISHED
    // --------------------------------------------------------

    console.log("========================================");
    console.log("Database initialization completed!");
    console.log("========================================");
    console.log("");
  } catch (error) {
    console.error("");
    console.error("========================================");
    console.error("Database initialization FAILED");
    console.error("========================================");
    console.error("");
    console.error(error);

    throw error;
  }
}

// ============================================================
// VALIDATE DATABASE
// ============================================================

export async function validateDatabaseState(): Promise<void> {
  try {
    const validations = [
      {
        model: User,
        name: "Users",
      },
      {
        model: Phase,
        name: "Phases",
      },
      {
        model: Unit,
        name: "Units",
      },
      {
        model: PaymentPlan,
        name: "Payment Plans",
      },
      {
        model: Inquiry,
        name: "Inquiries",
      },
      {
        model: GeneralImageModel,
        name: "General Images",
      },
    ];

    console.log("");
    console.log("Database State Validation:");
    console.log("--------------------------");

    for (const validation of validations) {
      const count = await validation.model.countDocuments();

      console.log(`${validation.name}: ${count} documents`);
    }

    const adminExists = await User.findOne({
      name: "admin",
    });

    console.log(`Admin user exists: ${!!adminExists}`);

    const indexes = await User.collection.indexes();

    const hasIndex = indexes.some(
      (index) => index.name === "name_1",
    );

    console.log(`Index name_1 exists: ${hasIndex}`);

    console.log("--------------------------");
    console.log("");
  } catch (error) {
    console.error("Error validating database state:", error);
    throw error;
  }
}