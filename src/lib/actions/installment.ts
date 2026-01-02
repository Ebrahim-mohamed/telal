// src/lib/actions/installmentActions.ts
"use server";

import connectMongoDB from "@/lib/mongodb/connection";
import InstallmentModel, { IInstallment } from "@/models/installment_modal";

// Get the current installment or default to 20
export async function getInstallment(): Promise<IInstallment> {
  await connectMongoDB();

  const installmentDoc = await InstallmentModel.findOne();

  if (!installmentDoc) {
    // Return a default value if no record found
    return {
      installment: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return installmentDoc.toObject();
}

// Update or create the installment
export async function updateInstallment(
  newValue: number
): Promise<IInstallment> {
  await connectMongoDB();

  let installmentDoc = await InstallmentModel.findOne();

  if (!installmentDoc) {
    installmentDoc = new InstallmentModel({ installment: newValue });
  } else {
    installmentDoc.installment = newValue;
  }

  await installmentDoc.save();

  return installmentDoc.toObject();
}
