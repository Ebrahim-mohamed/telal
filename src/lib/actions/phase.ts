"use server";

import connectMongoDB from "@/lib/mongodb/connection";
import Phase, { IPhase } from "@/models/phase_model";

// Get all Phases
export const getPhases = async () => {
  await connectMongoDB();

  const phases = await Phase.find().lean();

  return phases.map((phase) => ({
    shapes: phase.shapes,
    phaseName: phase.phaseName,
    phaseStatus: phase.phaseStatus,
    createdAt: phase.createdAt,
    updatedAt: phase.updatedAt,
  }));
};

// Create (Add) a new Phase
export async function createPhase(formData: FormData) {
  try {
    await connectMongoDB();

    const phaseName = formData.get("phaseName") as string;
    const phaseStatus = formData.get("phaseStatus") as string;
    const shapesRaw = formData.get("shapes") as string;

    let shapes = [];
    if (shapesRaw) {
      shapes = JSON.parse(shapesRaw);
    }

    const newPhase = await Phase.create({
      phaseName,
      phaseStatus,
      shapes,
    });

    // Convert to plain object and handle special fields
    const plainPhase = newPhase.toObject ? newPhase.toObject() : newPhase;

    // Convert _id to string if it's an ObjectId
    if (plainPhase._id && plainPhase._id.toString) {
      plainPhase._id = plainPhase._id.toString();
    }

    console.log("New phase created:", plainPhase);
    return plainPhase;
  } catch (error) {
    console.error("Failed to create phase:", error);
    throw error;
  }
}
export async function deletePhase(phaseName: string) {
  try {
    await connectMongoDB();

    const result = await Phase.deleteOne({ phaseName });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: `No phase found with name: ${phaseName}`,
      };
    }

    return {
      success: true,
      message: `Phase "${phaseName}" deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting phase:", error);
    return {
      success: false,
      message: `Failed to delete phase "${phaseName}"`,
    };
  }
}

export async function changePhaseStatus(phaseName: string) {
  try {
    await connectMongoDB();

    // Find the current phase with proper typing
    const currentPhase = await Phase.findOne<IPhase>({ phaseName }).lean();
    if (!currentPhase) {
      return {
        success: false,
        message: `Phase "${phaseName}" not found`,
      };
    }

    // Toggle the status with type safety
    const newStatus = currentPhase.phaseStatus === "open" ? "closed" : "open";

    // Update the phase
    const result = await Phase.updateOne(
      { phaseName },
      { $set: { phaseStatus: newStatus } }
    );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        message: `Failed to update phase "${phaseName}"`,
      };
    }

    return {
      success: true,
      message: `Phase "${phaseName}" status changed to ${newStatus}`,
      newStatus,
    };
  } catch (error) {
    console.error("Error changing phase status:", error);
    return {
      success: false,
      message: `Error changing status for phase "${phaseName}"`,
    };
  }
}
