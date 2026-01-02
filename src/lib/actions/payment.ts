"use server";
import connectMongoDB from "@/lib/mongodb/connection";
import PaymentPlan from "@/models/payment_model";

export const getPayments = async () => {
  await connectMongoDB();
  const payments = await PaymentPlan.find().lean();

  return payments.map((payment) => ({
    bankName: payment.bankName,
    interestRate: payment.interestRate,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
    bankLogo: payment.bankLogo.toString("base64"),
  }));
};

export async function createPayment(formData: FormData) {
  const bankName = formData.get("bankName") as string;
  const interestRate = parseFloat(formData.get("interestRate") as string);
  const file = formData.get("bankLogo") as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await connectMongoDB();

  await PaymentPlan.create({
    bankName,
    interestRate,
    bankLogo: buffer,
  });
}
export async function deletePayment(bankName: string) {
  try {
    await connectMongoDB();
    const result = await PaymentPlan.deleteOne({ bankName });

    if (result.deletedCount === 0) {
      throw new Error(`No payment plan found with bank name: ${bankName}`);
    }

    return { success: true, message: "Bank information deleted successfully" };
  } catch (error) {
    console.error("Error deleting payment plan:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete Bank information",
    };
  }
}
