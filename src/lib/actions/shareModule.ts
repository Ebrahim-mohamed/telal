// app/actions/shareActions.ts
"use server";

import connectMongoDB from "@/lib/mongodb/connection";
import Share from "@/models/share_modal";

// Get all shares
export const getShares = async () => {
  await connectMongoDB();
  const shares = await Share.find().lean();

  return shares.map((share) => ({
    firstName: share.firstName,
    lastName: share.lastName,
    email: share.email,
    phone: share.phone,
    unitNumber: share.unitNumber,
    createdAt: share.createdAt,
    updatedAt: share.updatedAt,
    read: share.read,
  }));
};

// Create a new share
export async function createShare(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const unitNumber = formData.get("unitNumber") as string;

  await connectMongoDB();

  await Share.create({
    firstName,
    lastName,
    email,
    phone,
    unitNumber,
    read: false, // default value
  });
}
export async function deleteShare(phone: string) {
  try {
    await connectMongoDB();

    const result = await Share.deleteOne({ phone });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: `No share found with phone: ${phone}`,
      };
    }

    return {
      success: true,
      message: `share with phone:"${phone}" deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting share:", error);
    return {
      success: false,
      message: `Failed to delete share with phone: "${phone}"`,
    };
  }
}
