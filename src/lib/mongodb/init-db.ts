// lib/mongodb/init-db.ts
import mongoose from "mongoose";
import User from "@/models/user_model";
import Phase from "@/models/phase_model";
import Unit from "@/models/unit_allocation_modal";
import PaymentPlan from "@/models/payment_model";
import Inquiry from "@/models/inquiry_model";
// Add your image models here
import GeneralImageModel from "@/models/generalGallery";
import dbConnect from "./connection";

async function createInitialAdmin() {
  try {
    const adminExists = await User.findOne({ name: "admin" });

    if (!adminExists) {
      const Password = "123456789";
      await User.create({
        name: "admin",
        password: Password,
      });
      console.log("Initial admin user created");
    }
  } catch (error) {
    console.error("Error creating initial admin:", error);
  }
}

async function createCollections() {
  const collections = [
    { name: "users", model: User },
    { name: "phases", model: Phase },
    { name: "units", model: Unit },
    { name: "paymentPlans", model: PaymentPlan },
    { name: "inquiries", model: Inquiry },
    { name: "images_data", model: GeneralImageModel },
  ];

  for (const collection of collections) {
    try {
      // Check if collection exists
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const exists = await mongoose.connection.db
        .listCollections({ name: collection.name })
        .next();

      if (!exists) {
        await mongoose.connection.createCollection(collection.name);
        console.log(`Created collection: ${collection.name}`);
      }
    } catch (error) {
      console.error(`Error creating collection ${collection.name}:`, error);
    }
  }
}

async function createIndexes() {
  try {
    await User.collection.createIndex({ name: 1 }, { unique: true });

    await Phase.collection.createIndex({ "location.coordinates": "2dsphere" });
    await Phase.collection.createIndex(
      { name: 1 },
      { unique: true, sparse: true },
    );

    await Unit.collection.createIndex({ "location.coordinates": "2dsphere" });
    await Unit.collection.createIndex({ unitNumber: 1 }, { unique: true });
    await Unit.collection.createIndex({ phase: 1 });
    await Unit.collection.createIndex({ status: 1 });

    await PaymentPlan.collection.createIndex({ unit: 1 });
    await PaymentPlan.collection.createIndex({ status: 1 });

    await Inquiry.collection.createIndex({ status: 1 });
    await Inquiry.collection.createIndex({ createdAt: 1 });

    console.log("All indexes created successfully");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
}

export async function initializeDatabase() {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    await createCollections();
    console.log("Collections created");

    await createIndexes();
    console.log("Indexes created");

    await createInitialAdmin();
    console.log("Initial admin setup completed");

    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

export async function validateDatabaseState() {
  try {
    const validations = [
      { model: User, name: "Users" },
      { model: Phase, name: "Phases" },
      { model: Unit, name: "Units" },
      { model: PaymentPlan, name: "Payment Plans" },
      { model: Inquiry, name: "Inquiries" },
      { model: GeneralImageModel, name: "General Images" },
    ];

    console.log("\nDatabase State Validation:");
    console.log("------------------------");

    for (const validation of validations) {
      const count = await validation.model.countDocuments();
      console.log(`${validation.name}: ${count} documents`);
    }

    const adminExists = await User.findOne({ name: "admin" });
    console.log(`Admin user exists: ${!!adminExists}`);

    const indexes = await User.collection.indexes();
    const hasIndex = indexes.some((index) => index.name === "name_1");
    console.log(`Index name_1 exists: ${hasIndex}`);

    console.log("------------------------");
  } catch (error) {
    console.error("Error validating database state:", error);
  }
}
