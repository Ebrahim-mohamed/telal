"use server";
import connectMongoDB from "@/lib/mongodb/connection";
import Inquiry from "@/models/inquiry_model"; // Import the Inquiry model

// Server action to get inquiries data
export const getInquiries = async () => {
  await connectMongoDB();

  const inquiries = await Inquiry.find().lean(); // Fetch inquiries

  return inquiries.map((inquiry) => ({
    firstName: inquiry.firstName,
    lastName: inquiry.lastName,
    brokerName: inquiry.brokerName,
    email: inquiry.email,
    phone: inquiry.phone,
    unit: inquiry.unit, // Assuming unit is an ObjectId, if you need to populate, use .populate('unit')
    createdAt: inquiry.createdAt,
    updatedAt: inquiry.updatedAt,
    read: inquiry.read,
  }));
};

// Server action to create a new inquiry
export async function createInquiry(data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  unit?: string; // Made unit optional
  brokerName?: string; // Made brokerName optional
}) {
  const { firstName, lastName, email, phone, brokerName, unit } = data;

  await connectMongoDB();

  const newInquiry = await Inquiry.create({
    firstName,
    lastName,
    email,
    phone,
    brokerName: brokerName || undefined, // Ensure brokerName is optional
    unit: unit || undefined, // Ensure unit is optional
    read: false,
  });

  console.log("New inquiry created", newInquiry);
}

export async function deleteInquiryForm(phone: string) {
  try {
    await connectMongoDB();

    const result = await Inquiry.deleteOne({ phone });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: `No inquiry found with phone: ${phone}`,
      };
    }

    return {
      success: true,
      message: `inquiry with phone:"${phone}" deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return {
      success: false,
      message: `Failed to delete inquiry with phone: "${phone}"`,
    };
  }
}
